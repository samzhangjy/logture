import React from "react";
import style from "../styles/Section.module.css";

export default function Section(props) {
  return (
    <div className={style.sectionContainer}>
      <h2 className={style.sectionTitle}>
        {props.title}
      </h2>
      <h5 className={style.sectionTitle}>
        {props.description}
      </h5>
      <div className={style.sectionSpacer} />
      <div className={style.sectionContent}>
        {props.children}
      </div>
    </div>
  );
}
