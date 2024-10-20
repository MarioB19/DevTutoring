import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const MemberCard = ({ name, role, imageUrl, socialMedia }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-purple-50 dark:bg-purple-900 overflow-hidden">
        <CardContent className="p-6 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-purple-300 dark:border-purple-600">
              <AvatarImage src={imageUrl} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
          </motion.div>
          <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-1">
            {name}
          </h3>
          <p className="text-sm text-purple-700 dark:text-purple-300 mb-4">
            {role}
          </p>
          <div className="flex justify-center space-x-3">
            {socialMedia.map(({ icon, url }) => (
              <motion.a
                key={icon}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 dark:text-purple-300 dark:hover:text-purple-100"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className={`fab ${icon} text-xl`}></i>
              </motion.a>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MemberCard;