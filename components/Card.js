import React from "react";
import style from "../styles/Card.module.css";
import GridContainer from "./Grid/GridContainer";
import GridCol from "./Grid/GridCol";

export default function Project(props) {
  return (
    <div className={style.card} onClick={() => window.open(props.link)}>
      <GridContainer cols={4} gap="20px">
        <GridCol>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={props.cover}
            alt={props.title}
            className={style.cardCover}
          />
        </GridCol>
        <GridCol colSpan={3}>
          <h5 className={style.cardTitle}>
            {props.title}
          </h5>
          <div className={style.cardDetailsSpacer} />
          <p className={style.cardDescription}>
            {props.description}
          </p>
        </GridCol>
      </GridContainer>
    </div>
  );
}
