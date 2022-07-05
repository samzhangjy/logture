import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import Posts from "@/components/Posts/Posts";
import { CustomSection, Section } from "@/components/Section";
import { getVisiblePosts, Post } from "@/lib/api";
import style from "@/styles/Home.module.scss";
import config from "config";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useScrollTrigger } from "../hooks";

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
            <div className={style.readMore}>{config.post.readMore}</div>
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
