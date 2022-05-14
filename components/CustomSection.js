import React from "react";
import Section from "./Section";
import GridContainer from "./Grid/GridContainer";
import GridCol from "./Grid/GridCol";
import Card from "./Card";

export default function CustomSection(props) {
  return (
    <Section title={props.name} description={props.description}>
      {typeof props.data === "object" ? (
        <GridContainer cols={2} gap="20px">
          {props.data.map((item, index) => (
            <GridCol key={index}>
              <Card
                title={item.title}
                description={item.description}
                cover={item.cover}
                link={item.link}
              />
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
}
