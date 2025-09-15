"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/ui/Button";
import { SquarePen } from "lucide-react";

export default function EditProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({ nom: "", prenom: "", email: "", password: "", avatar: "" });
  const [editing, setEditing] = useState({ nom: false, prenom: false, email: false, password: false, avatar: false });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      if (!id) router.push("/login");
      else setUserId(id);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetch(`http://127.0.0.1:8000/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser({
        nom: data.nom ?? "",
        prenom: data.prenom ?? "",
        email: data.email ?? "",
        password: "",
        avatar: data.avatar ?? ""
      }))
      .catch(() => console.log("Erreur chargement profil"));
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {};
      ["nom", "prenom", "email", "password", "avatar"].forEach(f => {
        if (editing[f]) payload[f] = user[f];
      });

      const res = await fetch(`http://127.0.0.1:8000/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) return alert(data.detail?.[0]?.msg || data.message || "Erreur");

      if (data.user?.avatar) localStorage.setItem("userAvatar", data.user.avatar);

      alert(data.message);
      router.push("/profile");
    } catch {
      alert("Erreur serveur");
    }
  };

  const toggleEdit = (field) => setEditing({ ...editing, [field]: !editing[field] });

  return (
    <div className="flex justify-center mt-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl border shadow-lg space-y-4"
        style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      >
        <h1 className="text-2xl font-bold text-center mb-4">Éditer le profil</h1>

        {["nom", "prenom", "email", "password", "avatar"].map((field) => (
          <div
            key={field}
            className="flex items-center gap-2 p-2 border rounded"
            style={{
              borderColor: editing[field] ? "var(--primary)" : "var(--foreground)",
              backgroundColor: editing[field] ? "var(--secondary)/10" : "transparent"
            }}
          >
            <input
              type={field === "email" ? "email" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={user[field]}
              onChange={e => setUser({ ...user, [field]: e.target.value })}
              readOnly={!editing[field]}
              style={{ backgroundColor: "transparent", color: "var(--foreground)" }}
              className="flex-1 focus:outline-none"
            />
            <SquarePen
              color="var(--primary)"
              className="cursor-pointer"
              onClick={() => toggleEdit(field)}
            />
          </div>
        ))}

        <Button
          type="submit"
          className="w-full py-2 rounded-lg font-semibold"
          style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
        >
          Enregistrer
        </Button>
      </form>
    </div>
  );
}
