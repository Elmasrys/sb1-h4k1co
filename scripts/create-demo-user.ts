import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ajptadfjsarcalvjnjdw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqcHRhZGZqc2FyY2FsdmpuamR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyNjA0NzYsImV4cCI6MjA0NzgzNjQ3Nn0.8vSafgEHsaNkFonBqJW7p0QJQhHPSnPNcEgoQayn3NE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createDemoUser() {
  // Create user with admin access
  const { data, error } = await supabase.auth.signUp({
    email: 'demo@mavrika.ai',
    password: 'Demo@mavrika2024!', // Stronger password meeting common requirements
    options: {
      data: {
        name: 'Demo User',
        is_demo: true
      }
    }
  });

  if (error) {
    console.error('Error creating demo user:', error.message);
    return;
  }

  console.log('Demo user created successfully:', data.user);
}

createDemoUser();