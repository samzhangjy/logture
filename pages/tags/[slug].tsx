import Head from "next/head";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import {
  getSectionBySlug,
  getAllSections,
  Post,
  getPostsByTag,
  getAllTags,
} from "../../lib/api";
import config from "../../config";
import Navbar from "../../components/Navbar";
import { useScrollTrigger } from "../../hooks";
import Footer from "../../components/Footer";
import "highlight.js/styles/github-dark.css";
import CustomSection from "../../components/CustomSection";
import Header from "../../components/Header";
import { GetStaticProps, NextPage } from "next";
import Posts from "../../components/Posts";
import Section from "../../components/Section";

export interface ViewTagPostsProps {
  posts: Post[];
  tag: string;
}

const ViewTagPosts: NextPage<ViewTagPostsProps> = ({ tag, posts }) => {
  const router = useRouter();
  const trigger = useScrollTrigger(150);
  if (!router.isFallback && !tag) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div className="container">
      <Head>
        <title>
          Tag {tag} - {config.site.title}
        </title>
        <meta name="description" content={`Posts for tag ${tag}`} />
      </Head>
      <Navbar show={trigger} />
      <Header />
      <Section
        title={`Tag ${tag}`}
        description={
          <span>
            All posts for tag <code>{tag}</code>.
          </span>
        }
      >
        <Posts posts={posts} />
      </Section>
      <Footer />
    </div>
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
