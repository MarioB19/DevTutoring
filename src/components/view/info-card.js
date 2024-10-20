import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InfoCard = ({ title, image, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-800 h-full flex flex-col">
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/70 to-transparent opacity-60"></div>
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-purple-800 dark:text-purple-300">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InfoCard;