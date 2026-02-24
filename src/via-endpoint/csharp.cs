using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        var client = new HttpClient();
        client.DefaultRequestHeaders.Add('Authorization', 'Bearer YOUR_API_KEY'); 

        var payload = new {
            model = 'sool-max',
            messages = new[] {
                new { role = 'user', content = 'Hello AI!' }
            }
        };

        var content = new StringContent(
            JsonSerializer.Serialize(payload),
            Encoding.UTF8,
            'application/json'
        );

        try
        {
            var response = await client.PostAsync(
                'https://api.aisool.com/v1/chat/completions',
                content
            );

            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync();
            var data = JsonSerializer.Deserialize<JsonElement>(responseBody);

            var message = data.GetProperty('choices')[0].GetProperty('message');

            Console.WriteLine('Role: ' + message.GetProperty('role').GetString());
            Console.WriteLine('Content: ' + message.GetProperty('content').GetString());
            Console.WriteLine('Finish Reason: ' + data.GetProperty('choices')[0].GetProperty('finish_reason').GetString());

            if (data.TryGetProperty('usage', out JsonElement usage))
            {
                Console.WriteLine('Usage: ' + usage.ToString());
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine('Error: ' + ex.Message);
        }
    }
}
