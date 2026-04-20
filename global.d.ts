// Allow CSS file imports (used by Next.js globals.css)
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
