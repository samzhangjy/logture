import { getAllPosts, Post } from "@/lib/api";
import getConfig from "@/lib/getConfig";
import config from "config";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { FC } from "react";

export interface PostsPageProps {
  allPosts: Post[];
}

export interface ViewPostsProps {
  posts: Post[];
  getConfig: (path: string) => any;
}

const PostsPage: NextPage<PostsPageProps> = ({ allPosts }) => {
  const ViewPosts: FC<ViewPostsProps> = getConfig("theme.posts.ViewPosts");
  return (
    <>
      <Head>
        <title>
          {config.post.title} - {config.site.title}
        </title>
        <meta name="description" content={config.post.description} />
      </Head>
      <ViewPosts posts={allPosts} getConfig={getConfig} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
};

export default PostsPage;
