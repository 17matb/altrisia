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
// un state pour afficher l'email
const [showEmail, setShowEmail] = useState(false);

useEffect(() => {
    const fetchData = async () => {
    try {
        // Récupération de l'annonce(fetch annonce)
        const resAnnonce = await fetch(`http://localhost:8000/posts/${postId}`);
        if (!resAnnonce.ok) throw new Error("Annonce introuvable");
        const dataAnnonce = await resAnnonce.json();
        setAnnonce(dataAnnonce);

        // Récupération de la liste des users(fetch user)
        const resUser = await fetch("http://localhost:8000/users");
        if (!resUser.ok) throw new Error("Utilisateur introuvable");
        const dataUser = await resUser.json();

        // Match du bon user
        const matchedUser = dataUser.find(
        (u) => u.user_id === dataAnnonce.user_id
        );
        setUser(matchedUser || null);
    } catch (err) {
        console.error("Erreur de chargement :", err.message);
        setError(true);
    } finally {
        setLoading(false);
    }
    };

    if (postId) fetchData();
}, [postId]);

  // Loading
if (loading) {
    return (
    <p className="min-h-screen flex items-center justify-center">
        Chargement...
    </p>
    );
}

  // Erreur ou annonce absente
if (error || !annonce) {
    return (
    <p className="min-h-screen flex items-center justify-center text-red-500">
        ❌ Annonce introuvable
    </p>
    );
}

  // Composant Avatar(Fallback avatar avec emoji)
const Avatar = ({ avatarUrl, size = 14 }) => {
    const sizeClass = `w-${size} h-${size}`;
    return avatarUrl ? (
    <img
        src={avatarUrl}
        alt="avatar utilisateur"
        className={`${sizeClass} rounded-full object-cover border border-gray-300`}
    />
    ) : (
    <div
        className={`${sizeClass} rounded-full bg-gray-300 flex items-center justify-center border border-gray-300`}
    >
        <span className="text-white text-lg">👤</span>
    </div>
    );
};

return (
    <div className="flex justify-between bg-background min-h-screen px-6 lg:px-12">
      {/* Contenu principal (centré) */}
    <div className="flex-shrink-0 w-full max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-extrabold text-primary mb-2">
        {annonce.titre}
        </h1>
        <p className="text-sm text-gray-500 mb-4">
        <span>
            {new Date(annonce.date_creation).toLocaleDateString("fr-FR")}
        </span>
        <span className="mx-2">•</span>
        <span className="font-medium text-gray-700">
            {annonce.ville || "Ville non renseignée"}
        </span>
        </p>

        {/* Bloc Contact (même emplacement, même style mobile & desktop) */}
{user && (
<div className="flex flex-col items-start gap-2 mb-4">
    <div className="flex items-center gap-3">
    <Avatar avatarUrl={user.avatar} size={14} />
    <p className="font-semibold text-gray-800">
        {user.prenom} {user.nom}
    </p>
    </div>

    <Button
    className="px-4 py-2 text-base font-semibold shadow-md mt-2 rounded transition-all duration-200 hover:bg-secondary hover:text-white"
    onClick={() => setShowEmail(!showEmail)}
    >
    Contacter
    </Button>

    {showEmail && (
    <div className="mt-2 p-2 bg-gray-100 rounded shadow-inner text-sm">
        Email : <span className="font-medium">{user.email}</span>
    </div>
    )}
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

        {/* Google Maps */}
        {/* Avec astuce "hack" : tu passes la query ?q=ville dans l’URL publique de Maps.*/}
        <div className="mb-6">
        <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(
            annonce.ville
            )}&output=embed`}
            className="w-full h-64 rounded-2xl shadow-md border"
            allowFullScreen
            loading="lazy"
        ></iframe>
        </div>
    </div>
    </div>
);
}




