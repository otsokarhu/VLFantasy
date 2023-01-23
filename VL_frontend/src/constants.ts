export const apiBaseUrl = 'http://localhost:3003/api';

export const fetcher = (url: string) =>  fetch(url).then((res) => res.json());