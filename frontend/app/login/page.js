"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/ui/Button";
import { User, Lock} from 'lucide-react';


export default function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.detail);
        return;
      }

      localStorage.setItem("userId", data.user_id);
      localStorage.setItem("userAvatar", data.avatar || "");
      router.push("/profile");
    } catch (err) {
      setMessage("Erreur serveur");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-center">Connexion</h2>
      <User />
      <input type="email" value={email} placeholder="example@domain.com" onChange={(e) => setEmail(e.target.value)} required className="border border-foreground/10 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"/>
      <Lock />
      <input type="password" value={password} placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} required className="border border-foreground/10 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"/>
      <Button type="submit">Se connecter</Button>
      {message && <p>{message}</p>}
    </form>
  );
}
