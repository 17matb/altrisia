"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "../../components/ui/Button";

export default function EditPost() {
  const params = useParams();
  const postId = params.id;
  const router = useRouter();

  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    ville: "",
    media_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false); // pour afficher le message de succès

  // Charger l'annonce existante
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:8000/posts/${postId}`);
        if (!res.ok) throw new Error("Annonce introuvable");
        const data = await res.json();
        setFormData({
          titre: data.titre,
          description: data.description,
          ville: data.ville || "",
          media_url: data.media_url || "",
        });
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Erreur lors de la modification");

      setSuccess(true); // afficher le message de succès
      setFormData({ titre: "", description: "", ville: "", media_url: "" }); // vider le formulaire

      // Optionnel : masquer le message après 3 secondes
      // setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      console.error(err);
      alert("Impossible de modifier l'annonce");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">Annonce introuvable</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* Afficher le formulaire et le titre uniquement si success = false */}
      {!success && (
        <>
          <h1 className="text-2xl font-bold mb-4">Modifier l’annonce</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              placeholder="Titre"
              className="border p-2 rounded"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="border p-2 rounded"
              rows={6}
              required
            />
            <input
              type="text"
              name="ville"
              value={formData.ville}
              onChange={handleChange}
              placeholder="Ville"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="media_url"
              value={formData.media_url}
              onChange={handleChange}
              placeholder="URL Image"
              className="border p-2 rounded"
            />
            <Button type="submit" className="bg-primary text-white px-4 py-2">
              Enregistrer
            </Button>
          </form>
        </>
      )}

      {/* Message de succès */}
      {success && (
        <p
          className="border rounded p-4 text-white text-center transition-opacity duration-500"
          style={{ backgroundColor: "var(--foreground)", borderColor: "var(--foreground)" }}
        >
          La modification a été enregistrée avec succès !
        </p>
      )}
    </div>
  );
}