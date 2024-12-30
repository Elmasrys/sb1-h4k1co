-- Enable the pgvector extension
create extension if not exists vector;

-- Create documents table with vector support
create table documents (
  id uuid primary key default uuid_generate_v4(),
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  embedding vector(1536), -- OpenAI embeddings are 1536 dimensions
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better performance
create index idx_documents_metadata on documents using gin(metadata);
create index idx_documents_embedding on documents using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Create function to match documents by similarity
create or replace function match_documents (
  query_embedding vector(1536),
  match_count int default null,
  filter jsonb default '{}'
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    id,
    content,
    metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where metadata @> filter
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;