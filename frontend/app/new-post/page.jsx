'use client';
import { useState } from 'react';
import Input from '../components/ui/Input';

const Page = () => {
  const [titre, setTitre] = useState('');
  return (
    <div
      className={`group bg-foreground/0 border-foreground/10 duration-100 border flex flex-col md:flex-row gap-4 p-4 rounded-3xl max-w-3xl cursor-pointer`}
    >
      <form className="w-2/3">
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
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-foreground/20 checked:border-foreground/50 transition-all"
              />
              <span className="absolute bg-primary w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 duration-200 top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2"></span>
            </label>
            <label htmlFor="demande" className="cursor-pointer">
              Je demande de l&apos;aide
            </label>
          </div>
        </div>
        <label className="font-semibold">Titre</label>
        <Input
          type={'text'}
          placeholder={'Je peux vous aider'}
          value={titre}
          setValue={setTitre}
          className={'mb-2'}
        />
        <label className="font-semibold">URL de votre image</label>
        <Input
          type={'text'}
          placeholder={'https://exemple.com/mon-image.jpg'}
          value={titre}
          setValue={setTitre}
          className={'mb-2'}
        />
        <label className="font-semibold">Description</label>
        <textarea
          className="bg-foreground/10 border border-foreground/10 min-h-36 p-2 flex w-full items-center justify-center rounded-lg"
          placeholder="Si vous avez besoin d'aide, je suis la personne qu'il vous faut parce que..."
        />
        <label className="font-semibold">Ville</label>
        <Input
          type={'text'}
          placeholder={'Montpellier'}
          value={titre}
          setValue={setTitre}
          className={'mb-2'}
        />
        <label className="font-semibold">Catégorie</label>
        <select className="bg-foreground/10 border border-foreground/10 h-9 p-2 flex w-full items-center justify-center rounded-lg">
          <option value="">Choisissez une catégorie</option>
        </select>
      </form>
    </div>
  );
};

export default Page;
