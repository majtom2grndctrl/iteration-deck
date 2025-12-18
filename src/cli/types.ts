/**
 * Type definitions for iteration-deck CLI
 */

export interface WorktreeInfo {
  /** Path to the worktree directory */
  path: string;
  /** Git branch name for this worktree */
  branch: string;
  /** Original branch before creating worktree */
  originalBranch: string;
  /** Original working directory */
  originalCwd: string;
  /** Timestamp when worktree was created */
  createdAt: string;
}

export interface IterationDeckState {
  /** Map of worktree name to worktree info */
  worktrees: Record<string, WorktreeInfo>;
}

export interface GitWorktreeListItem {
  worktree: string;
  head: string;
  branch: string;
  bare?: boolean;
}
