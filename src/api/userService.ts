import { siteConfig } from '@/config/site';
// Ajusta los tipos según tu definición en src/types/user.ts
import { User, UserFormData } from '@/types/user';

const API_URL = siteConfig.apiBaseUrl + '/users';

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener usuarios');
    return res.json();
  },
  searchUsers: async (term: string): Promise<User[]> => {
    const res = await fetch(`${API_URL}?search=${encodeURIComponent(term)}`);
    if (!res.ok) throw new Error('Error al buscar usuarios');
    return res.json();
  },
  createUser: async (data: UserFormData): Promise<User> => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al crear usuario');
    return res.json();
  },
  updateUser: async (id: number, data: Partial<User>): Promise<User> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al actualizar usuario');
    return res.json();
  },
  deleteUser: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar usuario');
  },
}; 