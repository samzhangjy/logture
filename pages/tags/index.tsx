import Card from "@/components/Card/Card";
import Footer from "@/components/Footer/Footer";
import GridCol from "@/components/Grid/GridCol";
import GridContainer from "@/components/Grid/GridContainer";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import Section from "@/components/Section/Section";
import { getAllTags, getPostsByTag } from "@/lib/api";
import { getFormattedText } from "@/lib/formatTemplate";
import config from "config";
import { useScrollTrigger } from "hooks";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";

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
      <Section
        title={config.tags.allTags.title}
        description={config.tags.allTags.description}
      >
        <GridContainer cols={12}>
          {tags.map((tag, index) => (
            <GridCol key={index} colSpan={4} md={6} sm={12}>
              <Card
                title={tag.name}
                description={getFormattedText(
                  config.tags.allTags.postCount,
                  "count",
                  "" + tag.count
                )}
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
  const tagNames = getAllTags();
  const tags = tagNames.map((tag) => ({
    name: tag,
    count: getPostsByTag(tag).length,
  }));
  return {
    props: { tags },
  };
};

export default ViewTags;
