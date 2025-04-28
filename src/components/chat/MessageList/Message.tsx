/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Message } from '@ai-sdk/react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

import CustomLink from '../CustomLink';

import { BlinkBlur } from 'react-loading-indicators';

// Types
interface MessagePart {
  type: string;
  text?: string;
  toolInvocation?: {
    toolName: string;
    state: 'partial-call' | 'call' | 'result';
  };
}

interface MessageProps {
  message: Message;
  index: number;
}

// Sub-components
const ToolInvocationIndicator = ({ 
  toolName, 
  state, 
  messageContent 
}: { 
  toolName: string; 
  state: string; 
  messageContent: string;
}) => {
  const isToolCallingInProgress =
    state === 'partial-call' ||
    state === 'call' ||
    (state === 'result' && !messageContent);

  const isToolCallingComplete = state === 'result' && messageContent;

  if (isToolCallingInProgress) {
    return (
      <div className="bg-yellow-500/40 text-white px-4 py-2 mr-2 mb-2 rounded-full inline-flex items-center text-sm font-medium shadow-md space-x-1">
        <BlinkBlur color="#CBAF03" size="small" text="" textColor="" style={{ fontSize: '4px' }} />
        <span className='ml-1'>Executing <span className="font-bold">{toolName}</span> tool</span>
      </div>
    );
  }

  if (isToolCallingComplete) {
    return (
      <div className="bg-green-500/30 text-white px-4 py-2 mr-2 mb-2 rounded-full inline-flex items-center text-sm font-medium shadow-md space-x-1">
        <svg className="w-4 h-4 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M16.704 4.296a1 1 0 0 1 0 1.408l-8 8a1 1 0 0 1-1.408 0l-4-4a1 1 0 1 1 1.408-1.408L8 11.586l7.296-7.296a1 1 0 0 1 1.408 0z" clipRule="evenodd" />
        </svg>
        <span className='ml-1'>Tool <span className="font-bold">{toolName}</span> executed successfully!</span>
      </div>
    );
  }

  return null;
};

const UserTextContent = ({ text, messageId, index }: { text: string; messageId: string; index: number }) => (
  <div key={`${messageId}-${index}`} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
    {text}
  </div>
);

const AITextContent = ({ text, messageId, index }: { text: string; messageId: string; index: number }) => (
  <div key={`${messageId}-${index}`} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        a: ({ node, ...props }) => <CustomLink {...props} />,
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="pl-4 border-l-4 border-blue-300/50 italic text-white/80 my-2 transition-all hover:border-blue-300/70"
            {...props}
          />
        ),
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full" {...props} />
          </div>
        ),
        li: ({ node, children, ...props }) => (
          <li {...props}>
            <span className="li-content text-white/90">{children}</span>
          </li>
        ),
        p: ({ node, children, ...props }) => (
          <p className="my-2 text-white/80" {...props}>{children}</p>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  </div>
);

// Helper functions
const renderMessagePart = (part: MessagePart, message: Message, index: number) => {
  switch (part.type) {
    case 'tool-invocation':
      if (!part.toolInvocation) return null;
      return (
        <ToolInvocationIndicator
          key={`${part.toolInvocation.toolName}-${message.id}`}
          toolName={part.toolInvocation.toolName}
          state={part.toolInvocation.state}
          messageContent={message.content}
        />
      );
    case 'text':
      if (!part.text) return null;
      return message.role === 'user' 
        ? <UserTextContent key={message.id} text={part.text} messageId={message.id} index={index} />
        : <AITextContent key={message.id} text={part.text} messageId={message.id} index={index} />;
    default:
      return null;
  }
};

// Main component
const MessageComponent = ({ message, index }: MessageProps) => {
  const [copyFeedback, setCopyFeedback] = useState(false);

  const copyMessage = () => {
    const textContent = message.parts
      ?.filter(part => part.type === 'text')
      .map(part => part.text)
      .join('\n');

    if (textContent) {
      navigator.clipboard.writeText(textContent)
        .then(() => {
          setCopyFeedback(true);
          setTimeout(() => setCopyFeedback(false), 2000);
        })
        .catch(err => console.error('Failed to copy message: ', err));
    }
  };

  const isUserMessage = message.role === 'user';
  const messageClasses = `p-4 rounded-lg transition-all duration-300 ease-in-out animate-fade-in backdrop-blur-sm
    ${isUserMessage 
      ? 'bg-[#2D68BB]/40 border-l-4 border-[#2D68BB] ml-auto text-white'
      : 'bg-[#ED8682]/40 border-l-4 border-[#ED8682] mr-auto text-white'
    } max-w-[85%] shadow-md hover:shadow-lg transition-shadow relative`;

  return (
    <div
      className={messageClasses}
      style={{
        animationDelay: `${index * 0.1}s`,
        transform: 'translateY(0)',
        opacity: 1
      }}
    >
      <div className="font-semibold mb-1 flex items-center">
        <div className="flex items-center">
          {isUserMessage ? (
            <>
              <span className="mr-2">You:</span>
              <div className="h-1.5 w-1.5 rounded-full bg-white/70 animate-pulse"></div>
            </>
          ) : (
            <>
              <span className="mr-2">AI:</span>
              <div className="h-1.5 w-1.5 rounded-full bg-white/70 animate-pulse"></div>
            </>
          )}
        </div>
      </div>

      <div className="markdown-content">
        {message.parts?.map((part: MessagePart, i) => renderMessagePart(part, message, i))}
      </div>

      <div className="mt-2 flex justify-end">
        <button
          onClick={copyMessage}
          className="cursor-pointer text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 flex items-center text-xs"
          title="Copy message"
        >
          <span className="mr-2">{copyFeedback ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
};

export default MessageComponent; 
