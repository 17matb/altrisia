"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/ui/Button";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
  <h1 className="text-2xl font-bold text-center mb-4">Profil utilisateur</h1>
  
    <div className="space-y-2">
      <p className="text-gray-700"><span className="font-semibold text-primary/100">Nom :</span> {user.nom}</p>
      <p className="text-gray-700"><span className="font-semibold text-primary/100">Prénom :</span> {user.prenom}</p>
      <p className="text-gray-700"><span className="font-semibold text-primary/100">Email :</span> {user.email}</p>
    </div>
    <Button onClick={() => router.push("/edit_profile")} className="w-full">Éditer le profil </Button>
    <Button onClick={() => router.push("/delete_profile")} className="w-full">Supprimer le profil </Button>
  </div>
  );
}
