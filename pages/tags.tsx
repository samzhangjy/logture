import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Card from "../components/Card";
import Footer from "../components/Footer";
import GridCol from "../components/Grid/GridCol";
import GridContainer from "../components/Grid/GridContainer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import config from "../config";
import { useScrollTrigger } from "../hooks";
import { getAllTags, getPostsByTag } from "../lib/api";
import { getFormattedText } from "../lib/formatTemplate";

export interface Tag {
  name: string;
  count: number;
}

export interface ViewTagsProps {
  tags: Tag[];
}

const ViewTags: NextPage<ViewTagsProps> = ({ tags }) => {
  const trigger = useScrollTrigger(350);
  return (
    <div className="container">
      <Head>
        <title>
          {config.tags.allTags.title} - {config.site.title}
        </title>
        <meta name="description" content={config.tags.allTags.description} />
      </Head>
      <Navbar show={trigger} />
      <Header />
      <Section title={config.tags.allTags.title} description={config.tags.allTags.description}>
        <GridContainer cols={12}>
          {tags.map((tag, index) => (
            <GridCol key={index} colSpan={4} md={6} sm={12}>
              <Card
                title={tag.name}
                description={getFormattedText(config.tags.allTags.postCount, "count", '' + tag.count)}
                link={`/tags/${tag.name}`}
              />
            </GridCol>
          ))}
        </GridContainer>
      </Section>
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const tag_names = getAllTags();
  const tags = tag_names.map((tag) => ({
    name: tag,
    count: getPostsByTag(tag).length,
  }));
  return {
    props: { tags },
  };
};

export default ViewTags;
