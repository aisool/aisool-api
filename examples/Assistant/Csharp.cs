// C# Assistant - OpenAI-compatible context-aware
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

public class AiAssistant
{
    private readonly HttpClient _client;
    private readonly List<Message> _messages;
    
    public AiAssistant(string apiKey)
    {
        _client = new HttpClient();
        _client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
        _messages = new List<Message>();
    }
    
    public async Task<AssistantResponse> AskAsync(string question, bool useContext = true)
    {
        try
        {
            var currentMessages = useContext 
                ? new List<Message>(_messages) 
                : new List<Message>();
                
            currentMessages.Add(new Message { Role = "user", Content = question });
            
            var payload = new 
            {
                model = "sool-max",
                messages = currentMessages
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
            
            var answer = msg.GetProperty("content").GetString();
            var finishReason = choice.GetProperty("finish_reason").GetString();
            
            if (useContext)
            {
                _messages.Add(new Message { Role = "user", Content = question });
                _messages.Add(new Message 
                { 
                    Role = msg.GetProperty("role").GetString(), 
                    Content = answer 
                });
            }
            
            return new AssistantResponse
            {
                Answer = answer,
                Status = finishReason,
                Tokens = data.TryGetProperty("usage", out var usage) 
                    ? usage.ToString() 
                    : null
            };
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Assistant error: {ex.Message}");
            return null;
        }
    }
    
    public void ResetContext() => _messages.Clear();
}

public class Message
{
    public string Role { get; set; }
    public string Content { get; set; }
}

public class AssistantResponse
{
    public string Answer { get; set; }
    public string Status { get; set; }
    public string Tokens { get; set; }
}

// Usage
class Program
{
    static async Task Main()
    {
        var assistant = new AiAssistant("${key}");
        var step1 = await assistant.AskAsync("How do I use async/await in C#?");
        Console.WriteLine($"Answer: {step1.Answer}\\n");
        
        var step2 = await assistant.AskAsync("Can you show me an example?");
        Console.WriteLine($"Answer: {step2.Answer}\\n");
    }
}
