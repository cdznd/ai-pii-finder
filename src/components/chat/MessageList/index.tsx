import { Message as MessageType } from '@ai-sdk/react';
import { MutableRefObject } from 'react';
import Message from './Message';

import { Atom, ThreeDot } from 'react-loading-indicators';

type MessageListProps = {
  messages: MessageType[];
  isLoading: boolean;
  isSubmitted: boolean;
  messagesEndRef: MutableRefObject<HTMLDivElement | null>;
  error: Error | undefined;
};

const MessageList = ({ messages, isLoading, isSubmitted, messagesEndRef, error }: MessageListProps) => {
  return (
    <div className="absolute inset-0 overflow-y-scroll w-full p-4 pb-24
                    scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 
                    scrollbar-track-transparent hover:scrollbar-thumb-gray-400 
                    dark:hover:scrollbar-thumb-gray-500">
      <div className="space-y-4 min-h-full pb-24">
        {/* Mapping all the messages into the message component */}
        {messages.map((message, index) => (
          <Message key={message.id} message={message} index={index} />
        ))}
        {/* Displaying loading and submition indicators */}
        <div className='flex align-center justify-center'>
          {isSubmitted && <Atom color={["#5C1E1E", "#ED8682", "#2D68BB"]} size='small' />}
          {isLoading && <ThreeDot color={["#5C1E1E"]} size='small' />}
        </div>
        {/* Error indicator */}
        {error && (
          <div className="bg-red-100/70 text-red-700 px-4 py-3 rounded relative mt-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error.message}</span>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>
    </div>
  );
};

export default MessageList; 