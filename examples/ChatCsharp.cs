// C# Chat API - OpenAI-compatible
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

public class ChatApiClient
{
    private readonly HttpClient _client;
    private const string ApiUrl = "https://api.aisool.com/v1/chat/completions";
    private const string ApiKey = "YOUR_API_KEY";

    public ChatApiClient()
    {
        _client = new HttpClient();
        _client.DefaultRequestHeaders.Add("Authorization", $"Bearer {ApiKey}");
    }

    public async Task<ChatResponse> SendMessageAsync(string userMessage)
    {
        try
        {
            var payload = new 
            {
                model = "sool-max",
                messages = new[] { new { role = "user", content = userMessage } }
            };
            
            var jsonContent = JsonSerializer.Serialize(payload);
            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            var response = await _client.PostAsync(ApiUrl, content);
            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync();
            var data = JsonSerializer.Deserialize<JsonElement>(responseBody);

            var choice = data.GetProperty("choices")[0];
            var message = choice.GetProperty("message");

            var chatResponse = new ChatResponse
            {
                Role = message.GetProperty("role").GetString(),
                Content = message.GetProperty("content").GetString(),
                FinishReason = choice.GetProperty("finish_reason").GetString(),
                Usage = data.TryGetProperty("usage", out var usage) ? usage.ToString() : null
            };

            Console.WriteLine($"Role: {chatResponse.Role}");
            Console.WriteLine($"Content: {chatResponse.Content}");
            Console.WriteLine($"Status: {chatResponse.FinishReason}");
            Console.WriteLine($"Usage: {chatResponse.Usage}");

            return chatResponse;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            return null;
        }
    }
}

public class ChatResponse
{
    public string Role { get; set; }
    public string Content { get; set; }
    public string FinishReason { get; set; }
    public string Usage { get; set; }
}

// Usage
class Program
{
    static async Task Main()
    {
        var client = new ChatApiClient();
        var response = await client.SendMessageAsync("Explain APIs");
        if (response != null)
        {
            Console.WriteLine($"\\nAI Response: {response.Content}");
        }
    }
}
