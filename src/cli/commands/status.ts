/**
 * Show status of iteration worktrees command
 */

import { existsSync } from 'fs';
import { getAllWorktrees } from '../utils/state.js';
import {
  isGitRepo,
  getCurrentBranch,
  getCwd,
  listWorktrees as listGitWorktrees,
} from '../utils/git.js';

export async function statusCommand(): Promise<void> {
  // Validate we're in a git repository
  if (!isGitRepo()) {
    console.error('❌ Error: Not in a git repository');
    process.exit(1);
  }

  const currentBranch = getCurrentBranch();
  const currentCwd = getCwd();
  const stateWorktrees = getAllWorktrees();
  const gitWorktrees = listGitWorktrees();

  console.log('\n📊 Iteration Deck Status\n');

  // Current context
  console.log('📍 Current Context:');
  console.log(`   Working directory: ${currentCwd}`);
  console.log(`   Current branch: ${currentBranch || '(detached HEAD)'}`);

  // Check if we're in an iteration worktree
  const inIterationWorktree = Object.entries(stateWorktrees).find(
    ([_, info]) => currentCwd.includes(info.path)
  );

  if (inIterationWorktree) {
    const [name, info] = inIterationWorktree;
    console.log(`   🌳 In iteration worktree: "${name}"`);
    console.log(`   📂 Original directory: ${info.originalCwd}`);
    console.log(`   🔙 Original branch: ${info.originalBranch}`);
  } else {
    console.log('   ℹ Not in an iteration worktree');
  }

  // State worktrees
  const stateWorktreeNames = Object.keys(stateWorktrees);
  console.log(`\n🗂 Tracked Iteration Worktrees: ${stateWorktreeNames.length}`);

  if (stateWorktreeNames.length > 0) {
    for (const name of stateWorktreeNames) {
      const info = stateWorktrees[name];
      const exists = existsSync(info.path);
      console.log(`   ${exists ? '✓' : '⚠'} ${name} → ${info.path}`);
    }
  } else {
    console.log('   (none)');
  }

  // Git worktrees
  const iterationGitWorktrees = gitWorktrees.filter(wt =>
    wt.branch?.includes('iterations/')
  );

  console.log(`\n🌳 Git Iteration Worktrees: ${iterationGitWorktrees.length}`);

  if (iterationGitWorktrees.length > 0) {
    for (const wt of iterationGitWorktrees) {
      const tracked = Object.values(stateWorktrees).some(
        info => info.path === wt.worktree
      );
      console.log(`   ${tracked ? '✓' : '⚠'} ${wt.branch} → ${wt.worktree}`);
    }
  } else {
    console.log('   (none)');
  }

  // Suggestions
  console.log('\n💡 Commands:');
  console.log('   iteration-deck worktree:create <name>  - Create new worktree');
  console.log('   iteration-deck worktree:list           - List all worktrees');
  console.log('   iteration-deck worktree:cleanup <name> - Remove worktree');
  console.log('');
}
