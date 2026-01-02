/**
 * Create iteration worktree command
 */

import { resolve } from 'path';
import { addWorktree, hasWorktree } from '../utils/state.js';
import {
  isGitRepo,
  getCurrentBranch,
  createWorktree,
  getCwd,
} from '../utils/git.js';
import type { WorktreeInfo } from '../types.js';

export async function createWorktreeCommand(name: string): Promise<void> {
  // Validate we're in a git repository
  if (!isGitRepo()) {
    console.error('❌ Error: Not in a git repository');
    process.exit(1);
  }

  // Check if worktree already exists in state
  if (hasWorktree(name)) {
    console.error(`❌ Error: Iteration worktree "${name}" already exists`);
    console.log('   Run `iteration-deck worktree:list` to see active worktrees');
    process.exit(1);
  }

  // Get current context
  const originalBranch = getCurrentBranch();
  const originalCwd = getCwd();

  // Define worktree path and branch name
  const worktreePath = resolve('..', `iteration-deck-${name}`);
  const branchName = `iterations/${name}`;

  console.log(`\n🌳 Creating iteration worktree for "${name}"...`);
  console.log(`   Path: ${worktreePath}`);
  console.log(`   Branch: ${branchName}`);
  console.log(`   Original branch: ${originalBranch}`);

  try {
    // Create the worktree
    createWorktree(worktreePath, branchName);

    // Save to state
    const worktreeInfo: WorktreeInfo = {
      path: worktreePath,
      branch: branchName,
      originalBranch,
      originalCwd,
      createdAt: new Date().toISOString(),
    };

    addWorktree(name, worktreeInfo);

    console.log(`\n✅ Worktree created successfully!`);
    console.log(`\n📝 Next steps:`);
    console.log(`   cd ${worktreePath}`);
    console.log(`   # Implement your IterationDeck with variations`);
    console.log(`\n   When designer chooses a variation:`);
    console.log(`   cd ${originalCwd}`);
    console.log(`   # Copy chosen variation to original branch`);
    console.log(`   iteration-deck worktree:cleanup ${name}`);
  } catch (error: any) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
}
