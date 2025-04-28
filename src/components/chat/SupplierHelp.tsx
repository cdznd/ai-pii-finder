import React from 'react';

const SupplierHelp = ({ handleInputChange }: { handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) => {
  // to-do: fix prop drilling with the handleInputChange
  return (
    <div className="mb-8 p-4 rounded-lg border backdrop-blur-sm transition-all duration-300
                    bg-white/80 dark:bg-gray-800/80
                    border-gray-200 dark:border-gray-700
                    shadow-md hover:shadow-lg">
      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Supplier Search Examples</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
        Try asking questions about the supplier database:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <ExampleQuery query="What are the top 3 suppliers with the highest risk scores?" handleInputChange={handleInputChange} />
        <ExampleQuery query="Show me all suppliers in the healthcare industry" handleInputChange={handleInputChange} />
        <ExampleQuery query="Which suppliers have financial compliance risks?" handleInputChange={handleInputChange} />
        <ExampleQuery query="List suppliers with risk scores above 7" handleInputChange={handleInputChange} />
        <ExampleQuery query="Show suppliers located in Germany" handleInputChange={handleInputChange} />
        <ExampleQuery query="What suppliers have cybersecurity risks?" handleInputChange={handleInputChange} />
      </div>
    </div>
  );
};

const ExampleQuery = ({ query, handleInputChange }: { query: string; handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) => {
  return (
    <button 
      className="text-sm text-left p-2 rounded transition-colors w-full
                bg-white dark:bg-gray-700
                border border-gray-200 dark:border-gray-600
                text-gray-800 dark:text-gray-200
                hover:bg-gray-100 dark:hover:bg-gray-600/80
                shadow-sm hover:shadow"
      onClick={() => {
        // Find the chat textarea and set its value
        const textareaElement = document.querySelector('textarea') as HTMLTextAreaElement;
        if (textareaElement) {
          textareaElement.value = query;
          textareaElement.focus();
          
          // Create a synthetic event to pass to handleInputChange
          const event = {
            target: textareaElement,
            currentTarget: textareaElement
          } as React.ChangeEvent<HTMLTextAreaElement>;
          
          handleInputChange(event);
        }
      }}
    >
      {query}
    </button>
  );
};

export default SupplierHelp; 