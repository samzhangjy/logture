import Head from "next/head";
import style from "../../styles/Home.module.scss";
import config from "../../config";
import Header from "../../components/Header";
import Section from "../../components/Section";
import { useScrollTrigger } from "../../hooks";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Posts from "../../components/Posts";
import { getAllPosts, Post } from "../../lib/api";
import { GetStaticProps, NextPage } from "next";

export interface PostsPageProps {
  allPosts: Post[];
}

const PostsPage: NextPage<PostsPageProps> = ({ allPosts }) => {
  const trigger = useScrollTrigger(350);
  return (
    <div className={`${style.container} scroll`}>
      <Head>
        <title>{config.post.title} - {config.site.title}</title>
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
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
}

export default PostsPage;
