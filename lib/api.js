import matter from 'gray-matter';
import config from '../config';
import { join } from 'path';
import fs from "fs";

const postsDirectory = join(process.cwd(), config.post.folder);

export function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { slug: realSlug, ...data, content };
}

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getAllPosts() {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => {
      if (post1.date && post2.date) return post1.date > post2.date ? -1 : 1
      return -1
    })
  return posts
}
