/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}
