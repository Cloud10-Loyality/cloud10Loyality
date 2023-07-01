/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/manager",
                destination: "/",
                permanent: true,
            }
        ]
    }
}

module.exports = nextConfig
