#!/usr/bin/env npx tsx
/**
 * Interactive setup script for Decoupled Podcast
 */

import { execSync, spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

function log(message: string, color: keyof typeof COLORS = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function logStep(step: number, total: number, message: string) {
  console.log(`\n${COLORS.cyan}[${step}/${total}]${COLORS.reset} ${COLORS.bright}${message}${COLORS.reset}`);
}

function logSuccess(message: string) {
  console.log(`${COLORS.green}✓${COLORS.reset} ${message}`);
}

function logError(message: string) {
  console.log(`${COLORS.red}✗${COLORS.reset} ${message}`);
}

async function prompt(question: string, defaultValue?: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const defaultHint = defaultValue ? ` (${defaultValue})` : '';
  return new Promise((resolve) => {
    rl.question(`${question}${defaultHint}: `, (answer) => {
      rl.close();
      resolve(answer.trim() || defaultValue || '');
    });
  });
}

async function confirm(question: string, defaultYes = true): Promise<boolean> {
  const hint = defaultYes ? '[Y/n]' : '[y/N]';
  const answer = await prompt(`${question} ${hint}`);
  if (!answer) return defaultYes;
  return answer.toLowerCase().startsWith('y');
}

function runCommandSync(command: string): { success: boolean; output: string } {
  try {
    const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    return { success: true, output };
  } catch (error: any) {
    return { success: false, output: error.message };
  }
}

async function main() {
  console.log(`
${COLORS.magenta}╔════════════════════════════════════════════════════╗
║                                                    ║
║     The Deep Dive Podcast - Interactive Setup      ║
║     Podcast Website Starter                        ║
║                                                    ║
╚════════════════════════════════════════════════════╝${COLORS.reset}
`);

  const totalSteps = 4;
  let currentStep = 1;

  logStep(currentStep++, totalSteps, 'Checking authentication');
  const result = runCommandSync('npx decoupled-cli@latest auth status 2>&1');
  const isAuthenticated = result.success && !result.output.includes('not authenticated');

  if (!isAuthenticated) {
    log('You need to authenticate with Decoupled.io first.', 'yellow');
    log('Run: npx decoupled-cli@latest auth login', 'cyan');
    process.exit(1);
  }
  logSuccess('Authenticated with Decoupled.io');

  logStep(currentStep++, totalSteps, 'Creating Drupal space');
  const spaceName = await prompt('Enter a name for your podcast site', 'The Deep Dive Podcast');
  log(`\nCreating space "${spaceName}"...`, 'dim');
  const createResult = runCommandSync(`npx decoupled-cli@latest spaces create "${spaceName}" 2>&1`);
  console.log(createResult.output);

  logStep(currentStep++, totalSteps, 'Importing content');
  const shouldImport = await confirm('Import sample podcast content?');
  if (shouldImport) {
    log('\nImporting content...', 'dim');
    const importResult = runCommandSync('npx decoupled-cli@latest content import --file data/starter-content.json 2>&1');
    console.log(importResult.output);
  }

  logStep(currentStep++, totalSteps, 'Setup Complete');
  console.log(`
${COLORS.green}╔════════════════════════════════════════════════════╗
║                  Setup Complete!                   ║
╚════════════════════════════════════════════════════╝${COLORS.reset}

${COLORS.bright}Next steps:${COLORS.reset}
  1. Start the development server: ${COLORS.cyan}npm run dev${COLORS.reset}
  2. Open ${COLORS.cyan}http://localhost:3000${COLORS.reset}
`);
}

main().catch((error) => {
  logError(`Setup failed: ${error.message}`);
  process.exit(1);
});
