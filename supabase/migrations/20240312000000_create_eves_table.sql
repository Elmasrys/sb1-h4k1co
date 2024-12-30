-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create EVEs table
CREATE TABLE public.eves (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('active', 'busy', 'idle')),
    type TEXT NOT NULL CHECK (type IN ('orchestrator', 'specialist', 'support')),
    capabilities TEXT[] NOT NULL DEFAULT '{}',
    parent_id UUID REFERENCES public.eves(id),
    performance JSONB NOT NULL DEFAULT '{
        "efficiency": 0,
        "accuracy": 0,
        "tasks_completed": 0
    }',
    models JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes
CREATE INDEX idx_eves_type ON public.eves(type);
CREATE INDEX idx_eves_status ON public.eves(status);
CREATE INDEX idx_eves_parent_id ON public.eves(parent_id);

-- Add RLS policies
ALTER TABLE public.eves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own EVEs"
    ON public.eves FOR SELECT
    USING (auth.uid() IN (
        SELECT owner_id FROM companies WHERE id = current_setting('app.company_id')::uuid
    ));

CREATE POLICY "Users can create EVEs"
    ON public.eves FOR INSERT
    WITH CHECK (auth.uid() IN (
        SELECT owner_id FROM companies WHERE id = current_setting('app.company_id')::uuid
    ));

CREATE POLICY "Users can update their own EVEs"
    ON public.eves FOR UPDATE
    USING (auth.uid() IN (
        SELECT owner_id FROM companies WHERE id = current_setting('app.company_id')::uuid
    ));

CREATE POLICY "Users can delete their own EVEs"
    ON public.eves FOR DELETE
    USING (auth.uid() IN (
        SELECT owner_id FROM companies WHERE id = current_setting('app.company_id')::uuid
    ));

-- Add updated_at trigger
CREATE TRIGGER handle_eves_updated_at
    BEFORE UPDATE ON public.eves
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();