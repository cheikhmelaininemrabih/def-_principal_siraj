"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export function AuthStatus() {
  const { user, status, logout } = useAuth();
  const router = useRouter();

  if (status === "loading") {
    return <p className="text-xs text-slate-400">Chargement...</p>;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <Link href="/login" className="text-white/80 hover:text-white">
          Connexion
        </Link>
        <Link
          href="/register"
          className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-wide text-emerald-200"
        >
          Créer un compte
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm text-white">
      <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-wide">{user.username}</span>
      <button
        onClick={() => {
          logout();
          router.refresh();
        }}
        className="text-xs text-white/60 hover:text-white"
      >
        Déconnexion
      </button>
    </div>
  );
}
