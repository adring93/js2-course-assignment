export async function http(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw Object.assign(new Error('Request failed'), { status: res.status, data });
  return data;
}
