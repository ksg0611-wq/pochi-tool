import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// turbopackIgnore コメントを process.cwd() の直前に記述することで
// Turbopack の NFT（Node File Tracing）静的解析警告を抑制する
// refs: https://nextjs.org/docs/app/api-reference/turbopack
const postsDirectory = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  'posts'
);

export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  contentHtml?: string;
}

export function getSortedPostsData(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      return {
        slug,
        ...(matterResult.data as { title: string; date: string; excerpt?: string }),
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => ({
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    }));
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as { title: string; date: string }),
  };
}
