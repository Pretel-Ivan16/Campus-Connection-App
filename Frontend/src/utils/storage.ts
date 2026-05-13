const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';

export const storage = {
  // Token
  saveToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  // User
  saveUser: (user: any) => {
    if (!user) return;
    // Filtrar solo los datos del usuario, excluir token y message
    const userData = {
      userId: user.userId || '',
      email: user.email || '',
      name: user.name,
      isVerified: user.isVerified,
      faculty: user.faculty,
    };
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  },

  getUser: (): any => {
    try {
      const user = localStorage.getItem(USER_KEY);
      if (!user || user === 'undefined') {
        return null;
      }
      return JSON.parse(user);
    } catch (error) {
      return null;
    }
  },

  removeUser: () => {
    localStorage.removeItem(USER_KEY);
  },

  // Clear all auth data
  clearAuth: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
