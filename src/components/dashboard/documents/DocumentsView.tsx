import React, { useState, useEffect } from 'react';
import { useKnowledgeBase } from '../../../hooks/useKnowledgeBase';
import DocumentUpload from './DocumentUpload';
import DocumentList from './DocumentList';
import DocumentViewer from './DocumentViewer';
import { Search, Filter, AlertTriangle } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  type: string;
  size: string;
  lastModified: string;
  content: string;
  metadata?: Record<string, any>;
}

export default function DocumentsView() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const { search, deleteDocument, loading, error } = useKnowledgeBase();

  const loadDocuments = async () => {
    try {
      const results = await search('', { type: 'uploaded_file' });
      const docs = results.map(result => ({
        id: result.id,
        title: result.metadata.filename || 'Untitled Document',
        type: result.metadata.fileType || 'text/plain',
        size: formatFileSize(result.metadata.fileSize || 0),
        lastModified: new Date(result.metadata.uploadedAt).toLocaleString(),
        content: result.content,
        metadata: result.metadata
      }));
      setDocuments(docs);
    } catch (err) {
      console.error('Error loading documents:', err);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadDocuments();
      return;
    }

    try {
      const results = await search(searchQuery, { type: 'uploaded_file' });
      const docs = results.map(result => ({
        id: result.id,
        title: result.metadata.filename || 'Untitled Document',
        type: result.metadata.fileType || 'text/plain',
        size: formatFileSize(result.metadata.fileSize || 0),
        lastModified: new Date(result.metadata.uploadedAt).toLocaleString(),
        content: result.content,
        metadata: result.metadata
      }));
      setDocuments(docs);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDocument(id);
      await loadDocuments();
    } catch (err) {
      console.error('Error deleting document:', err);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Knowledge Base</h1>
          <p className="mt-1 text-sm text-gray-400">
            Upload and manage your company's documents
          </p>
        </div>
      </div>

      <DocumentUpload onUploadComplete={loadDocuments} />

      <div className="my-8">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
            />
          </div>
          
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-[#72f68e] text-[#040707] rounded-lg hover:bg-[#72f68e]/90 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-8 bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <DocumentList
        documents={documents}
        onDelete={handleDelete}
        onView={setSelectedDocument}
      />

      {selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
}