/**
 * Cleanup iteration worktree command
 */

import { existsSync } from 'fs';
import { getWorktree, removeWorktree as removeWorktreeFromState } from '../utils/state.js';
import {
  isGitRepo,
  removeWorktree,
  deleteBranch,
  worktreeExists,
} from '../utils/git.js';

export async function cleanupWorktreeCommand(name: string): Promise<void> {
  // Validate we're in a git repository
  if (!isGitRepo()) {
    console.error('❌ Error: Not in a git repository');
    process.exit(1);
  }

  // Get worktree info from state
  const worktreeInfo = getWorktree(name);

  if (!worktreeInfo) {
    console.error(`❌ Error: No iteration worktree found with name "${name}"`);
    console.log('   Run `iteration-deck worktree:list` to see active worktrees');
    process.exit(1);
  }

  console.log(`\n🧹 Cleaning up iteration worktree "${name}"...`);
  console.log(`   Path: ${worktreeInfo.path}`);
  console.log(`   Branch: ${worktreeInfo.branch}`);

  let worktreeRemoved = false;
  let branchDeleted = false;

  // Remove worktree if it exists in git
  if (worktreeExists(worktreeInfo.path) || existsSync(worktreeInfo.path)) {
    try {
      removeWorktree(worktreeInfo.path);
      worktreeRemoved = true;
      console.log(`   ✓ Worktree removed`);
    } catch (error: any) {
      console.warn(`   ⚠ Warning: Failed to remove worktree: ${error.message}`);
    }
  } else {
    console.log(`   ℹ Worktree directory not found (may have been manually removed)`);
  }

  // Delete branch
  try {
    deleteBranch(worktreeInfo.branch, true);
    branchDeleted = true;
    console.log(`   ✓ Branch deleted`);
  } catch (error: any) {
    console.warn(`   ⚠ Warning: Failed to delete branch: ${error.message}`);
  }

  // Remove from state
  removeWorktreeFromState(name);
  console.log(`   ✓ State cleaned up`);

  console.log(`\n✅ Cleanup complete!`);

  if (!worktreeRemoved || !branchDeleted) {
    console.log(`\n⚠ Some cleanup steps failed. You may need to manually:`);
    if (!worktreeRemoved) {
      console.log(`   - Remove directory: rm -rf ${worktreeInfo.path}`);
    }
    if (!branchDeleted) {
      console.log(`   - Delete branch: git branch -D ${worktreeInfo.branch}`);
    }
  }
}
