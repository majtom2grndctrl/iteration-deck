/**
 * List iteration worktrees command
 */

import { existsSync } from 'fs';
import { getAllWorktrees } from '../utils/state.js';
import { isGitRepo, worktreeExists } from '../utils/git.js';

export async function listWorktreesCommand(): Promise<void> {
  // Validate we're in a git repository
  if (!isGitRepo()) {
    console.error('❌ Error: Not in a git repository');
    process.exit(1);
  }

  const worktrees = getAllWorktrees();
  const worktreeNames = Object.keys(worktrees);

  if (worktreeNames.length === 0) {
    console.log('\n📋 No active iteration worktrees');
    console.log('\n   Create one with: iteration-deck worktree:create <name>');
    return;
  }

  console.log(`\n📋 Active iteration worktrees (${worktreeNames.length}):\n`);

  for (const name of worktreeNames) {
    const info = worktrees[name];
    const exists = worktreeExists(info.path) || existsSync(info.path);
    const statusIcon = exists ? '✓' : '⚠';
    const statusText = exists ? 'exists' : 'missing';

    console.log(`   ${statusIcon} ${name}`);
    console.log(`      Path: ${info.path} (${statusText})`);
    console.log(`      Branch: ${info.branch}`);
    console.log(`      Created: ${new Date(info.createdAt).toLocaleString()}`);
    console.log(`      Original branch: ${info.originalBranch}`);
    console.log('');
  }

  console.log('   Cleanup with: iteration-deck worktree:cleanup <name>');
}
