import { z } from 'zod';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { prompt } from 'enquirer';

const requiredEnvVars = [
  {
    key: 'VITE_SUPABASE_URL',
    description: 'Supabase Project URL',
    validate: (value: string) => z.string().url().safeParse(value).success
  },
  {
    key: 'VITE_SUPABASE_ANON_KEY',
    description: 'Supabase Anonymous Key',
    validate: (value: string) => z.string().min(1).safeParse(value).success
  },
  {
    key: 'VITE_OPENAI_API_KEY',
    description: 'OpenAI API Key',
    validate: (value: string) => z.string().startsWith('sk-').safeParse(value).success
  },
  {
    key: 'VITE_ANTHROPIC_API_KEY',
    description: 'Anthropic API Key',
    validate: (value: string) => z.string().startsWith('sk-ant-').safeParse(value).success
  }
];

async function setup() {
  console.log('\n🚀 Welcome to mavrika Setup\n');

  // Check for existing .env file
  const envPath = path.resolve(process.cwd(), '.env');
  let existingEnv: Record<string, string> = {};

  if (fs.existsSync(envPath)) {
    console.log('📝 Found existing .env file');
    dotenv.config();
    existingEnv = process.env;
  }

  const answers: Record<string, string> = {};

  // Prompt for each required variable
  for (const envVar of requiredEnvVars) {
    const existing = existingEnv[envVar.key];

    if (existing && envVar.validate(existing)) {
      console.log(`✅ ${envVar.key} is already configured`);
      answers[envVar.key] = existing;
      continue;
    }

    const { value } = await prompt<{ value: string }>({
      type: 'password',
      name: 'value',
      message: `Enter ${envVar.description}:`,
      validate: (value) => {
        if (!envVar.validate(value)) {
          return `Invalid ${envVar.key}`;
        }
        return true;
      }
    });

    answers[envVar.key] = value;
  }

  // Write .env file
  const envContent = Object.entries(answers)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  fs.writeFileSync(envPath, envContent);

  console.log('\n✨ Setup complete! Your environment is now configured.\n');
  console.log('Next steps:');
  console.log('1. Start the development server: npm run dev');
  console.log('2. Open http://localhost:5173 in your browser');
  console.log('3. Follow the in-app setup wizard to complete configuration\n');
}

setup().catch((error) => {
  console.error('\n❌ Setup failed:', error.message);
  process.exit(1);
});