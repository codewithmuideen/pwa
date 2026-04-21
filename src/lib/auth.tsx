"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { hashPassword, PREDEFINED_USERS, type UserRecord } from "./data";

export type PublicUser = Omit<UserRecord, "passwordHash">;

const SESSION_KEY = "citizens_session";

const stripHash = (u: UserRecord): PublicUser => {
  const { passwordHash: _omit, ...rest } = u;
  void _omit;
  return rest;
};

export const authenticateUser = (
  userId: string,
  password: string
): PublicUser | null => {
  const hash = hashPassword(password);
  const match = PREDEFINED_USERS.find(
    (u) =>
      u.userId.toLowerCase() === userId.trim().toLowerCase() &&
      u.passwordHash === hash
  );
  return match ? stripHash(match) : null;
};

export const getUserById = (id: string): PublicUser | null => {
  const user = PREDEFINED_USERS.find((u) => u.id === id);
  return user ? stripHash(user) : null;
};

interface AuthContextValue {
  user: PublicUser | null;
  loading: boolean;
  signIn: (userId: string, password: string) => { ok: true } | { ok: false; error: string };
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const id = typeof window !== "undefined" ? localStorage.getItem(SESSION_KEY) : null;
      if (id) {
        const u = getUserById(id);
        if (u) setUser(u);
      }
    } catch {
      // ignore storage errors
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback<AuthContextValue["signIn"]>((userId, password) => {
    const u = authenticateUser(userId, password);
    if (!u) {
      return {
        ok: false,
        error:
          "Please visit the bank to verify your account. We're unable to sign you in with those credentials.",
      };
    }
    setUser(u);
    try {
      localStorage.setItem(SESSION_KEY, u.id);
    } catch {
      // ignore
    }
    return { ok: true };
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, signIn, signOut }),
    [user, loading, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
