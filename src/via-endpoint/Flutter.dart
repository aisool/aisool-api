import 'dart:convert';
import 'package:http/http.dart' as http;

final response = await http.post(
  Uri.parse('https://api.aisool.com/v1/chat/completions'),
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY', 
    'Content-Type': 'application/json',
  },
  body: jsonEncode({
    'model': 'sool-max',
    'messages': [
      {'role': 'user', 'content': 'Hello AI!'}
    ]
  }),
);

final data = jsonDecode(response.body);
final message = data['choices'][0]['message'];

print('Role: ${message['role']}');
print('Content: ${message['content']}'); 
print('Finish Reason: ${data['choices'][0]['finish_reason']}'); 
print('Usage: ${jsonEncode(data['usage'])}'); 
