import { getFormattedText } from "@/lib/formatTemplate";
import { ViewTagsProps } from "pages/tags";
import { FC } from "react";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import { GridCol, GridContainer } from "../../components/Grid";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { Section } from "../../components/Section";
import { useScrollTrigger } from "../../hooks";
import style from "./ViewTags.module.scss";

const ViewTags: FC<ViewTagsProps> = ({ tags, getConfig }) => {
  const trigger = useScrollTrigger(350);

  return (
    <div className={`${style.container} ${style.typography}`}>
      <Navbar show={trigger} />
      <Header />
      <Section
        title={getConfig("tags.allTags.title")}
        description={getConfig("tags.allTags.description")}
      >
        <GridContainer cols={12}>
          {tags.map((tag, index) => (
            <GridCol key={index} colSpan={4} md={6} sm={12}>
              <Card
                title={tag.name}
                description={getFormattedText(
                  getConfig("tags.allTags.postCount") as string,
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

export default ViewTags;
