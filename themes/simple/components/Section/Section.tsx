import { FC } from "react";
import style from "./Section.module.scss";

export interface SectionProps {
  title: string;
  description: string | React.ReactNode;
  children: React.ReactNode;
  titleLg?: boolean;
  spaceLg?: boolean;
  childrenBetweenTitle?: React.ReactNode;
  className?: string;
  titleContainerStyle?: string;
}

const Section: FC<SectionProps> = (props) => {
  return (
    <div
      className={`${style.sectionContainer} ${style.typography} ${props.className}`}
    >
      <div className={props.titleContainerStyle}>
        <div>
          {props.titleLg ? (
            <h2 className={style.sectionTitleLg}>{props.title}</h2>
          ) : (
            <h3 className={style.sectionTitle}>{props.title}</h3>
          )}
          {props.titleLg ? (
            <h4 className={style.sectionSubtitleLg}>{props.description}</h4>
          ) : (
            <h5 className={style.sectionSubtitle}>{props.description}</h5>
          )}
        </div>
      </div>
      <div
        className={props.spaceLg ? style.sectionSpacerLg : style.sectionSpacer}
      />
      {props.childrenBetweenTitle}
      <div
        className={props.spaceLg ? style.sectionSpacerLg : style.sectionSpacer}
      />
      <div className={style.sectionContent}>{props.children}</div>
    </div>
  );
};

export default Section;
