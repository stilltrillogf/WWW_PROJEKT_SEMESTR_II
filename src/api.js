const API_URL = 'http://localhost:3000';

export async function fetchJobs() {
  const response = await fetch(`${API_URL}/jobs`);
  if (!response.ok) throw new Error('Błąd serwera przy pobieraniu ofert');
  return await response.json();
}

export async function fetchJobDetails(id) {
  const response = await fetch(`${API_URL}/jobs/${id}`);
  if (!response.ok) throw new Error('Nie znaleziono oferty');
  return await response.json();
}

export async function submitApplication(appData) {
  const response = await fetch(`${API_URL}/applications`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(appData)
  });
  if (!response.ok) throw new Error('Błąd serwera podczas wysyłania aplikacji');
  return await response.json();
}