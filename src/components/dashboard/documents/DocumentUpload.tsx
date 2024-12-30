import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, AlertTriangle } from 'lucide-react';
import { useKnowledgeBase } from '../../../hooks/useKnowledgeBase';

interface DocumentUploadProps {
  onUploadComplete: () => void;
}

export default function DocumentUpload({ onUploadComplete }: DocumentUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addDocument } = useKnowledgeBase();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    setError(null);

    try {
      for (const file of acceptedFiles) {
        const reader = new FileReader();
        
        await new Promise((resolve, reject) => {
          reader.onload = async () => {
            try {
              const content = reader.result as string;
              await addDocument(content, {
                type: 'uploaded_file',
                filename: file.name,
                fileType: file.type,
                fileSize: file.size,
                uploadedAt: new Date().toISOString()
              });
              resolve(null);
            } catch (err) {
              reject(err);
            }
          };
          reader.onerror = () => reject(reader.error);
          
          if (file.type.startsWith('text/') || file.type === 'application/json') {
            reader.readAsText(file);
          } else {
            reader.readAsDataURL(file);
          }
        });
      }

      onUploadComplete();
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload document');
    } finally {
      setUploading(false);
    }
  }, [addDocument, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/json': ['.json'],
      'text/markdown': ['.md'],
      'text/csv': ['.csv']
    },
    maxSize: 10485760, // 10MB
    multiple: true
  });

  return (
    <div className="mb-8">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          isDragActive
            ? 'border-[#72f68e] bg-[#72f68e]/10'
            : 'border-white/10 hover:border-white/20'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg bg-[#72f68e]/20 p-3 mb-4">
            {uploading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#72f68e] border-t-transparent" />
            ) : (
              <Upload className="h-6 w-6 text-[#72f68e]" />
            )}
          </div>

          <p className="text-lg font-medium text-white mb-2">
            {isDragActive
              ? 'Drop files here...'
              : 'Drag & drop files here, or click to select'}
          </p>
          
          <p className="text-sm text-gray-400">
            Supported formats: TXT, PDF, JSON, MD, CSV (max 10MB)
          </p>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500 rounded-lg flex items-center text-red-400">
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}