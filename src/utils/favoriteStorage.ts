import type { User } from "../feature/users/userSlice";

const KEY = "favorite_users";

const safeParse = (value: string | null): User[] => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

/* ---------- Get ---------- */
export const getFavorites = (): User[] => {
  return safeParse(localStorage.getItem(KEY));
};

/* ---------- Save ---------- */
export const saveFavorites = (users: User[]): void => {
  localStorage.setItem(KEY, JSON.stringify(users));
};

/* ---------- Add ---------- */
export const addToFavorites = (user: User): User[] => {
  const favorites = getFavorites();
  if (favorites.some((u) => u.id === user.id)) return favorites;

  const updated = [...favorites, user];
  saveFavorites(updated);
  return updated;
};

/* ---------- Remove ---------- */
export const removeFromFavorites = (id: number): User[] => {
  const updated = getFavorites().filter((u) => u.id !== id);
  saveFavorites(updated);
  return updated;
};

/* ---------- Update ---------- */
export const updateFavorite = (user: User): User[] => {
  const updated = getFavorites().map((u) => (u.id === user.id ? user : u));
  saveFavorites(updated);
  return updated;
};
