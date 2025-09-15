"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Button from "../../components/ui/Button";

export default function AnnonceDetail() {
const params = useParams();
const postId = params.id;

const [annonce, setAnnonce] = useState(null);
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);

useEffect(() => {
    const fetchData = async () => {
    try {
        // fetch annonce
        const resAnnonce = await fetch(`http://localhost:8000/posts/${postId}`);
        if (!resAnnonce.ok) throw new Error("Annonce introuvable");
        const dataAnnonce = await resAnnonce.json();
        // Ajoutation  console.log pour vérifier les données
        console.log("Annonce récupérée :", dataAnnonce);
        setAnnonce(dataAnnonce);
        // fetch user via query string
        const resUser = await fetch(`http://localhost:8000/users?id=${dataAnnonce.user_id}`);
        if (!resUser.ok) throw new Error("Utilisateur introuvable");
        const dataUser = await resUser.json();
        setUser(dataUser[0]); // supabase renvoie un tableau
    } catch (err) {
        console.error(err);
        setError(true);
    } finally {
        setLoading(false);
    }
    };

    if (postId) fetchData();
}, [postId]);

if (loading)
    return <p className="min-h-screen flex items-center justify-center">Chargement...</p>;

if (error || !annonce)
    return (
    <p className="min-h-screen flex items-center justify-center text-red-500">
        ❌ Annonce introuvable
    </p>
    );

// Fallback avatar avec emoji
const Avatar = ({ avatarUrl, size = 14 }) => {
    return avatarUrl ? (
    <img
        src={avatarUrl}
        alt="avatar utilisateur"
        className={`w-${size} h-${size} rounded-full object-cover border border-gray-300`}
    />
    ) : (
    <div
        className={`w-${size} h-${size} rounded-full bg-gray-300 flex items-center justify-center border border-gray-300`}
    >
        <span className="text-white text-xl">👤</span>
    </div>
    );
};

return (
    <div className="flex justify-between bg-[#FFFEFD] min-h-screen px-6 lg:px-12">
      {/* Contenu principal centré */}
    <div className="flex-shrink-0 w-full max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-extrabold text-[#f51C45] mb-2">{annonce.titre}</h1>
        <p className="text-sm text-gray-500 mb-4">
        <span>{new Date(annonce.date_creation).toLocaleDateString()}</span>
        <span className="mx-2">•</span>
        <span className="font-medium text-gray-700">{annonce.ville || "Ville non renseignée"}</span>
        </p>
        {/* Bloc Contact mobile */}
        {user && (
        <div className="flex lg:hidden flex-col items-start gap-2 mb-4">
            <div className="flex items-center gap-3">
            <Avatar avatarUrl={user.avatar} size={14} />
            <p className="font-semibold text-gray-800">{user.prenom} {user.nom}</p>
            </div>
            <Button className="px-4 py-2 text-base font-semibold shadow-md mt-2">
            Contacter
            </Button>
        </div>
        )}

        {/* Description */}
        <p className="text-gray-700 mb-6">{annonce.description}</p>

        {/* Image */}
        {annonce.media_url && (
        <img
            src={annonce.media_url}
            alt={annonce.titre}
            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl mb-6 shadow-md"
        />
        )}

        {/* Carte Google Maps */}
        {/* Avec astuce "hack" : tu passes la query ?q=ville dans l’URL publique de Maps.*/}        
            <div className="mb-6">
        <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(
            annonce.ville )
            }&output=embed`}
            className="w-full h-64 rounded-2xl shadow-md border"
            allowFullScreen
            loading="lazy"
        ></iframe>
        </div>
    </div>
      {/* Bloc desktop à droite */}
    {user && (
        <div className="hidden lg:flex flex-col items-center gap-4 w-60 p-4 bg-gray-50 rounded-2xl shadow-inner sticky top-20">
        <Avatar avatarUrl={user.avatar} size={20} />
        <p className="font-semibold text-gray-800 text-center">{user.prenom} {user.nom}</p>
        <Button className="px-6 py-2 text-base font-semibold shadow-md w-full mt-2">
            Contacter
        </Button>
        </div>
    )}
    </div>
);
}



