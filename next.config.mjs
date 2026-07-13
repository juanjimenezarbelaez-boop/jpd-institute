/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // Serve the original static homepage at the root.
        { source: "/", destination: "/index.html" },
      ],
      afterFiles: [
        // Extensionless paths resolve to their static .html files.
        // NOTE: /lab is an app-router route and is matched before these rewrites.
        { source: "/commitments", destination: "/commitments.html" },
        { source: "/programs", destination: "/programs.html" },
        { source: "/publications", destination: "/publications.html" },
        { source: "/methodology", destination: "/methodology.html" },
        { source: "/governance", destination: "/governance.html" },
        { source: "/about", destination: "/about.html" },
        { source: "/contact", destination: "/contact.html" },
      ],
      fallback: [],
    }
  },
}

export default nextConfig
