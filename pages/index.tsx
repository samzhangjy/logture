import Head from "next/head";
import style from "../styles/Home.module.scss";
import config from "../config";
import Header from "../components/Header";
import Section from "../components/Section";
import { useScrollTrigger } from "../hooks";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Posts from "../components/Posts";
import { getVisiblePosts, Post } from "../lib/api";
import CustomSection from "../components/CustomSection";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

export interface HomeProps {
  allPosts: Post[];
}

const Home: NextPage<HomeProps> = ({ allPosts }) => {
  const trigger = useScrollTrigger(350);
  return (
    <div className={`${style.container} scroll`}>
      <Head>
        <title>{config.site.title}</title>
        <meta name="description" content={config.site.description} />
      </Head>
      <Navbar show={trigger} />
      <Header />
      <div className={style.spacerLeft} />
      <Section
        title={config.post.title}
        description={config.post.indexDescription}
      >
        <Posts posts={allPosts.slice(0, config.post.postsToDisplay)} />
        {allPosts.length > config.post.postsToDisplay && (
          <Link href="/posts">
            <div  className={style.readMore}>{config.post.readMore}</div>
          </Link>
        )}
      </Section>
      {config.custom.map(
        (item, index) =>
          (item.showOnIndex ?? true) && <CustomSection key={index} {...item} />
      )}
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getVisiblePosts();

  return {
    props: { allPosts },
  };
};

export default Home;
