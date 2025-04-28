'use client';

import { useState } from 'react';

const Header = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const toggleTooltip = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };
  
  return (
    <header className="bg-[#2D68BB] text-white py-2 px-4 sm:px-6 shadow-md flex-shrink-0 z-10 relative flex justify-between items-center">
      <h1 className="text-base sm:text-lg font-mono font-light truncate pr-2">AI PII Finder 🕵️‍♂️</h1>
      
      <div className="relative">
        <button 
          className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="Information"
          onClick={toggleTooltip}
          aria-expanded={isTooltipOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        </button>
        
        {isTooltipOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsTooltipOpen(false)}
              aria-hidden="true"
            />
            <div className="absolute right-0 mt-2 w-72 bg-white text-gray-800 text-sm p-4 rounded-lg shadow-lg z-20 transition-all duration-200">
              <div className="font-medium text-base mb-4 text-[#2D68BB]"><span className='font-bold'>About this tool</span></div>
              
              <div className="space-y-2">
                <p className="flex items-center">
                  <span className="mr-1">👨‍💻</span> Developed by <span className="font-semibold ml-1">Fabricio Gabriel</span>
                </p>
                
                <div className="flex items-start">
                  <span className="mr-1">📂</span>
                  <div>
                    <p className="mb-1">Project Repository:</p>
                    <a 
                      href="https://github.com/cdznd/ai-pii-finder" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                    >
                      cdznd/ai-pii-finder
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                <p className="flex items-center">
                  <span className="mr-1">🤖</span> AI Model: <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-xs ml-1">gemini-2.0-flash-001</span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header; 