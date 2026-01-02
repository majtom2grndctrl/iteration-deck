#!/usr/bin/env node

/**
 * Iteration Deck CLI
 *
 * Manage git worktrees for iteration exploration
 */

import { Command } from 'commander';
import { createWorktreeCommand } from './commands/create.js';
import { cleanupWorktreeCommand } from './commands/cleanup.js';
import { listWorktreesCommand } from './commands/list.js';
import { statusCommand } from './commands/status.js';

const program = new Command();

program
  .name('iteration-deck')
  .description('Manage iteration deck worktrees for AI-first prototyping')
  .version('0.0.5');

// Create worktree command
program
  .command('worktree:create')
  .alias('create')
  .argument('<name>', 'Name for the iteration worktree (e.g., "buttons", "hero-layouts")')
  .description('Create a new iteration worktree for exploring design variations')
  .action(async (name: string) => {
    await createWorktreeCommand(name);
  });

// Cleanup worktree command
program
  .command('worktree:cleanup')
  .alias('cleanup')
  .argument('<name>', 'Name of the iteration worktree to remove')
  .description('Remove an iteration worktree and clean up the branch')
  .action(async (name: string) => {
    await cleanupWorktreeCommand(name);
  });

// List worktrees command
program
  .command('worktree:list')
  .alias('list')
  .description('List all active iteration worktrees')
  .action(async () => {
    await listWorktreesCommand();
  });

// Status command
program
  .command('worktree:status')
  .alias('status')
  .description('Show current worktree status and context')
  .action(async () => {
    await statusCommand();
  });

// Help examples
program.addHelpText(
  'after',
  `
Examples:
  # Create a new iteration worktree for button variations
  $ iteration-deck worktree:create buttons

  # List all active iteration worktrees
  $ iteration-deck worktree:list

  # Check current status
  $ iteration-deck worktree:status

  # Clean up a worktree after designer selection
  $ iteration-deck worktree:cleanup buttons

Workflow:
  1. Create worktree:      iteration-deck create <name>
  2. Implement variations: cd ../iteration-deck-<name>
  3. Designer chooses:     cd <original-dir>
  4. Copy chosen code:     (manually copy the selected variation)
  5. Cleanup:              iteration-deck cleanup <name>

Learn more: https://github.com/MajTom2GrndCtrl/iteration-deck
`
);

program.parse();
