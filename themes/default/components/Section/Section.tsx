import { FC } from "react";
import style from "./Section.module.scss";

export interface SectionProps {
  title: string;
  description: string | React.ReactNode;
  children: React.ReactNode;
  titleLg?: boolean;
}

const Section: FC<SectionProps> = (props) => {
  return (
    <div className={`${style.sectionContainer} ${style.typography}`}>
      {props.titleLg ? (
        <h1 className={style.sectionTitle}>{props.title}</h1>
      ) : (
        <h2 className={style.sectionTitle}>{props.title}</h2>
      )}
      {props.titleLg ? (
        <h4 className={style.sectionTitle}>{props.description}</h4>
      ) : (
        <h5 className={style.sectionTitle}>{props.description}</h5>
      )}
      <div className={style.sectionSpacer} />
      <div className={style.sectionContent}>{props.children}</div>
    </div>
  );
};

export default Section;
