import style from "./ViewPosts.module.scss";
import { ViewPostsProps } from "pages/posts";
import { FC } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Posts from "../../components/Posts";
import { Section } from "../../components/Section";
import { useScrollTrigger } from "../../hooks";

const ViewPosts: FC<ViewPostsProps> = ({ posts, getConfig }) => {
  const trigger = useScrollTrigger(350);

  return (
    <div className={`${style.container} ${style.typography}`}>
      <Navbar show={trigger} />
      <Section
        title={getConfig("post.title")}
        description={getConfig("post.description")}
        titleLg
      >
        <Posts posts={posts} />
      </Section>
      <Footer />
    </div>
  );
};

export default ViewPosts;
