import { getAllPostSlugs, getPostData } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const postData = await getPostData(params.slug);
    return {
      title: `${postData.title} | PochiTool`,
      description: postData.excerpt || `${postData.title}のガイド記事です。`,
    };
  } catch (e) {
    return {
      title: 'Not Found | PochiTool',
    };
  }
}

export default async function Post({ params }: { params: { slug: string } }) {
  try {
    const postData = await getPostData(params.slug);
    return (
      <article className="max-w-3xl mx-auto py-8">
        <h1 className="text-4xl font-extrabold mb-4">{postData.title}</h1>
        <div className="text-gray-500 dark:text-gray-400 mb-8">{postData.date}</div>
        <div 
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} 
        />
      </article>
    );
  } catch (error) {
    notFound();
  }
}
