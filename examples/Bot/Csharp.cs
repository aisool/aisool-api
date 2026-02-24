// C# Bot - OpenAI-compatible with history
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

public class AiBot
{
    private readonly HttpClient _client;
    private readonly string _apiKey;
    private readonly List<Message> _history;
    
    public AiBot(string apiKey)
    {
        _apiKey = apiKey;
        _client = new HttpClient();
        _client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
        _history = new List<Message>();
    }
    
    public async Task<string> SendMessageAsync(string userMessage)
    {
        try
        {
            _history.Add(new Message { Role = "user", Content = userMessage });
            
            var payload = new 
            {
                model = "sool-max",
                messages = _history
            };
            
            var content = new StringContent(
                JsonSerializer.Serialize(payload),
                Encoding.UTF8,
                "application/json"
            );
            
            var response = await _client.PostAsync(
                "https://api.aisool.com/v1/chat/completions",
                content
            );
            response.EnsureSuccessStatusCode();
            
            var body = await response.Content.ReadAsStringAsync();
            var data = JsonSerializer.Deserialize<JsonElement>(body);
            
            var choice = data.GetProperty("choices")[0];
            var msg = choice.GetProperty("message");
            
            var assistantMsg = new Message
            {
                Role = msg.GetProperty("role").GetString(),
                Content = msg.GetProperty("content").GetString()
            };
            
            _history.Add(assistantMsg);
            
            return assistantMsg.Content;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Bot error: {ex.Message}");
            return "Sorry, I encountered an error.";
        }
    }
    
    public List<Message> GetConversationHistory() => _history;
    public void ClearHistory() => _history.Clear();
}

public class Message
{
    public string Role { get; set; }
    public string Content { get; set; }
}

// Usage
class Program
{
    static async Task Main()
    {
        var bot = new AiBot("${key}");
        Console.WriteLine(await bot.SendMessageAsync("Hello!"));
        Console.WriteLine(await bot.SendMessageAsync("What's the weather?"));
        foreach (var msg in bot.GetConversationHistory())
        {
            Console.WriteLine($"{msg.Role}: {msg.Content}");
        }
    }
}
