import Head from "next/head";
import style from "../styles/Home.module.scss";
import config from "../config";
import Header from "../components/Header";
import Section from "../components/Section";
import { useScrollTrigger } from "../hooks";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Posts from "../components/Posts";
import { getAllPosts } from "../lib/api";
import CustomSection from "../components/CustomSection";

export default function Home({ allPosts }) {
  const trigger = useScrollTrigger(350);
  return (
    <div className={`${style.container} scroll`}>
      <Head>
        <title>{config.site.title}</title>
      </Head>
      <Navbar show={trigger} />
      <Header />
      <div className={style.spacerLeft} />
      <Section
        title="Posts"
        description="View more posts on the post page."
      >
        <Posts posts={allPosts.slice(0, 6)} />
      </Section>
      {config.custom.map((item, index) => (
        <CustomSection key={index} {...item} />
      ))}
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
}
