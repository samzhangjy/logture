import React from "react";
import style from "../styles/Section.module.scss";

export default function Section(props) {
  return (
    <div className={style.sectionContainer}>
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
}
