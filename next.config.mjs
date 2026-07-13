/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The Programs section is now native to the app. Hash fragments
      // (#jurisprudence, #policy, #data) are preserved by the browser and
      // mapped to the dedicated program pages client-side on /programs.
      { source: "/programs.html", destination: "/programs", permanent: true },
      // The Lab now lives at its program page. Permanent redirect so printed
      // QR codes pointing at /lab (including ?case=…&systems=… deep links,
      // whose query strings are preserved) keep working.
      { source: "/lab", destination: "/programs/comparative-jurisprudence-lab", permanent: true },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Serve the original static homepage at the root.
        { source: "/", destination: "/index.html" },
      ],
      afterFiles: [
        // Extensionless paths resolve to their static .html files.
        // NOTE: /lab and /programs are app-router routes and are matched
        // before these rewrites.
        { source: "/commitments", destination: "/commitments.html" },
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
