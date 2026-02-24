// Flutter Assistant - OpenAI format
import 'dart:convert';
import 'package:http/http.dart' as http;

class AiAssistant {
  final String apiKey;
  final List<Map<String, String>> messages = [];
  
  AiAssistant(this.apiKey);
  
  Future<Map<String, dynamic>?> ask(
    String question, {
    bool useContext = true,
  }) async {
    final url = Uri.parse('https://api.aisool.com/v1/chat/completions');
    final headers = {
      'Authorization': 'Bearer $apiKey',
      'Content-Type': 'application/json',
    };
    
    var currentMessages = <Map<String, String>>[...messages];
    currentMessages.add({'role': 'user', 'content': question});
    
    if (!useContext) {
      currentMessages = [{'role': 'user', 'content': question}];
    }
    
    try {
      final response = await http.post(
        url,
        headers: headers,
        body: jsonEncode({
          'model': 'sool-max',
          'messages': currentMessages
        }),
      );
      
      if (response.statusCode != 200) return null;
      
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      final assistantMsg = data['choices'][0]['message'] as Map<String, dynamic>;
      
      if (useContext) {
        messages.add({'role': 'user', 'content': question});
        messages.add({
          'role': assistantMsg['role'] as String,
          'content': assistantMsg['content'] as String
        });
      }
      
      return {
        'answer': assistantMsg['content'],
        'status': data['choices'][0]['finish_reason'],
        'tokens': data['usage'],
      };
      
    } catch (e) {
      print('Assistant error: \$e');
      return null;
    }
  }
  
  void resetContext() => messages.clear();
}

// Usage
void main() async {
  final assistant = AiAssistant('${key}');
  final step1 = await assistant.ask('How do I use Flutter widgets?');
  print('Answer 1: \${step1?['answer']}\\n');
  
  final step2 = await assistant.ask('Can you show me an example?');
  print('Answer 2: \${step2?['answer']}\\n');
}
