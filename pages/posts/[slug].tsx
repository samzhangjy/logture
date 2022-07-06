import defaultConfig, { ConfigType } from "@/config/default";
import { getAllPosts, getPostBySlug, Post } from "@/lib/api";
import getConfig from "@/lib/getConfig";
import markdownToHtml from "@/lib/markdownToHtml";
import config from "config";
import "highlight.js/styles/github-dark.css";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";

export interface PostRouteProps {
  post: Post;
}

export interface PostStaticParams {
  slug: string;
}

export interface ViewPostProps {
  post: Post;
  config: ConfigType;
  defaultConfig: ConfigType;
}

const ViewPostRoute: NextPage<PostRouteProps> = ({ post }) => {
  const router = useRouter();
  const ViewPost: FC<ViewPostProps> = getConfig("theme.posts.ViewPost");
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>
          {post.title} - {config.site.title}
        </title>
        <meta name="description" content={post.desc} />
      </Head>
      <ViewPost post={post} config={config} defaultConfig={defaultConfig} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let slug = "";
  if (params && typeof params.slug === "object") slug = params.slug[0];
  else if (params && typeof params.slug === "string") slug = params.slug;
  const post = getPostBySlug(slug);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content: content,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export default ViewPostRoute;
