import { getVisiblePosts, Post } from "@/lib/api";
import getConfig from "@/lib/getConfig";
import config from "config";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { FC } from "react";

export interface IndexRouteProps {
  allPosts: Post[];
}

export interface HomeProps {
  posts: Post[];
  isMorePosts: boolean;
  getConfig: (path: string) => any;
}

const Index: NextPage<IndexRouteProps> = ({ allPosts }) => {
  const Home: FC<HomeProps> = getConfig("theme.Home");
  const posts = allPosts.slice(0, config.post.postsToDisplay);
  const isMorePosts = allPosts.length > config.post.postsToDisplay;

  return (
    <>
      <Head>
        <title>{config.site.title}</title>
        <meta name="description" content={config.site.description} />
      </Head>
      <Home posts={posts} isMorePosts={isMorePosts} getConfig={getConfig} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getVisiblePosts();

  return {
    props: { allPosts },
  };
};

export default Index;
