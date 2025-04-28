'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState } from 'react';

import Background from '@/components/layout/Background';
import Header from '@/components/layout/Header';
import MessageList from '@/components/chat/MessageList';
import ChatForm from '@/components/chat/ChatForm';

import InitialMessage from '@/components/chat/InitialMessage';

export default function Chat() {

  const { messages, input, handleInputChange, handleSubmit, status, error } = useChat();

  const isLoading = status === "streaming"
  const isSubmitted = status === "submitted"

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  // File Management
  const [selectedFiles, setSelectedFiles] = useState<FileList | undefined>(undefined);
  const [hasFiles, setHasFiles] = useState(false);

  const handleFilesChange = (filesUploaded: boolean) => {
    setHasFiles(filesUploaded);
  };

  const handleFilesSelect = (file: FileList | undefined) => {
    setSelectedFiles(file);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFiles) {
      handleSubmit(e, {
        experimental_attachments: selectedFiles
      })
    } else {
      handleSubmit(e)
    }
    setShouldScroll(true);
  };

  useEffect(() => {
    if (shouldScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setShouldScroll(false);
    }
  }, [messages, shouldScroll]);

  return (
    <div className="flex flex-col h-[100vh] w-full max-h-[100vh] relative">
      <Background />
      <Header />
      <div className="flex-1 w-full max-w-2xl mx-auto px-4 flex flex-col relative overflow-hidden">
        {messages.length === 0 && (
          <InitialMessage
            onFilesChange={handleFilesChange}
            onFilesSelect={handleFilesSelect}
          />
        )}
        {messages.length > 0 && (
          <MessageList
            messages={messages}
            isLoading={isLoading}
            isSubmitted={isSubmitted}
            messagesEndRef={messagesEndRef}
            error={error}
          />
        )}
        <ChatForm
          input={input}
          handleInputChange={handleInputChange}
          onSubmit={onSubmit}
          isLoading={isLoading}
          hasFiles={hasFiles}
        />
      </div>
    </div>
  );
}
