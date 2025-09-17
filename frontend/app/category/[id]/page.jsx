'use client';
import React from 'react';
import Annonce from '@/app/components/Annonce';
import CTA from '@/app/components/CTA';
import FilterBar from '@/app/components/FilterBar';
import PageNumberBar from '@/app/components/PageNumberBar';
import { getPosts } from '@/app/services/annonces';
import { useEffect, useState } from 'react';

const Page = ({ params }) => {
  const { id } = React.use(params);
  const [isDemande, setIsDemande] = useState(undefined);
  const [annonces, setAnnonces] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  useEffect(() => {
    getPosts(page, 20, isDemande, id).then((data) => {
      setAnnonces(data.posts);
      setTotalPages(data.total_pages);
    });
  }, [isDemande, page, id]);
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
            category_id={annonce.category_id}
            key={`annonce-${index}`}
          />
        ))}
      </div>
      <PageNumberBar page={page} setPage={setPage} totalPages={totalPages} />
      <CTA postType="demande" />
    </>
  );
};

export default Page;
