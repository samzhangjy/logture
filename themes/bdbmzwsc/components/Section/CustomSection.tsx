import { FC } from "react";
import Card, { CardProps } from "../Card";
import GridCol from "../Grid/GridCol";
import GridContainer from "../Grid/GridContainer";
import Section from "./Section";
import style from "./CustomSection.module.scss";

export interface CustomSectionProps {
  name: string;
  data: CardProps[] | string;
  description: string;
}

const CustomSection: FC<CustomSectionProps> = (props) => {
  return (
    <Section title={props.name} description={props.description}>
      <div className={style.typography}>
      {typeof props.data !== "string" ? (
        <GridContainer cols={12} gap="20px">
          {props.data.map((item, index) => (
            <GridCol key={index} colSpan={6} sm={12}>
              <Card {...item} />
            </GridCol>
          ))}
        </GridContainer>
      ) : (
        <p
          dangerouslySetInnerHTML={{
            __html: (props.data as string).replace("\n", "<br />"),
          }}
        ></p>
      )}</div>
    </Section>
  );
};

export default CustomSection;
