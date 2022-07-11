import config from "config";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), config.post.folder);

export interface Post {
  title: string;
  slug: string;
  content: string;
  desc: string;
  cover: string;
  date: string;
  tags: string[];
  visible: boolean | undefined;
}

export const getPostBySlug = (slug: string) => {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title,
    desc: data.desc,
    cover: data.cover,
    date: data.date,
    tags: data.tags,
    visible: data.visible === undefined ? true : data.visible,
    content,
  };
};

export const getPostSlugs = () => {
  return fs.readdirSync(postsDirectory).filter((slug) => !slug.startsWith("."));
};

export const getAllPosts = () => {
  const slugs = getPostSlugs();
  const posts: Post[] = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => {
      if (post1.date && post2.date) return post1.date > post2.date ? -1 : 1;
      return -1;
    });
  return posts;
};

export const getVisiblePosts = () => {
  const posts = getAllPosts().filter(
    (value) => value.visible === undefined || value.visible
  );
  return posts;
};

export const getSectionBySlug = (slug: string) => {
  for (var i = 0; i < config.custom.length; i++) {
    if (config.custom[i].slug === slug) {
      return config.custom[i];
    }
  }
};

export const getAllSections = () => {
  return config.custom;
};

export const getAllTags = () => {
  const posts = getAllPosts();
  const tags = posts.reduce((l, r) => l.concat(r.tags as never[]), []);
  return tags.filter((item, pos) => tags.indexOf(item) === pos);
};

export const getPostsByTag = (tag: string) => {
  const posts = getAllPosts();
  const postsTag: Post[] = posts.filter(
    (post) =>
      post.tags.includes(tag) && (post.visible === undefined || post.visible)
  );
  return postsTag;
};
