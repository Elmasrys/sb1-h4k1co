import { validateEnvironment } from '../src/utils/validation';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

const main = () => {
  // Load .env file
  dotenv.config();

  // Check if .env file exists
  const envPath = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    console.error('\x1b[31mError: No .env file found\x1b[0m');
    console.log('Please copy .env.example to .env and fill in your values');
    process.exit(1);
  }

  try {
    validateEnvironment(process.env);
    console.log('\x1b[32mEnvironment validation successful!\x1b[0m');
  } catch (error) {
    console.error('\x1b[31mEnvironment validation failed:\x1b[0m');
    if (error instanceof Error) {
      console.error(error.message);
    }
    process.exit(1);
  }
};

main();