// Flutter/Dart Chat API - OpenAI-compatible
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<Map<String, dynamic>?> sendMessage(String userMessage) async {
  final url = Uri.parse('https://api.aisool.com/v1/chat/completions');
  
  final headers = {
    'Authorization': 'Bearer ${key}',
    'Content-Type': 'application/json',
  };
  
  final body = jsonEncode({
    'model': 'sool-max',
    'messages': [
      {'role': 'user', 'content': userMessage}
    ]
  });
  
  try {
    final response = await http.post(url, headers: headers, body: body);
    
    if (response.statusCode != 200) {
      print('API Error: \${response.statusCode}');
      return null;
    }
    
    final data = jsonDecode(response.body) as Map<String, dynamic>;
    
    print('Role: \${data['choices'][0]['message']['role']}');
    print('Content: \${data['choices'][0]['message']['content']}');
    print('Status: \${data['choices'][0]['finish_reason']}');
    print('Usage: \${data['usage']}');
    
    return data;
    
  } catch (e) {
    print('Error: \$e');
    return null;
  }
}

// Usage example
void main() async {
  final response = await sendMessage('What is machine learning?');
  if (response != null) {
    print('AI Response: \${response['choices'][0]['message']['content']}');
  }
}
