export function extractFlag(text: string): string | null {
  return text.match(/{{FLG:([^}]+)}}/)?.[0] || null;
}