/**
 * Git utility functions for worktree management
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { resolve } from 'path';
import type { GitWorktreeListItem } from '../types.js';

/**
 * Execute a git command and return output
 */
function execGit(command: string, cwd?: string): string {
  try {
    return execSync(`git ${command}`, {
      cwd: cwd || process.cwd(),
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
  } catch (error: any) {
    throw new Error(`Git command failed: ${error.message}`);
  }
}

/**
 * Check if current directory is a git repository
 */
export function isGitRepo(): boolean {
  try {
    execGit('rev-parse --git-dir');
    return true;
  } catch {
    return false;
  }
}

/**
 * Get the current branch name
 */
export function getCurrentBranch(): string {
  return execGit('branch --show-current');
}

/**
 * Get the root directory of the git repository
 */
export function getGitRoot(): string {
  return execGit('rev-parse --show-toplevel');
}

/**
 * Check if a branch exists
 */
export function branchExists(branchName: string): boolean {
  try {
    execGit(`rev-parse --verify ${branchName}`);
    return true;
  } catch {
    return false;
  }
}

/**
 * Create a git worktree
 */
export function createWorktree(path: string, branchName: string): void {
  const fullPath = resolve(path);

  if (existsSync(fullPath)) {
    throw new Error(`Directory already exists: ${fullPath}`);
  }

  if (branchExists(branchName)) {
    throw new Error(`Branch already exists: ${branchName}`);
  }

  try {
    execGit(`worktree add ${fullPath} -b ${branchName}`);
  } catch (error: any) {
    throw new Error(`Failed to create worktree: ${error.message}`);
  }
}

/**
 * Remove a git worktree
 */
export function removeWorktree(path: string): void {
  const fullPath = resolve(path);

  try {
    execGit(`worktree remove ${fullPath}`);
  } catch (error: any) {
    throw new Error(`Failed to remove worktree: ${error.message}`);
  }
}

/**
 * Delete a git branch
 */
export function deleteBranch(branchName: string, force: boolean = false): void {
  const flag = force ? '-D' : '-d';

  try {
    execGit(`branch ${flag} ${branchName}`);
  } catch (error: any) {
    throw new Error(`Failed to delete branch: ${error.message}`);
  }
}

/**
 * List all git worktrees
 */
export function listWorktrees(): GitWorktreeListItem[] {
  try {
    const output = execGit('worktree list --porcelain');
    const worktrees: GitWorktreeListItem[] = [];

    const entries = output.split('\n\n').filter(Boolean);

    for (const entry of entries) {
      const lines = entry.split('\n');
      const worktreeItem: Partial<GitWorktreeListItem> = {};

      for (const line of lines) {
        if (line.startsWith('worktree ')) {
          worktreeItem.worktree = line.substring('worktree '.length);
        } else if (line.startsWith('HEAD ')) {
          worktreeItem.head = line.substring('HEAD '.length);
        } else if (line.startsWith('branch ')) {
          worktreeItem.branch = line.substring('branch '.length);
        } else if (line === 'bare') {
          worktreeItem.bare = true;
        }
      }

      if (worktreeItem.worktree) {
        worktrees.push(worktreeItem as GitWorktreeListItem);
      }
    }

    return worktrees;
  } catch (error: any) {
    throw new Error(`Failed to list worktrees: ${error.message}`);
  }
}

/**
 * Check if a worktree path exists in git
 */
export function worktreeExists(path: string): boolean {
  const worktrees = listWorktrees();
  const fullPath = resolve(path);
  return worktrees.some(wt => resolve(wt.worktree) === fullPath);
}

/**
 * Get current working directory
 */
export function getCwd(): string {
  return process.cwd();
}
