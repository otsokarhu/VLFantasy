export const VITE_API_BASE_URL =
  process.env.NODE_ENV === 'test'
    ? import.meta.env.VITE_API_TEST_BASE_URL || ''
    : import.meta.env.VITE_API_BASE_URL || '';
