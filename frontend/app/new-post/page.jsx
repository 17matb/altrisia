'use client';
import { useState, useEffect } from 'react';
import Input from '../components/ui/Input';
import { categories } from '../services/categories';
import Button from '../components/ui/Button';

const Page = () => {
  const [typeDemande, setTypeDemande] = useState(null);
  const [titre, setTitre] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [description, setDescription] = useState('');
  const [ville, setVille] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      console.log('storedUserId:', storedUserId); // debug
      if (storedUserId) {
        setUserId(parseInt(storedUserId, 10));
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage('Vous devez être connecté pour poster une annonce');
      setIsLoading(false);
      return;
    }

    if (!titre || !description || typeDemande === null || !categoryId) {
      setMessage('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const postData = {
        user_id: userId,
        type_demande: typeDemande,
        titre: titre,
        media_url: mediaUrl || null,
        description: description,
        ville: ville || null,
        category_id: parseInt(categoryId, 10),
      };

      const response = await fetch('http://127.0.0.1:8000/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setMessage('Votre annonce a bien été crée !');

        setTitre('');
        setDescription('');
        setMediaUrl('');
        setVille('');
        setCategoryId('');
        setTypeDemande(null);
      } else {
        const errorData = await response.json().catch(() => ({}));

        let errorMessage = 'Une erreur est survenue';

        if (errorData.detail) {
          if (typeof errorData.detail === 'string') {
            errorMessage = errorData.detail;
          } else if (typeof errorData.detail === 'object') {
            // J'ai transformé l'objet en chaîne en combinant les messages
            errorMessage = Object.values(errorData.detail)
              .flat()
              .join(' ');
          }
        }

        setMessage(`Erreur: ${errorMessage}`);
        console.log('errorData:', errorData);
      }
    } catch (error) {
      setMessage('Erreur de connexion au serveur');
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex ">
      <div className="max-w-3xl w-full flex flex-col items-center">
        <p className="text-2xl my-4 text-start w-full">
          Poster une nouvelle annonce
        </p>
        {message && (
          <div
            className={`p-3 rounded-lg mb-4 ${
              message.includes('!')
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}
          >
            {message}
          </div>
        )}
        <div
          className={`group bg-foreground/0 w-full border-foreground/10 duration-100 border flex flex-col gap-4 p-4 rounded-3xl cursor-pointer`}
        >
          <form className="w-full flex flex-col gap-2">
            <div>
              <label className="font-semibold">Type d&apos;annonce</label>
              <div>
                <div className="flex gap-2 items-center">
                  <label
                    className="relative flex items-center cursor-pointer"
                    htmlFor="proposition"
                  >
                    <input
                      name="post-type"
                      type="radio"
                      id="proposition"
                      checked={typeDemande === false}
                      onChange={() => setTypeDemande(false)}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-foreground/20 checked:border-foreground/50 transition-all"
                    />
                    <span className="absolute bg-primary w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 duration-200 top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2"></span>
                  </label>
                  <label htmlFor="proposition" className="cursor-pointer">
                    Je propose de l&apos;aide
                  </label>
                </div>
                <div className="flex gap-2 items-center">
                  <label
                    className="relative flex items-center cursor-pointer"
                    htmlFor="demande"
                  >
                    <input
                      name="post-type"
                      type="radio"
                      id="demande"
                      checked={typeDemande === true}
                      onChange={() => setTypeDemande(true)}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-foreground/20 checked:border-foreground/50 transition-all"
                    />
                    <span className="absolute bg-primary w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 duration-200 top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2"></span>
                  </label>
                  <label htmlFor="demande" className="cursor-pointer">
                    Je demande de l&apos;aide
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="font-semibold">Titre</label>
              <Input
                type={'text'}
                placeholder={'Je peux vous aider'}
                value={titre}
                setValue={setTitre}
                className={'mb-2'}
              />
            </div>
            <div>
              <label className="font-semibold">URL de votre image</label>
              <Input
                type={'text'}
                placeholder={'https://exemple.com/mon-image.jpg'}
                value={mediaUrl}
                setValue={setMediaUrl}
                className={'mb-2'}
              />
            </div>
            <div>
              <label className="font-semibold">Description</label>
              <textarea
                className="bg-foreground/5 border border-foreground/10 min-h-36 p-2 flex w-full items-center justify-center rounded-lg"
                placeholder="Si vous avez besoin d'aide, je suis la personne qu'il vous faut parce que..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="font-semibold">Ville</label>
              <Input
                type={'text'}
                placeholder={'Montpellier'}
                value={ville}
                setValue={setVille}
                className={'mb-2'}
              />
            </div>
            <div>
              <label htmlFor="categorie" className="font-semibold">
                Catégorie
              </label>
              <select
                name="categorie"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="bg-foreground/5 border border-foreground/10 h-9 p-2 flex w-full items-center justify-center rounded-lg"
              >
                <option disabled value="">
                  Choisissez une catégorie
                </option>
                {categories.map((category) => (
                  <option
                    key={`category-${category.category_id}`}
                    value={category.category_id}
                  >
                    {category.nom}
                  </option>
                ))}
              </select>
            </div>
            <Button type={'submit'} onClick={(e) => handleSubmit(e)}>
              Valider
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
