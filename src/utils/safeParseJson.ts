export const safeJsonParse = <T>(json: string): T | null => {
  try {
    return JSON.parse(json) as T;
  } catch (e: unknown) {
    console.error(e);
    return null;
  }
}