/**
 * State management for iteration-deck worktrees
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { IterationDeckState, WorktreeInfo } from '../types.js';

const STATE_FILE = '.iteration-deck-state.json';

/**
 * Get the path to the state file
 */
function getStateFilePath(): string {
  return join(process.cwd(), STATE_FILE);
}

/**
 * Load the current state from disk
 */
export function loadState(): IterationDeckState {
  const stateFile = getStateFilePath();

  if (!existsSync(stateFile)) {
    return { worktrees: {} };
  }

  try {
    const content = readFileSync(stateFile, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Failed to load state file: ${error}`);
    return { worktrees: {} };
  }
}

/**
 * Save state to disk
 */
export function saveState(state: IterationDeckState): void {
  const stateFile = getStateFilePath();

  try {
    writeFileSync(stateFile, JSON.stringify(state, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Failed to save state file: ${error}`);
    throw error;
  }
}

/**
 * Add a worktree to state
 */
export function addWorktree(name: string, info: WorktreeInfo): void {
  const state = loadState();
  state.worktrees[name] = info;
  saveState(state);
}

/**
 * Remove a worktree from state
 */
export function removeWorktree(name: string): void {
  const state = loadState();
  delete state.worktrees[name];
  saveState(state);
}

/**
 * Get a specific worktree by name
 */
export function getWorktree(name: string): WorktreeInfo | undefined {
  const state = loadState();
  return state.worktrees[name];
}

/**
 * Get all worktrees
 */
export function getAllWorktrees(): Record<string, WorktreeInfo> {
  const state = loadState();
  return state.worktrees;
}

/**
 * Check if a worktree exists in state
 */
export function hasWorktree(name: string): boolean {
  const state = loadState();
  return name in state.worktrees;
}
