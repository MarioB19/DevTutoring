import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2 text-white hover:text-purple-200 transition-colors duration-300">
   
        <div className="relative w-12 h-12 md:w-16 md:h-16">
          <Image
            src="/logo.png"
            alt="DevTutoring Logo"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div className="font-extrabold text-2xl md:text-3xl lg:text-4xl tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            DevTutoring
          </span>
        </div>
          </Link>
  );
};

export default Logo;
