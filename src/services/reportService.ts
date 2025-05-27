const API_URL = 'http://localhost:3000';

export const getReport = async (
  type: string,
  filters: Record<string, any>,
  dateRange: { start: string; end: string }
) => {
  const response = await fetch(`${API_URL}/reporte`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, filters, dateRange }),
  });

  if (!response.ok) throw new Error('Error al obtener datos');
  return await response.json();
};