// Flutter Bot - OpenAI format
import 'dart:convert';
import 'package:http/http.dart' as http;

class AiBot {
  final String apiKey;
  final List<Map<String, String>> conversationHistory = [];
  
  AiBot(this.apiKey);
  
  Future<String?> sendMessage(String message) async {
    final url = Uri.parse('https://api.aisool.com/v1/chat/completions');
    final headers = {
      'Authorization': 'Bearer $apiKey',
      'Content-Type': 'application/json',
    };
    
    conversationHistory.add({'role': 'user', 'content': message});
    
    try {
      final response = await http.post(
        url,
        headers: headers,
        body: jsonEncode({
          'model': 'sool-max',
          'messages': conversationHistory
        }),
      );
      
      if (response.statusCode != 200) return null;
      
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      final assistantMsg = data['choices'][0]['message'] as Map<String, dynamic>;
      
      conversationHistory.add({
        'role': assistantMsg['role'] as String,
        'content': assistantMsg['content'] as String
      });
      
      return assistantMsg['content'] as String?;
      
    } catch (e) {
      print('Bot error: \$e');
      return null;
    }
  }
  
  List<Map<String, dynamic>> getHistory() => conversationHistory;
  
  void clearHistory() => conversationHistory.clear();
}

// Usage
void main() async {
  final bot = AiBot('${key}');
  print(await bot.sendMessage('Hello!'));
  print(await bot.sendMessage('Tell me a joke'));
  for (var msg in bot.getHistory()) {
    print('\${msg['role']}: \${msg['content']}');
  }
}
