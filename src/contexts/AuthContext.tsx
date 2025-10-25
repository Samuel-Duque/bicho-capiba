"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, LoginData, SignupData, OngSignupData, login, signup, signupOng, me, logout } from "@/services/Auth/Auth";

interface UserSignupInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  signup: (data: UserSignupInput) => Promise<User>;
  signupOng: (data: OngSignupData) => Promise<User>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const userData = await me();
      setUser(userData);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = async (data: LoginData) => {
    setIsLoading(true);
    try {
      await login(data);
      const userData = await me();
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: UserSignupInput): Promise<User> => {
    setIsLoading(true);
    try {
      const signupData: SignupData = {
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
      };
      const response = await signup(signupData);
      setUser(response.user);
      return response.user;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupOng = async (data: OngSignupData): Promise<User> => {
    setIsLoading(true);
    try {
      const response = await signupOng(data);
      setUser(response.user);
      return response.user;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login: handleLogin,
        signup: handleSignup,
        signupOng: handleSignupOng,
        logout: handleLogout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};