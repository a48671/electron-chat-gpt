import { useState } from 'react';
import { IMessage } from './types/message.interface';
import MessageItem from './message-item';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  
  const handleSubmit = async () => {
    if (!prompt.trim().length) {
      return;
    }
    
    setMessages((currentMessages) => {
      return [
        ...currentMessages,
        { author: 'Human', text: prompt, id: new Date().toISOString() }
      ];
    });
    
    setPrompt('');
    
    const response = await electron.chatGptApi.getCompletion(prompt);
    
    if (response.error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        { author: 'AI', text: response.error, id: new Date().toISOString() + 'AI' }
      ]);
      return;
    }
    
    setMessages((currentMessages) => [
      ...currentMessages,
      { author: 'AI', text: response.message, id: new Date().toISOString() + 'AI' }
    ]);
  }
  
  return (
    <div className="container">
      <div className="inputContainer">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask a question"
          rows={3}
        />
        <button
          onClick={handleSubmit}
          className="submit"
        >
          Submit
        </button>
      </div>
      <div className="answers">
        {messages.map(message => <MessageItem key={message.id} message={message}/>)}
      </div>
    </div>
  )
}
