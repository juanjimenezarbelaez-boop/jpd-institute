/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/lab",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
