import { HomeProps } from "pages";
import { ViewPostsProps } from "pages/posts";
import { ViewPostProps } from "pages/posts/[slug]";
import { ViewSectionProps } from "pages/sections/[slug]";
import { ViewTagsProps } from "pages/tags";
import { ViewTagProps } from "pages/tags/[slug]";
import { FC } from "react";
import defaultTheme from "themes/default";

export interface SiteConfigType {
  name: string;
  title: string;
  description: string;
  slogan: string[];
  owner: string;
}

export interface PostConfigType {
  folder: string;
  title: string;
  description: string;
  indexDescription: string;
  readMore: string;
  postsToDisplay: number;
  noPostText: string;
}

export interface AllTagsConfigType {
  title: string;
  description: string;
  postCount: string;
}

export interface TagsConfigType {
  description: string;
  title: string;
  allTags: AllTagsConfigType;
}

export interface LinkConfigType {
  text: string;
  link: string;
}

export interface SectionCardConfigType {
  title: string;
  description: string;
  cover: string;
  link: string;
}

export interface SectionConfigType {
  data: string | SectionCardConfigType[];
  name: string;
  description: string;
  slug: string;
  newPage?: boolean;
  showOnIndex?: boolean;
}

export interface ThemePostsType {
  ViewPost: FC<ViewPostProps>;
  ViewPosts: FC<ViewPostsProps>;
}

export interface ThemeSectionsType {
  ViewSection: FC<ViewSectionProps>;
}

export interface ThemeTagsType {
  ViewTag: FC<ViewTagProps>;
  ViewTags: FC<ViewTagsProps>;
}

export interface ThemeConfigType {
  posts: ThemePostsType;
  sections: ThemeSectionsType;
  tags: ThemeTagsType;
  Home: FC<HomeProps>;
}

export interface ConfigType {
  site: SiteConfigType;
  post: PostConfigType;
  tags: TagsConfigType;
  links?: LinkConfigType[];
  custom?: SectionConfigType[];
  theme?: ThemeConfigType;
  showPoweredBy?: boolean;
  footer?: string;
}

const defaultConfig: ConfigType = {
  site: {
    name: "LogTure",
    title: "LogTure.",
    description: "The geek way to blog.",
    slogan: ["Eat", "Code", "Sleep"],
    owner: "LogTure Team",
  },
  post: {
    folder: "posts",
    title: "Posts",
    description: "My blog posts.",
    indexDescription: "View more posts on the posts page.",
    readMore: "Read more",
    postsToDisplay: 6,
    noPostText: "No posts yet.",
  },
  tags: {
    description: "Posts tagged with tag {{tag}}.",
    title: "Tag {{tag}}",
    allTags: {
      title: "Tags",
      description: "All tags",
      postCount: "{{count}} posts",
    },
  },
  links: [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "Posts",
      link: "/posts",
    },
    {
      text: "Tags",
      link: "/tags",
    },
  ],
  custom: [],
  showPoweredBy: true,
  footer: `
    Made with ❤️ by 
    <a href="https://github.com/samzhangjy" rel="noreferrer" target="_blank">
      samzhangjy
    </a>.
  `,
  theme: defaultTheme,
};

export default defaultConfig;
