import { getAllTags, getPostsByTag, Post } from "@/lib/api";
import { getFormattedText } from "@/lib/formatTemplate";
import getConfig from "@/lib/getConfig";
import config from "config";
import "highlight.js/styles/github-dark.css";
import { GetStaticProps, NextPage } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";

interface ViewTagRouteProps {
  posts: Post[];
  tag: string;
}

export interface TagType {
  title: string;
  description: string;
  posts: Post[];
}

export interface ViewTagProps {
  tag: TagType;
  getConfig: (path: string) => any;
}

const ViewTagPosts: NextPage<ViewTagRouteProps> = ({ tag, posts }) => {
  const router = useRouter();
  const ViewTag: FC<ViewTagProps> = getConfig("theme.tags.ViewTag");
  const title = getFormattedText(getConfig("tags.title"), "tag", tag);
  const description = getFormattedText(getConfig("tags.description"), "tag", tag);
  if (!router.isFallback && !tag) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>
          {title} - {config.site.title}
        </title>
        <meta name="description" content={description} />
      </Head>
      <ViewTag tag={{ title, description, posts }} getConfig={getConfig} />
    </>
  );
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  let slug = "";
  if (params && typeof params.slug === "object") slug = params.slug[0];
  else if (params && typeof params.slug === "string") slug = params.slug;
  const posts = getPostsByTag(slug);

  return {
    props: { posts, tag: slug },
  };
};

export async function getStaticPaths() {
  const tags = getAllTags();

  return {
    paths: tags.map((tag) => {
      return {
        params: {
          slug: tag,
        },
      };
    }),
    fallback: false,
  };
}

export default ViewTagPosts;
