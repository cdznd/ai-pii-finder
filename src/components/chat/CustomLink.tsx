import { ComponentPropsWithoutRef } from 'react';

const CustomLink = ({ 
  href, 
  children, 
  ...props 
}: ComponentPropsWithoutRef<'a'>) => {
  const isExternal = href && href.startsWith('http');
  
  return (
    <a 
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="text-blue-300 hover:text-blue-100 underline decoration-dotted underline-offset-2 transition-colors duration-200 flex items-center group"
      {...props}
    >
      {children}
      {isExternal && (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-3.5 w-3.5 ml-1 inline-block opacity-70 group-hover:opacity-100 transition-opacity" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </a>
  );
};

export default CustomLink; 