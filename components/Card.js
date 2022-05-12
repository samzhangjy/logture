import React from "react";
import style from "../styles/Card.module.css";
import GridContainer from "./Grid/GridContainer";
import GridCol from "./Grid/GridCol";

export default function Project(props) {
  const handleClick = () => {
    if (props.link) window.open(props.link)
  }
  return (
    <div className={style.card} onClick={handleClick}>
      <GridContainer cols={props.coverTop ? 1 : 4} gap="20px">
        {!props.coverTop && (
          <GridCol>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={props.cover}
              alt={props.title}
              className={style.cardCover}
            />
          </GridCol>
        )}
        <GridCol colSpan={props.coverTop ? 1 : 3}>
          {props.coverTop && (
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={props.cover}
                alt={props.title}
                className={props.coverTop ? style.cardTopCover : style.cardCover}
              />
            </div>
          )}
          <h5 className={style.cardTitle}>{props.title}</h5>
          <div className={style.cardDetailsSpacer} />
          <p className={style.cardDescription}>{props.description}</p>
        </GridCol>
      </GridContainer>
    </div>
  );
}
