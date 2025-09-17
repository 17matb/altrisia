"use client"; // Composant React côté client pour dire à Next.js que ce composant utilise des hooks d'état et d'effet
import { useEffect, useState } from "react"; // useeffect et usestate de react pour gérer les apelle API et les états
import { useParams } from "next/navigation"; // useParams pour récupérer les paramètres de l'URL
import Button from "../../components/ui/Button";
import Link from "next/link";  //  pour naviguer vers page édition


export default function AnnonceDetail() {// Composant pour afficher les détails d'une annonce
const params = useParams();// Récupérer les paramètres de l'URL
const postId = params.id;

const [annonce, setAnnonce] = useState(null); // état pour stocker les données de l'annonce
const [user, setUser] = useState(null); // état pour stocker les données de l'utilisateur
const [loading, setLoading] = useState(true); // état pour gérer le chargement
const [error, setError] = useState(false); // état pour gérer les erreurs
// un state pour afficher l'email
const [showEmail, setShowEmail] = useState(false);
 //  nouvel état pour stocker l’utilisateur connecté
const [currentUserId, setCurrentUserId] = useState(null);

useEffect(() => { // Fonction pour charger les données de l'annonce et de l'utilisateur
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
        (u) => u.user_id === dataAnnonce.user_id // Comparer user_id de l'annonce avec user_id des users
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
// récupérer user connecté depuis localStorage
    const storedUserId = localStorage.getItem("userId");
    setCurrentUserId(storedUserId); // Mettre à jour l'état avec l'ID de l'utilisateur connecté
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
const Avatar = ({ avatarUrl }) => {
return avatarUrl ? (
    <img
    src={avatarUrl}
    alt="avatar utilisateur"
    className="w-14 h-14 rounded-full object-cover border border-gray-300"
    /> // Si avatarUrl existe, afficher l'image de l'avatar
) : (
    <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center border border-gray-300">
    <span className="text-white text-lg">👤</span>
    </div> // Sinon, afficher un avatar par défaut avec emoji
);
};

return (
    <div className="flex justify-between bg-background min-h-screen px-6 lg:px-12">
      {/* Contenu principal (centré) */}
    <div className="flex-shrink-0 w-full max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-extrabold text-primary mb-2">
        {annonce.titre}
        </h1> 
        
        {/* Date de création et ville */}
        <p className="text-sm text-gray-500 mb-4">
        <span>
            {new Date(annonce.date_creation).toLocaleDateString("fr-FR")}
        </span>
        <span className="mx-2">•</span>
        <span className="font-medium text-gray-700">
            {annonce.ville || "Ville non renseignée"}
        </span>
        </p> 

        {/* Bloc Contact (m emplacement, m style mobile & desktop) */}
{user && (
<div className="flex flex-col items-start gap-2 mb-4">
    <div className="flex items-center gap-3">
    <Avatar avatarUrl={user.avatar} size={14} />
    <p className="font-semibold text-gray-800">
        {user.prenom} {user.nom}
    </p> 

     {/* Si l'utilisateur connecté est le propriétaire de l'annonce, afficher le bouton Modifier */}
    </div>

    <div className="flex gap-3"> 
      {/* Bouton Modifier */}
    {currentUserId && parseInt(currentUserId) === annonce.user_id && (
    <Link href={`/edit/${annonce.post_id}`}>
    <Button className="px-4 py-2 text-base font-semibold shadow-md rounded transition-all duration-200 hover:bg-secondary hover:text-white">
    Modifier
    </Button>
    </Link> // Bouton pour naviguer vers la page d'édition de l'annonce et link dynamique avec l'id de l'annonce

    )}

      {/* Bouton Contacter */}
    <Button
        className="px-4 py-2 text-base font-semibold shadow-md rounded transition-all duration-200 hover:bg-secondary hover:text-white"
        onClick={() => setShowEmail(!showEmail)}
    >
        Contacter
    </Button>
    </div>
            


    {showEmail && (
    <div className="mt-2 p-2 bg-gray-100 rounded shadow-inner text-sm">
        Email : <span className="font-medium">{user.email}</span>
    </div>
    )}
</div>
)} {/* Fin du bloc Contact */}

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




