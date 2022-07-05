import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import Posts from "@/components/Posts/Posts";
import Section from "@/components/Section/Section";
import { getAllPosts, Post } from "@/lib/api";
import style from "@/styles/Home.module.scss";
import config from "config";
import { useScrollTrigger } from "hooks";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";

export interface PostsPageProps {
  allPosts: Post[];
}

const PostsPage: NextPage<PostsPageProps> = ({ allPosts }) => {
  const trigger = useScrollTrigger(350);
  return (
    <div className={`${style.container} scroll`}>
      <Head>
        <title>
          {config.post.title} - {config.site.title}
        </title>
        <meta name="description" content={config.post.description} />
      </Head>
      <Navbar show={trigger} />
      <Header />
      <div className={style.spacerLeft} />
      <Section
        title={config.post.title}
        description={config.post.description}
        titleLg
      >
        <Posts posts={allPosts} />
      </Section>
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
};

export default PostsPage;
