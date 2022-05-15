import Head from "next/head";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import markdownToHtml from "../../lib/markdownToHtml";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import config from "../../config";
import style from "../../styles/ViewPost.module.scss";
import Navbar from "../../components/Navbar";
import { useScrollTrigger } from "../../hooks";
import Section from "../../components/Section";
import Footer from "../../components/Footer";
import "highlight.js/styles/github-dark.css";

export default function ViewPost({ post }) {
  const router = useRouter();
  const trigger = useScrollTrigger(150);
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div className="container">
      <Head>
        <title>
          {post.title} - {config.site.title}
        </title>
        <meta name="description" content={post.desc} />
      </Head>
      <Navbar show={trigger} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={post.cover} className={style.coverImage} alt="" />
      <Section title={post.title} description={post.desc} titleLg>
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="post"
        ></div>
      </Section>
      <Footer />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content: content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
