import React from 'react';
import { X, Download, FileText } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  type: string;
  content: string;
  metadata?: Record<string, any>;
}

interface DocumentViewerProps {
  document: Document;
  onClose: () => void;
}

export default function DocumentViewer({ document, onClose }: DocumentViewerProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#040707]/95 rounded-lg w-full max-w-4xl m-4 border border-white/10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#72f68e]/20 flex items-center justify-center">
              <FileText className="h-5 w-5 text-[#72f68e]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">{document.title}</h2>
              <p className="text-sm text-gray-400">{document.type}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                // Create a blob and download the file
                const blob = new Blob([document.content], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = document.title;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="prose prose-invert max-w-none">
            {document.type === 'text/markdown' ? (
              <div className="whitespace-pre-wrap font-mono text-sm text-gray-300">
                {document.content}
              </div>
            ) : document.type === 'application/json' ? (
              <pre className="bg-white/5 p-4 rounded-lg overflow-auto">
                <code className="text-sm text-gray-300">
                  {JSON.stringify(JSON.parse(document.content), null, 2)}
                </code>
              </pre>
            ) : (
              <div className="whitespace-pre-wrap text-gray-300">
                {document.content}
              </div>
            )}
          </div>
        </div>

        {/* Metadata */}
        {document.metadata && Object.keys(document.metadata).length > 0 && (
          <div className="border-t border-white/10 p-4">
            <h3 className="text-sm font-medium text-white mb-2">Metadata</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(document.metadata).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <span className="text-gray-400">{key}: </span>
                  <span className="text-white">{JSON.stringify(value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}