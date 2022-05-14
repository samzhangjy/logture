import Head from "next/head";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import markdownToHtml from "../../lib/markdownToHtml";
import {
  getPostBySlug,
  getAllPosts,
  getSectionBySlug,
  getAllSections,
} from "../../lib/api";
import config from "../../config";
import style from "../../styles/ViewPost.module.css";
import Navbar from "../../components/Navbar";
import { useScrollTrigger } from "../../hooks";
import Section from "../../components/Section";
import Footer from "../../components/Footer";
import "highlight.js/styles/github-dark.css";
import CustomSection from "../../components/CustomSection";
import Header from "../../components/Header";

export default function ViewSection({ section }) {
  const router = useRouter();
  const trigger = useScrollTrigger(150);
  if (!router.isFallback && !section?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div>
      <Head>
        <title>
          {section.name} - {config.site.title}
        </title>
        <meta name="description" content={section.description} />
      </Head>
      <Navbar show={trigger} />
      <Header />
      <CustomSection {...section} />
      <Footer />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const section = getSectionBySlug(params.slug);

  return {
    props: { section },
  };
}

export async function getStaticPaths() {
  const sections = getAllSections();
  const slugs = [];

  sections.map((value) => {
    if (value.newPage && value.slug) {
      slugs.push({
        params: {
          slug: value.slug,
        },
      });
    }
    return null;
  });

  return {
    paths: slugs,
    fallback: false,
  };
}
