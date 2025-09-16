'use client';
import Link from 'next/link';
const PageNumberBar = ({ page, setPage, totalPages }) => {
  return (
    <div className="flex flex-wrap items-center border border-foreground/10 min-h-9 rounded-lg my-8 text-sm overflow-hidden w-fit">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (number) => (
          <Link key={`page-btn-${number}`} href="#filter-bar" scroll={true}>
            <div
              onClick={() => setPage(number)}
              className={`${page === number && 'bg-foreground/5'} px-4 h-9 flex items-center cursor-pointer`}
            >
              {number}
            </div>
          </Link>
        ),
      )}
    </div>
  );
};

export default PageNumberBar;
