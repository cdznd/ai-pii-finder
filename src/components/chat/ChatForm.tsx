import React, { KeyboardEvent, useRef, useEffect } from 'react';

type ChatFormProps = {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

const ChatForm = ({ input, handleInputChange, onSubmit, isLoading }: ChatFormProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [input]);

  // Handle key press - Enter to send, Shift+Enter for new line
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        // Enter without shift - send message
        e.preventDefault();
        const form = e.currentTarget.form;
        if (form && !isLoading && input.trim()) {
          form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      }
      // With shift pressed, default behavior (new line) occurs
    }
  };

  return (
    <form onSubmit={onSubmit} className="fixed bottom-0 left-0 right-0 p-4 z-20 flex justify-center">
      <div className="w-full max-w-xl flex items-center">
        <div className="flex-grow flex items-center relative">
          <textarea
            ref={textareaRef}
            className="w-full h-full p-3 pr-3 border border-gray-300 bg-white dark:bg-gray-800 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2D68BB] transition-all duration-200 min-h-[48px] resize-none overflow-hidden"
            value={input}
            placeholder="Type your message..."
            onChange={handleInputChange}
            disabled={isLoading}
            rows={1}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button 
          type="submit" 
          className="ml-2 p-3 cursor-pointer bg-[#2D68BB] text-white rounded-full hover:bg-[#4c1c91] disabled:opacity-50 disabled:hover:bg-[#2D68BB] transform hover:scale-105 transition-all duration-200 flex-shrink-0"
          disabled={isLoading || !input.trim()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="h-5 w-5 fill-current">
            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default ChatForm; 