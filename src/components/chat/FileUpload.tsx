import React, { useState, useEffect, useRef } from 'react';

const FileUpload = ({ 
  onFilesChange,
  onFilesSelect,
}: { 
  onFilesChange: (hasFiles: boolean) => void;
  onFilesSelect: (file: FileList | undefined) => void;
}) => {
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  useEffect(() => {
    onFilesChange(!!files);
    onFilesSelect(files);
  }, [files, onFilesChange, onFilesSelect]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setError('');
    const selectedFiles = Array.from(fileList); // Convert FileList to Array<File> to simplify error handling

    // Validate each file
    const invalidFile = selectedFiles.find(file => 
      !allowedTypes.includes(file.type) || file.size > maxFileSize
    );

    if (invalidFile) {
      if (!allowedTypes.includes(invalidFile.type)) {
        setError('Only images (JPEG, PNG, GIF) and PDF files are allowed');
      } else if (invalidFile.size > maxFileSize) {
        setError('File size should not exceed 10MB');
      }
      return;
    }

    setFiles(fileList);
  };
  
  const removeFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFiles(undefined);
    // Clear the file input so the same file can be uploaded again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileList = e.dataTransfer.files;
      const event = {
        target: {
          files: fileList
        }
      } as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(event);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleDropAreaClick = (e: React.MouseEvent) => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="mb-8 p-4 rounded-lg border backdrop-blur-sm transition-all duration-300
                    bg-white/80 dark:bg-gray-800/80
                    border-gray-200 dark:border-gray-700
                    shadow-md hover:shadow-lg">
      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Upload File</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
        Upload an image or PDF to analyze for PII (Personally Identifiable Information)
      </p>
      
      {!files ? (
        <div 
          className="border-2 border-dashed rounded-lg p-4 mb-4 text-center relative
                    border-gray-300 dark:border-gray-600
                    bg-gray-50 dark:bg-gray-700/40
                    cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleDropAreaClick}
        >
          <div className="flex flex-col items-center">
            <svg className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Images (JPEG, PNG, GIF) or PDF (Max: 10MB)
            </p>
          </div>
          <input 
            ref={fileInputRef}
            type="file"
            accept="image/jpeg, image/png, image/gif, application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="mt-4 mb-4">
          <div className="flex items-center justify-between p-3 rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
            <div className="flex items-center flex-grow">
              {files[0].type.startsWith('image/') ? (
                <svg className="w-8 h-8 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              ) : (
                <svg className="w-8 h-8 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              )}
              <div>
                <p className="font-medium text-blue-700 dark:text-blue-300">{files[0].name}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  {files[0].type} • {(files[0].size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <button 
              type="button"
              className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors cursor-pointer"
              onClick={removeFile}
              aria-label={`Remove ${files[0].name}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {error && (
        <div className="text-red-500 text-sm mb-2">
          {error}
        </div>
      )}

    </div>
  );
};

export default FileUpload; 