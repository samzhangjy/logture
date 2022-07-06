import { ViewTagProps } from "pages/tags/[slug]";
import { FC } from "react";
import { Section } from "themes/default/components/Section";
import { useScrollTrigger } from "themes/default/hooks";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Posts from "../../components/Posts";
import style from "./ViewTag.module.scss";

const ViewTag: FC<ViewTagProps> = ({ tag }) => {
  const trigger = useScrollTrigger(150);

  return (
    <div className={`${style.container} ${style.typography}`}>
      <Navbar show={trigger} />
      <Header />
      <Section
        title={tag.title}
        description={
          <span
            dangerouslySetInnerHTML={{
              __html: tag.description,
            }}
          />
        }
      >
        <Posts posts={tag.posts} />
      </Section>
      <Footer />
    </div>
  );
};

export default ViewTag;
