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
    <>
      <Navbar show={trigger} />
      <div className={`${style.container} ${style.typography}`}>
        <div className={style.postContainer}>
          <Section
            title={post.title}
            description={post.desc}
            childrenBetweenTitle={
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.cover} className={style.coverImage} alt="" />
            }
            titleLg
            spaceLg
            titleContainerStyle={style.titleContainer}
          >
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className={style.post}
            ></div>
          </Section>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ViewPost;
