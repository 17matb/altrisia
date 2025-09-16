"use client";

import { useState } from "react";
import Button from "../components/ui/Button";
import { useRouter } from "next/navigation";
import { UserRoundPlus } from 'lucide-react';

export default function ConnexionPage() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
    e.preventDefault();

        try {
        const res = await fetch("http://127.0.0.1:8000/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nom, prenom, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            setMessage(data.detail);
            return;
        }

        localStorage.setItem("userId", data.user_id);
        localStorage.removeItem("userAvatar");
        localStorage.removeItem("userAvatarUserId");

        setMessage("Compte créé");
        localStorage.setItem("userId", data.user_id);
        router.push("/profile");
        } catch (err) {
        setMessage("Erreur serveur");
        }
    }

    return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-center">S'inscrire</h2><UserRoundPlus />
      <input type="surname" value={nom} placeholder="Nom" onChange={(e) => setNom(e.target.value)} required className="border border-foreground/10 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"/>
      <input type="name" value={prenom} placeholder="Prenom" onChange={(e) => setPrenom(e.target.value)} required className="border border-foreground/10 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"/>
      <input type="email" value={email} placeholder="example@domain.com" onChange={(e) => setEmail(e.target.value)} required className="border border-foreground/10 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"/>
      <input type="password" value={password} placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} required className="border border-foreground/10 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"/>
      <Button type="submit">Creer un compte</Button>
      {message && <p>{message}</p>}
    </form>
  );

};

