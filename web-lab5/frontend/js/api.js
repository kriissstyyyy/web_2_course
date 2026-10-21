const API_BASE = 'http://localhost:3000/api/airplanes';

async function apiGetAll() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Не вдалося завантажити список літаків');
  return res.json();
}

async function apiGetById(id) {
  const res = await fetch(API_BASE + '/' + id);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Не вдалося завантажити літак');
  return res.json();
}

async function apiCreate(data) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const body = await res.json().catch(function () { return {}; });
  if (!res.ok) throw new Error(body.error || 'Помилка створення');
  return body;
}

async function apiUpdate(id, data) {
  const res = await fetch(API_BASE + '/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const body = await res.json().catch(function () { return {}; });
  if (!res.ok) throw new Error(body.error || 'Помилка оновлення');
  return body;
}

async function apiDelete(id) {
  const res = await fetch(API_BASE + '/' + id, { method: 'DELETE' });
  const body = await res.json().catch(function () { return {}; });
  if (!res.ok) throw new Error(body.error || 'Помилка видалення');
  return body;
}
