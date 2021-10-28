const API_BASE_URL = 'https://api.tvmaze.com';

export async function apiGetResults(queryString) {
  const response = await fetch(`${API_BASE_URL}{queryString}`).then(res =>
    res.json()
  );
}
