/**
 * Attempts to execute an asynchronous function multiple times until it succeeds or the maximum number of retries is reached.
 *
 * @template T The return type of the asynchronous function.
 * @param fn The asynchronous function to execute.
 * @param retries The maximum number of attempts (default is 3).
 * @param delay The delay in milliseconds between retries (default is 1000 ms).
 * @returns A promise that resolves with the result of `fn` if it succeeds within the allowed retries.
 * @throws The error from the last failed attempt if all retries fail.
 *
 * @example
 * // Retry an API call up to 5 times with a 2 second delay between attempts
 * await retry(() => fetchData(), 5, 2000);
 */

export async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000,
): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < retries - 1) {
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }
  throw lastError;
}
