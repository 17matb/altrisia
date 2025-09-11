"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://127.0.0.1:8000/users/${userId}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (!user) return <p>Utilisateur non trouvé</p>;

  return (
    <div>
      <h1>Profil utilisateur</h1>
      <p>Nom : {user.nom}</p>
      <p>Prénom : {user.prenom}</p>
    </div>
  );
}
