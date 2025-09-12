"use client";

import { useRouter } from "next/navigation";
import Button from "../components/ui/Button";

export default function DeleteProfilePage() {
  const router = useRouter();
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const handleDelete = async () => {
    if (!userId) return router.push("/login");
    if (!confirm("Voulez-vous vraiment supprimer votre profil ?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/users/${userId}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        return alert(data.detail?.[0]?.msg || data.message || "Erreur inconnue");
      }

      localStorage.removeItem("userId");
      alert("Profil supprimé !");
      router.push("/registration");
    } catch {
      alert("Erreur serveur");
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Supprimer le profil</h1>
        <p className="text-gray-600 mb-6">Cette action est irréversible.</p>
        <Button
          onClick={handleDelete}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg"
        >
          Supprimer mon profil
        </Button>
      </div>
    </div>
  );
}
