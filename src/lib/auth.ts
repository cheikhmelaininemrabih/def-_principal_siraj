"use client";

import { nanoid } from "nanoid";

type StoredUser = {
  id: string;
  username: string;
  email?: string;
  password: string;
  createdAt: number;
  avatar?: string;
};

type Session = {
  id: string;
  username: string;
};

const USERS_KEY = "nird_users";
const SESSION_KEY = "nird_session";

const isBrowser = () => typeof window !== "undefined";

const readUsers = (): StoredUser[] => {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
};

const writeUsers = (users: StoredUser[]) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const readSession = (): Session | null => {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
};

const writeSession = (session: Session | null) => {
  if (!isBrowser()) return;
  if (!session) {
    window.localStorage.removeItem(SESSION_KEY);
  } else {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
};

const subscribers = new Set<(session: Session | null) => void>();

const notify = (session: Session | null) => {
  subscribers.forEach((cb) => cb(session));
};

export const authStore = {
  getUsers: readUsers,
  getSession: readSession,
  subscribe: (cb: (session: Session | null) => void) => {
    subscribers.add(cb);
    return () => subscribers.delete(cb);
  },
  register: ({ username, email, password }: { username: string; email?: string; password: string }) => {
    if (!username || !password) {
      return { success: false, message: "Identifiants incomplets" };
    }
    const users = readUsers();
    if (users.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
      return { success: false, message: "Nom déjà utilisé" };
    }
    const newUser: StoredUser = {
      id: nanoid(8),
      username,
      email,
      password,
      createdAt: Date.now(),
      avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(username)}`,
    };
    writeUsers([newUser, ...users].slice(0, 50));
    writeSession({ id: newUser.id, username: newUser.username });
    notify({ id: newUser.id, username: newUser.username });
    return { success: true, user: newUser };
  },
  login: ({ username, password }: { username: string; password: string }) => {
    const users = readUsers();
    const user = users.find((item) => item.username.toLowerCase() === username.toLowerCase());
    if (!user || user.password !== password) {
      return { success: false, message: "Identifiants incorrects" };
    }
    const session = { id: user.id, username: user.username };
    writeSession(session);
    notify(session);
    return { success: true, user };
  },
  logout: () => {
    writeSession(null);
    notify(null);
  },
};

export type AuthUser = Session | null;

export const getCurrentUser = (): AuthUser => authStore.getSession();
