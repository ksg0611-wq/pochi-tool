import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pochi-tool.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/fanbox`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/skeb`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/booth`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
  ];
}
