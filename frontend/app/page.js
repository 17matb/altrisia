'use client';
import Annonce from './components/Annonce';
import { getPosts } from './services/annonces';
import CTA from './components/CTA';
import FilterBar from './components/FilterBar';
import { useEffect, useState } from 'react';
import PageNumberBar from './components/PageNumberBar';

export default function Home() {
  const [isDemande, setIsDemande] = useState(undefined);
  const [annonces, setAnnonces] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  useEffect(() => {
    getPosts(page, 20, isDemande).then((data) => {
      setAnnonces(data.posts);
      setTotalPages(data.total_pages);
    });
  }, [isDemande, page]);
  return (
    <>
      <CTA postType="proposition" />
      <FilterBar isDemande={isDemande} setIsDemande={setIsDemande} />
      <div className="flex flex-col gap-4">
        {annonces.map((annonce, index) => (
          <Annonce
            type_demande={annonce.type_demande}
            imageSrc={annonce.media_url}
            imageAlt={annonce.titre}
            title={annonce.titre}
            description={annonce.description}
            city={annonce.ville}
            date={annonce.date_creation}
            postId={annonce.post_id}
            key={`annonce-${index}`}
          />
        ))}
      </div>
      <PageNumberBar page={page} setPage={setPage} totalPages={totalPages} />
      <CTA postType="demande" />
    </>
  );
}
