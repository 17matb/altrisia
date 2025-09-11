"use client"; // pour activer les hooks côté client
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnnonceDetailPage() {
 const { id } = useParams(); // récupère l'id depuis l'URL
 const [titre, setTitre] = useState(""); // état pour stocker le titre
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);

useEffect(() => {
    if (!id) return;

    const fetchAnnonce = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/posts/${id}`);
        if (!response.ok) throw new Error("Annonce introuvable");
        const data = await response.json();
        setTitre(data.titre); // on stocke seulement le titre
        setLoading(false);
    } catch (err) {
        console.error("Erreur fetch :", err);
        setError(true);
        setLoading(false);
    }
    };

    fetchAnnonce();
}, [id]);

if (loading) return <p>Chargement de l’annonce...</p>;
if (error) return <p>❌ Annonce introuvable</p>;

return (
    <div className="p-6 bg-[#FFFEFD] min-h-screen flex items-center justify-center">
    <h1 className="text-3xl font-bold text-[#f51C45]">{titre}</h1>
    </div>
);
}
