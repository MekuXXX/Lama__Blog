/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  images: {
    domains: ["images.pexels.com", "www.pexels.com", "imgs.search.brave.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;
