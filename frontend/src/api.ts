const API_URL = 'http://localhost:3001';

export async function getClients() {
  const res = await fetch(`${API_URL}/clients`);
  return res.json();
}

export async function createClient(data: { name: string; email: string; status: string }) {
  const res = await fetch(`${API_URL}/clients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

// NOVAS FUNÇÕES PARA ASSETS
export async function getAssetsByClient(clientId: number) {
  const res = await fetch(`${API_URL}/clients/${clientId}/assets`);
  return res.json();
}

export async function createAsset(clientId: number, data: { name: string; value: number }) {
  const res = await fetch(`${API_URL}/clients/${clientId}/assets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteClient(id: number) {
  await fetch(`${API_URL}/clients/${id}`, { method: "DELETE" });
}
export async function updateClient(id: number, data: any) {
  await fetch(`${API_URL}/clients/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
export async function updateAsset(id: number, data: any) {
  await fetch(`${API_URL}/assets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
export async function deleteAsset(id: number) {
  await fetch(`${API_URL}/assets/${id}`, { method: "DELETE" });
}
