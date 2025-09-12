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

  if (loading) return <p className="text-center mt-20 text-gray-500">Chargement...</p>;
  if (!user) return <p className="text-center mt-20 text-red-500">Utilisateur non trouvé</p>;

  return (
    <div className="flex justify-center mt-12 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Mon Profil</h1>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-foreground/100 font-medium">Nom :</span>
            <span className="text-foreground/100 font-semibold">{user.nom}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground/100 font-medium">Prénom :</span>
            <span className="text-foreground/100 font-semibold">{user.prenom}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground/100 font-medium">Email :</span>
            <span className="text-foreground/100 font-semibold">{user.email}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            onClick={() => router.push("/edit_profile")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Éditer le profil
          </Button>
          <Button 
             onClick={()=> {
              localStorage.removeItem("userId")
              router.push("/login")}}
             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Déconnexion
          </Button>
          <Button
            onClick={() => router.push("/delete_profile")}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Supprimer le profil
          </Button>
        </div>
      </div>
    </div>
  );
}
