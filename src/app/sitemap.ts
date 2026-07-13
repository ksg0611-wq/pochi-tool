import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/markdown';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pochi-tool.com';

  // ガイド記事の動的ルートを取得
  const posts = getSortedPostsData();
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/guide/${post.slug}`,
    lastModified: new Date(post.date), // markdownのフロントマター日付を利用
  }));

  // 静的ルート一覧
  const staticRoutes = [
    '',
    '/fanbox',
    '/skeb',
    '/booth',
    '/compare',
    '/guide',
    '/about',
    '/privacy',
    '/terms',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...postRoutes];
}
