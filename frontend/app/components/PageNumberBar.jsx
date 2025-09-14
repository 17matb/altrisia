'use client';
const PageNumberBar = ({ page, setPage, totalPages }) => {
  return (
    <div className="flex flex-wrap items-center border border-foreground/10 min-h-9 rounded-lg my-8 text-sm overflow-hidden w-fit">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (number) => (
          <div
            key={`page-btn-${number}`}
            onClick={() => setPage(number)}
            className={`${page === number && 'bg-foreground/5'} px-4 h-9 flex items-center cursor-pointer`}
          >
            {number}
          </div>
        ),
      )}
    </div>
  );
};

export default PageNumberBar;
