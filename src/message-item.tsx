import { FC, useEffect, useState } from 'react';
import { IMessage } from './types/message.interface';

const MessageItem: FC<{ message: IMessage }> = ({ message }) => {
  const [text, setText] = useState(message.author === 'AI' ? '' : message.text);
  
  useEffect(() => {
    if (message.author !== 'AI') {
      return;
    }
    
    setTimeout(() => {
      setText(message.text.slice(0, text.length + 1));
    }, 50);
  }, [text, message.text, message.author]);
  
  return (
    <div key={message.id} className="answer">
      <div
        className={`author ${message.author === 'AI' ? 'author-ai' : 'author-human'}`}
      >
        {message.author}:
      </div>
      <div className="message">
        {text}
      </div>
    </div>
  );
}

export default MessageItem;
