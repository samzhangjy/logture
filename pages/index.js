import Head from "next/head";
import style from "../styles/Home.module.css";
import Card from "../components/Card";
import config from "../config";
import Header from "../components/Header";
import Section from "../components/Section";
import GridContainer from "../components/Grid/GridContainer";
import GridCol from "../components/Grid/GridCol";
import { useScrollTrigger } from "../hooks";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Posts from "../components/Posts";
import { getAllPosts } from "../lib/api";

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
      <div className={style.spacerLeft} />
      <Section
        title="Projects"
        description="Enim dolore occaecat magna in sint eiusmod tempor id."
      >
        <GridContainer cols={2} gap="20px">
          {config.projects.map((project, index) => (
            <GridCol key={index}>
              <Card
                title={project.name}
                description={project.description}
                cover={project.avatar}
              />
            </GridCol>
          ))}
        </GridContainer>
      </Section>
      <div className={style.spacerRight} />
      <Section
        title="Members"
        description="Aute dolor et commodo duis officia."
      >
        <GridContainer cols={2} gap="20px">
          {config.members.map((project, index) => (
            <GridCol key={index}>
              <Card
                title={project.nickname}
                description={project.description}
                cover={project.avatar}
                link={project.link}
              />
            </GridCol>
          ))}
        </GridContainer>
      </Section>
      <div className={style.spacerLeft} />
      <Section title="Join us" description="Veniam exercitation mollit.">
        <h6
          dangerouslySetInnerHTML={{
            __html: config.joinUs.replace("\n", "<br />"),
          }}
        ></h6>
      </Section>
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
