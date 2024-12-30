import React from 'react';
import { FileText, Trash2, Download, Eye } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  type: string;
  size: string;
  lastModified: string;
  metadata?: Record<string, any>;
}

interface DocumentListProps {
  documents: Document[];
  onDelete: (id: string) => void;
  onView: (document: Document) => void;
}

export default function DocumentList({ documents, onDelete, onView }: DocumentListProps) {
  return (
    <div className="space-y-4">
      {documents.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No documents yet</h3>
          <p className="text-gray-400">Upload documents to get started</p>
        </div>
      ) : (
        <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg border border-white/10">
          <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium text-gray-400">
            <div className="col-span-2">Name</div>
            <div>Type</div>
            <div>Size</div>
            <div>Last Modified</div>
          </div>
          <div className="divide-y divide-white/10">
            {documents.map((doc) => (
              <div key={doc.id} className="grid grid-cols-5 gap-4 p-4 hover:bg-white/5 transition-colors">
                <div className="col-span-2 flex items-center">
                  <FileText className="h-5 w-5 text-[#72f68e] mr-3 flex-shrink-0" />
                  <span className="text-white truncate">{doc.title}</span>
                </div>
                <div className="text-gray-400 flex items-center">{doc.type}</div>
                <div className="text-gray-400 flex items-center">{doc.size}</div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">{doc.lastModified}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onView(doc)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(doc.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}