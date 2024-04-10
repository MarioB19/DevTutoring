// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        // Puedes agregar más configuraciones como pathname si necesitas una estructura de URL más específica
      },
    ],
  },
};
