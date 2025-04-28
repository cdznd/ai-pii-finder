import React, { KeyboardEvent, useRef, useEffect } from 'react';

type ChatFormProps = {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  hasFiles: boolean;
};

const ChatForm = ({ input, handleInputChange, onSubmit, isLoading, hasFiles }: ChatFormProps) => {
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
        if (form && !isLoading && input.trim() && hasFiles) {
          form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      }
      // With shift pressed, default behavior (new line) occurs
    }
  };

  const isDisabled = isLoading || !hasFiles;
  const noFilesMessage = "Please upload files to analyze...";

  return (
    <form onSubmit={onSubmit} className="fixed bottom-0 left-0 right-0 p-4 z-20 flex justify-center">
      <div className={`w-full max-w-xl flex items-center transition-all duration-300 ${!hasFiles ? 'opacity-80' : 'opacity-100'}`}>
        <div className={`flex-grow flex items-center relative ${!hasFiles ? 'border-dashed border-2 border-gray-300 dark:border-gray-600 rounded-2xl' : ''}`}>
          <textarea
            ref={textareaRef}
            className={`w-full h-full p-3 pr-3 border rounded-2xl shadow-lg focus:outline-none transition-all duration-200 min-h-[48px] resize-none overflow-hidden
                      ${!hasFiles ? 
                        'bg-gray-100 dark:bg-gray-700 border-transparent text-gray-400 dark:text-gray-500' : 
                        'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#2D68BB]'}`}
            value={input}
            placeholder={hasFiles ? "Type your message..." : noFilesMessage}
            onChange={handleInputChange}
            disabled={isDisabled}
            rows={1}
            onKeyDown={handleKeyDown}
          />
          {!hasFiles && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          )}
        </div>
        <button 
          type="submit" 
          className={`ml-2 p-3 cursor-pointer text-white rounded-full transform hover:scale-105 transition-all duration-200 flex-shrink-0
                    ${hasFiles ? 
                      'bg-[#2D68BB] hover:bg-[#4c1c91] disabled:opacity-50 disabled:hover:bg-[#2D68BB]' : 
                      'bg-gray-400 cursor-not-allowed opacity-60'}`}
          disabled={isDisabled || !input.trim()}
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