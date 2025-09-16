'use client';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import Button from './ui/Button';
import SearchBar from './ui/SearchBar';
import Link from 'next/link';
import { Plus, User } from 'lucide-react';
import { categories } from '../services/categories';
import Logo from './ui/Logo';

const Nav = () => {
  const [isHamburgerOpened, setIsHamburgerOpened] = useState(false);
  const [isOthersHovered, setIsOthersHovered] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState();
  const [hasScrolled, setHasScrolled] = useState(false);

  const navbarRef = useRef(null);

  const mainCategories = categories.slice(0, 8);
  const otherCategories = categories.slice(8);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem('userId'));
    }
  }, []);

  const handleIsHamburgerOpened = () => {
    setIsHamburgerOpened(!isHamburgerOpened);
  };

  useEffect(() => {
    if (!navbarRef.current) return;
    const resizeObserver = new ResizeObserver((entries) =>
      setNavbarHeight(entries[0].contentRect.height),
    );
    resizeObserver.observe(navbarRef.current);
  }, [navbarRef]);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 0 && !hasScrolled) {
      setHasScrolled(true);
    }
    if (latest == 0 && hasScrolled) {
      setHasScrolled(false);
    }
  });

  return (
    <>
      <nav
        ref={navbarRef}
        className={`${hasScrolled ? 'fixed' : 'absolute'} w-full flex justify-center top-0 left-0 bg-background z-20 ${hasScrolled && 'drop-shadow-xl/5'} rounded-b-3xl lg:rounded-none`}
      >
        <div className="max-w-7xl w-full px-4">
          <div className="flex flex-col ">
            <div className="flex flex-col lg:flex-row w-full lg:items-center justify-center gap-2 lg:gap-4 py-4">
              <div className="flex w-full lg:w-fit justify-between">
                <Link href="/">
                  <Logo />
                </Link>
                <div
                  onClick={() => handleIsHamburgerOpened()}
                  className="flex lg:hidden flex-col gap-1.5"
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
                <Button className="hidden lg:flex">
                  <Plus size={20} />
                  Publier une annonce
                </Button>
              </Link>
              <SearchBar />
              <div className="hidden lg:flex gap-4 justify-center items-center">
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
                      href="/registration"
                    >
                      S&apos;inscrire
                    </Link>
                  </>
                )}
              </div>
            </div>
            <AnimatePresence mode="wait">
              {!hasScrolled && (
                <motion.div
                  initial={{ opacity: 0, y: -20, marginBottom: 0, height: 0 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    marginBottom: '1rem',
                    height: 'auto',
                  }}
                  exit={{ opacity: 0, y: -20, marginBottom: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="hidden lg:flex justify-between gap-4 mb-4"
                >
                  {mainCategories.map((category, index) => (
                    <Fragment key={`category-${category.category_id}`}>
                      <Link
                        href={`/category/${category.category_id.toString()}`}
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
                                href={`/category/${category.category_id.toString()}`}
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
      <div style={{ height: navbarHeight }}></div>
    </>
  );
};

export default Nav;
