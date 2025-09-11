"use client";

import { useState } from "react";

export default function ConnexionPage() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

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
        setMessage("Compte créé");
        } catch (err) {
        setMessage("Erreur serveur");
        }
    }

    return (
    <form onSubmit={handleLogin}>
        <input type="surname" value={nom} onChange={(e) => setNom(e.target.value)} required />
      <input type="name" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Creer un compte</button>
      {message && <p>{message}</p>}
    </form>
  );

};

