'use client';
import React, { Fragment, useState } from 'react';
import { motion } from 'motion/react';
import Button from './ui/Button';
import SearchBar from './ui/SearchBar';
import Link from 'next/link';
import { Plus, User } from 'lucide-react';
import { categories } from '../services/categories';

const Nav = () => {
  const [isHamburgerOpened, setIsHamburgerOpened] = useState(false);
  const [isOthersHovered, setIsOthersHovered] = useState(false);
  const mainCategories = categories.slice(0, 8);
  const otherCategories = categories.slice(8);
  const userId = localStorage.getItem('userId');

  const handleIsHamburgerOpened = () => {
    setIsHamburgerOpened(!isHamburgerOpened);
  };

  return (
    <nav className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row w-full md:items-center justify-center gap-2 md:gap-4 py-4">
        <div className="flex w-full md:w-fit justify-between">
          <Link href="/">
            <div className="font-bold">Altrisia</div>
          </Link>
          <div
            onClick={() => handleIsHamburgerOpened()}
            className="flex md:hidden flex-col gap-1.5"
          >
            <span
              className={`w-7 h-0.5 bg-foreground rounded-md duration-200 ${isHamburgerOpened && 'rotate-45 translate-y-2'}`}
            ></span>
            <span
              className={`w-7 h-0.5 bg-foreground rounded-md duration-200 ${isHamburgerOpened && 'opacity-0'}`}
            ></span>
            <span
              className={`w-7 h-0.5 bg-foreground rounded-md duration-200 ${isHamburgerOpened && '-rotate-45 -translate-y-2'}`}
            ></span>
          </div>
        </div>
        <Link href="/new-post">
          <Button className="hidden md:flex">
            <Plus size={20} />
            Publier une annonce
          </Button>
        </Link>
        <SearchBar />
        <div className="hidden md:flex gap-4 justify-center items-center">
          {userId ? (
            <Link className="hover:underline flex gap-2" href="/profile">
              <User size={20} />
              Mon profil
            </Link>
          ) : (
            <>
              <Link
                className="hover:bg-foreground/5 rounded-md duration-100"
                href="/login"
              >
                Se connecter
              </Link>
              <Link
                className="hover:bg-foreground/5 rounded-md duration-100"
                href="/register"
              >
                S&apos;inscrire
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-between gap-4 mb-4">
        {mainCategories.map((category, index) => (
          <Fragment key={`category-${category.category_id}`}>
            <Link
              href={`category/${category.category_id.toString()}`}
              className="hover:bg-foreground/5 rounded-md duration-100"
            >
              {category.nom}
            </Link>
            {index < mainCategories.length - 1 && '·'}
          </Fragment>
        ))}
        {categories.length >= mainCategories.length && (
          <>
            ·
            <span
              onMouseOver={() => setIsOthersHovered(true)}
              onMouseLeave={() => setIsOthersHovered(false)}
              className="cursor-default hover:bg-foreground/5 rounded-md duration-100 relative"
            >
              Autres
              {isOthersHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="z-10 flex flex-col gap-1 absolute bg-background border border-foreground/10 p-4 rounded-md right-0"
                >
                  {otherCategories.map((category) => (
                    <Link
                      key={`other-category-${category.category_id}`}
                      href={`category/${category.category_id.toString()}`}
                      className="hover:bg-foreground/5 rounded-md duration-100"
                    >
                      {category.nom}
                    </Link>
                  ))}
                </motion.div>
              )}
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
