/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: false,
  },
  images: {
    domains: [
      'i.ibb.co',
      'restauranttechnologynetwork.com',
      'www.caasco.com',
      'dev-search.foodclub.uk',
      'newdevmain.foodclub.uk',
      'devfoodclubuk.s3.eu-west-2.amazonaws.com',
      'portal.foodclubuk.com',
      'productionfc.s3.eu-west-2.amazonaws.com',
    ],
  },
}

module.exports = nextConfig
