export type User = {
  userId?: string;
  email: string;
  name?: string;
  faculty?: string;
  isVerified?: boolean;
  createdAt?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
  faculty?: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, faculty?: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
};
