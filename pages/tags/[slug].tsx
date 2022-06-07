import "highlight.js/styles/github-dark.css";
import { GetStaticProps, NextPage } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Posts from "../../components/Posts";
import Section from "../../components/Section";
import config from "../../config";
import { useScrollTrigger } from "../../hooks";
import { getAllTags, getPostsByTag, Post } from "../../lib/api";
import { getFormattedText } from "../../lib/formatTemplate";

export interface ViewTagPostsProps {
  posts: Post[];
  tag: string;
}

const ViewTagPosts: NextPage<ViewTagPostsProps> = ({ tag, posts }) => {
  const router = useRouter();
  const trigger = useScrollTrigger(150);
  const title = getFormattedText(config.tags.title, "tag", tag);
  const description = getFormattedText(config.tags.description, "tag", tag);
  if (!router.isFallback && !tag) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div className="container">
      <Head>
        <title>
          {title} - {config.site.title}
        </title>
        <meta name="description" content={description} />
      </Head>
      <Navbar show={trigger} />
      <Header />
      <Section
        title={title}
        description={
          <span
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
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
