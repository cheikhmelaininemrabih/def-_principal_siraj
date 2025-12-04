"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.username || !form.password) {
      setError("Choisis un nom de gaulois et un mot de passe !");
      return;
    }
    const result = register(form);
    if (!result.success) {
      setError(result.message ?? "Impossible de créer le compte");
      return;
    }
    router.push("/village");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
      <p className="text-sm uppercase tracking-[0.4em] text-emerald-300">Village NIRD</p>
      <h1 className="mt-2 text-3xl font-semibold">Créer son identité de résistant</h1>
      <p className="mt-1 text-sm text-white/70">
        Enregistre ton avatar pour conserver tes badges, ton village personnalisé et tes idées forge.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block text-sm">
          <span>Nom de gaulois</span>
          <input
            type="text"
            value={form.username}
            onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
            className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-white"
          />
        </label>
        <label className="block text-sm">
          <span>Email (optionnel)</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-white"
          />
        </label>
        <label className="block text-sm">
          <span>Mot de passe secret</span>
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-white"
          />
        </label>
        {error && <p className="text-xs text-rose-300">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-6 py-3 text-center text-sm font-semibold text-slate-900"
        >
          Rejoindre le village
        </button>
      </form>
      <p className="mt-4 text-xs text-white/60">
        Déjà un compte ? <Link href="/login" className="text-emerald-300">Se connecter</Link>
      </p>
    </div>
  );
}
