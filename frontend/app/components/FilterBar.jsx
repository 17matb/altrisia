'use client';
const FilterBar = ({ isDemande, setIsDemande }) => {
  return (
    <div className="flex flex-wrap items-center border border-foreground/10 min-h-9 rounded-lg mb-8 text-sm overflow-hidden w-fit">
      <div
        onClick={() => setIsDemande(undefined)}
        className={`${isDemande === undefined && 'bg-foreground/5'} px-4 h-9 flex items-center cursor-pointer`}
      >
        Tout
      </div>
      <div
        onClick={() => setIsDemande(false)}
        className={`${isDemande === false && 'bg-foreground/5'} px-4 h-9 flex items-center cursor-pointer`}
      >
        Propositions
      </div>
      <div
        onClick={() => setIsDemande(true)}
        className={`${isDemande === true && 'bg-foreground/5'} px-4 h-9 flex items-center cursor-pointer`}
      >
        Demandes
      </div>
    </div>
  );
};

export default FilterBar;
