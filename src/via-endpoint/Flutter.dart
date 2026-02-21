import 'dart:convert';
import 'package:http/http.dart' as http;

final response = await http.post(
  Uri.parse('https://aisool-max-v2.hf.space/v1/chat/completions'),
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

print('Role: $ {message['role']}'); // remove space between $ and {data['role']}
print('Content: $ {message['content']}'); // remove space between $ and {data['content']}
print('Finish Reason: $ {data['choices'][0]['finish_reason']}'); // remove space between $ and {data['finish_reason']}
print('Usage: $ {jsonEncode(data['usage'])}'); // remove space between $ and {jsonEncode(data['usage']}
