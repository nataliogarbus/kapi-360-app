import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  async headers() {
    return [
      {
        // Matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://kapi.com.ar, https://www.kapi.com.ar, https://kapi-360-app.vercel.app" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ],
      },
    ];
  },
  async redirects() {
    const postsDirectory = path.join(process.cwd(), '_articulos_google_docs');
    const fileNames = fs.readdirSync(postsDirectory);

    // Helper function to create a URL-friendly slug from a title
    function slugify(text) {
      if (!text) return '';
      const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
      const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
      const p = new RegExp(a.split('').join('|'), 'g')

      return text.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
    }

    const allRedirects = fileNames.map(fileName => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      const oldSlug = fileName.replace(/\.md$/, '');
      const newSlug = slugify(data.title);

      if (!newSlug) return null;

      return {
        source: `/blog/${encodeURIComponent(oldSlug)}`,
        destination: `/blog/${newSlug}`,
        permanent: true,
      };
    }).filter(Boolean); // Remove nulls if a post had no title

    return allRedirects;
  },
};

export default nextConfig;
