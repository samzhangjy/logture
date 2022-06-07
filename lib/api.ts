import matter from 'gray-matter';
import config from '../config';
import { join } from 'path';
import fs from "fs";

const postsDirectory = join(process.cwd(), config.post.folder);

export interface Post {
  title: string;
  slug: string;
  content: string;
  desc: string;
  cover: string;
  date: string;
  tags: string[];
}

export const getPostBySlug = (slug: string) => {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title,
    desc: data.desc,
    cover: data.cover,
    date: data.date,
    tags: data.tags,
    content,
  };
}

export const getPostSlugs = () => {
  return fs.readdirSync(postsDirectory)
}

export const getAllPosts = () => {
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

export const getSectionBySlug = (slug: string) => {
  for (var i = 0; i < config.custom.length; i++) {
    if (config.custom[i].slug === slug) {
      return config.custom[i];
    }
  }
}

export const getAllSections = () => {
  return config.custom;
}

export const getAllTags = () => {
  const posts = getAllPosts();
  const tags = posts
    .reduce((l, r) => l.concat(r.tags), [])
  return tags.filter((item, pos) => tags.indexOf(item) === pos)
}

export const getPostsByTag = (tag: string) => {
  const posts = getAllPosts();
  const posts_tag: Post[] = [];
  for (var i = 0; i < posts.length; i++) {
    if (posts[i].tags.includes(tag)) {
      posts_tag.push(posts[i]);
    }
  }
  return posts_tag;
}
