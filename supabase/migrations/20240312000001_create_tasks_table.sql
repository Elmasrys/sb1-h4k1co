-- Create tasks table
CREATE TABLE public.tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status TEXT NOT NULL CHECK (status IN ('pending', 'scheduled', 'in_progress', 'completed', 'failed', 'cancelled')),
    assigned_to UUID NOT NULL REFERENCES public.eves(id),
    created_by UUID NOT NULL REFERENCES public.eves(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    scheduled_for TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    deadline TIMESTAMP WITH TIME ZONE,
    dependencies UUID[] DEFAULT '{}',
    result JSONB,
    error TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'
);

-- Add indexes
CREATE INDEX idx_tasks_status ON public.tasks(status);
CREATE INDEX idx_tasks_assigned_to ON public.tasks(assigned_to);
CREATE INDEX idx_tasks_created_by ON public.tasks(created_by);
CREATE INDEX idx_tasks_scheduled_for ON public.tasks(scheduled_for);
CREATE INDEX idx_tasks_deadline ON public.tasks(deadline);

-- Add RLS policies
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their company's tasks"
    ON public.tasks FOR SELECT
    USING (auth.uid() IN (
        SELECT owner_id FROM companies WHERE id = current_setting('app.company_id')::uuid
    ));

CREATE POLICY "Users can create tasks"
    ON public.tasks FOR INSERT
    WITH CHECK (auth.uid() IN (
        SELECT owner_id FROM companies WHERE id = current_setting('app.company_id')::uuid
    ));

CREATE POLICY "Users can update their company's tasks"
    ON public.tasks FOR UPDATE
    USING (auth.uid() IN (
        SELECT owner_id FROM companies WHERE id = current_setting('app.company_id')::uuid
    ));

CREATE POLICY "Users can delete their company's tasks"
    ON public.tasks FOR DELETE
    USING (auth.uid() IN (
        SELECT owner_id FROM companies WHERE id = current_setting('app.company_id')::uuid
    ));

-- Add updated_at trigger
CREATE TRIGGER handle_tasks_updated_at
    BEFORE UPDATE ON public.tasks
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();