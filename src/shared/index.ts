/**
 * Shared utilities and environment detection
 */

/**
 * Detect if we're in development mode
 * 
 * Focuses on what actually works in client-side applications:
 * 1. NODE_ENV (always preserved by bundlers)
 * 2. Build-time custom environment variables (framework-specific prefixes)
 * 3. Runtime browser detection (hostname + port patterns)
 * 4. Conservative default (production)
 */
export function isDevelopmentMode(): boolean {
  // 1. Build-time environment detection (most reliable and SSR-safe)
  if (typeof process !== 'undefined' && process.env) {
    // NODE_ENV is always preserved by bundlers and consistent across SSR/client
    if (process.env.NODE_ENV === 'production') return false;
    if (process.env.NODE_ENV === 'test') return true; // Test environments should show development features
    if (process.env.NODE_ENV === 'development') return true;
    
    // Custom override (requires proper prefix for client-side access)
    // Usage: REACT_APP_ITERATION_DECK_DEV=true, VITE_ITERATION_DECK_DEV=true, etc.
    const customOverride = 
      process.env.REACT_APP_ITERATION_DECK_DEV ||
      process.env.VITE_ITERATION_DECK_DEV ||
      process.env.NEXT_PUBLIC_ITERATION_DECK_DEV ||
      process.env.PUBLIC_ITERATION_DECK_DEV; // SvelteKit
    
    if (customOverride !== undefined) {
      return customOverride === 'true';
    }
    
    // If NODE_ENV isn't explicitly set, we'll rely on browser detection
    // Most bundlers set NODE_ENV, so this is rare
  }

  // 2. Runtime browser detection (always available client-side)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Localhost variations (any port - dev servers use random ports)
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0') {
      return true;
    }
    
    // Development domain patterns (most reliable client-side detection)
    if (
      hostname.endsWith('.local') ||
      hostname.endsWith('.localhost') ||
      hostname.includes('dev.') ||
      hostname.includes('staging.') ||
      hostname.includes('preview-') ||
      hostname.includes('-dev.') ||
      hostname.includes('.dev-') ||
      hostname.startsWith('dev-') ||
      hostname.includes('localhost')
    ) {
      return true;
    }
    
    // Platform-specific preview environments (vibe coding platforms)
    if (
      // Deployment platforms
      hostname.includes('netlify.app') ||
      hostname.includes('vercel.app') ||
      hostname.includes('surge.sh') ||
      hostname.includes('railway.app') ||
      hostname.includes('render.com') ||
      
      // Cloud IDEs and development environments
      hostname.includes('gitpod.io') ||
      hostname.includes('codesandbox.io') ||
      hostname.includes('stackblitz.com') ||
      hostname.includes('repl.it') ||
      hostname.includes('glitch.me') ||
      hostname.includes('codepen.io') ||
      
      // GitHub Codespaces and similar
      hostname.includes('github.dev') ||
      hostname.includes('githubpreview.dev') ||
      hostname.includes('vscode.dev') ||
      
      // AI vibe coding platforms (2024+)
      hostname.includes('lovable.dev') ||
      hostname.includes('bolt.new') ||
      hostname.includes('v0.dev') ||
      hostname.includes('cursor.com') ||
      hostname.includes('windsurf.dev') ||
      hostname.includes('claude.ai') ||
      
      // Tunneling & dev tools
      hostname.includes('ngrok.io') ||
      hostname.includes('tunnel.dev') ||
      hostname.includes('localtunnel.me') ||
      hostname.includes('serveo.net')
    ) {
      return true;
    }
  }

  // 3. Conservative default - assume production for safety
  return false;
}