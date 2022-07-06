import Link from "next/link";
import { HomeProps } from "pages";
import Posts from "../../components/Posts";
import { FC } from "react";
import { useScrollTrigger } from "../../hooks";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { Section, CustomSection } from "../../components/Section";
import style from "./Home.module.scss";
import { SectionConfigType } from "@/config/default";

const Home: FC<HomeProps> = ({ posts, getConfig, isMorePosts }) => {
  const trigger = useScrollTrigger(350);
  const sections: SectionConfigType[] = getConfig("custom");

  return (
    <div className={`${style.container} ${style.typography}`}>
      <Navbar show={trigger} />
      <Header />
      <div className={style.spacerLeft} />
      <Section
        title={getConfig("post.title")}
        description={getConfig("post.indexDescription")}
      >
        <Posts posts={posts} />
        {isMorePosts && (
          <Link href="/posts">
            <div className={style.readMore}>{getConfig("post.readMore")}</div>
          </Link>
        )}
      </Section>
      {sections.map(
        (item, index) =>
          (item.showOnIndex ?? true) && <CustomSection key={index} {...item} />
      )}
      <Footer />
    </div>
  );
};

export default Home;
