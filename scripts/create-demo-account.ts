import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ajptadfjsarcalvjnjdw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqcHRhZGZqc2FyY2FsdmpuamR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyNjA0NzYsImV4cCI6MjA0NzgzNjQ3Nn0.8vSafgEHsaNkFonBqJW7p0QJQhHPSnPNcEgoQayn3NE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createDemoAccount() {
  // First, check if the demo account already exists
  const { data: existingUser } = await supabase.auth.signInWithPassword({
    email: 'demo@mavrika.ai',
    password: 'demo123!'
  });

  if (existingUser?.user) {
    console.log('Demo account already exists');
    return;
  }

  // Create demo user if it doesn't exist
  const { data: user, error: signUpError } = await supabase.auth.signUp({
    email: 'demo@mavrika.ai',
    password: 'demo123!',
    options: {
      data: {
        is_demo: true,
        created_at: new Date().toISOString(),
      }
    }
  });

  if (signUpError) {
    console.error('Error creating demo account:', signUpError.message);
    return;
  }

  console.log('Demo account created successfully');
}

createDemoAccount();