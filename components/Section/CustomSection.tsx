import { FC } from "react";
import Card, { CardProps } from "../Card";
import GridCol from "../Grid/GridCol";
import GridContainer from "../Grid/GridContainer";
import Section from "./Section";

export interface CustomSectionProps {
  name: string;
  data: CardProps[] | string;
  description: string;
}

const CustomSection: FC<CustomSectionProps> = (props) => {
  return (
    <Section title={props.name} description={props.description}>
      {typeof props.data === "object" ? (
        <GridContainer cols={12} gap="20px">
          {props.data.map((item, index) => (
            <GridCol key={index} colSpan={6} sm={12}>
              <Card {...item} />
            </GridCol>
          ))}
        </GridContainer>
      ) : (
        <h6
          dangerouslySetInnerHTML={{
            __html: props.data.replace("\n", "<br />"),
          }}
        ></h6>
      )}
    </Section>
  );
};

export default CustomSection;
