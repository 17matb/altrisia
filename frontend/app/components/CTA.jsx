'use client';
import { AnimatePresence, motion } from 'motion/react';
import Button from './ui/Button';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const CTA = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <section
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="my-8 w-full flex flex-col gap-4 items-center justify-center bg-secondary/5 hover:bg-secondary/15 duration-200 border border-secondary/10 rounded-3xl p-4 relative overflow-hidden"
    >
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200, transition: { delay: 0 } }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 15,
                delay: 0,
              }}
              className="hidden lg:block w-72 h-72 bg-secondary/20 absolute rounded-full left-0 -translate-x-1/4"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200, transition: { delay: 0 } }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 15,
                delay: 0.1,
              }}
              className="hidden lg:block w-72 h-72 bg-secondary/20 absolute rounded-full left-0 -translate-x-1/2"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200, transition: { delay: 0 } }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 15,
                delay: 0.2,
              }}
              className="hidden lg:block w-72 h-72 bg-secondary/20 absolute rounded-full left-0 -translate-x-3/4"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200, transition: { delay: 0 } }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 15,
                delay: 0,
              }}
              className="hidden lg:block w-72 h-72 bg-secondary/20 absolute rounded-full right-0 translate-x-1/4"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200, transition: { delay: 0 } }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 15,
                delay: 0.1,
              }}
              className="hidden lg:block w-72 h-72 bg-secondary/20 absolute rounded-full right-0 translate-x-1/2"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200, transition: { delay: 0 } }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 15,
                delay: 0.2,
              }}
              className="hidden lg:block w-72 h-72 bg-secondary/20 absolute rounded-full right-0 translate-x-3/4"
            ></motion.div>
          </>
        )}
      </AnimatePresence>
      <p className="text-2xl text-center">
        Vous souhaitez faire une bonne action ?
      </p>
      <Button variant="secondary">
        <Plus size={20} />
        Publiez une annonce
      </Button>
    </section>
  );
};

export default CTA;
