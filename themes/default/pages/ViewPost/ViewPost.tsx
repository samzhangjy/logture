import { ViewPostProps } from "pages/posts/[slug]";
import { FC } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Section } from "../../components/Section";
import { useScrollTrigger } from "../../hooks";
import style from "./ViewPost.module.scss";

const ViewPost: FC<ViewPostProps> = ({ post }) => {
  const trigger = useScrollTrigger(150);
  return (
    <div className={`${style.container} ${style.typography}`}>
      <Navbar show={trigger} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={post.cover} className={style.coverImage} alt="" />
      <Section title={post.title} description={post.desc} titleLg>
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className={style.post}
        ></div>
      </Section>
      <Footer />
    </div>
  );
};

export default ViewPost;
