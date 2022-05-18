import React, { FC } from "react";
import style from "../styles/Card.module.scss";
import GridContainer from "./Grid/GridContainer";
import GridCol from "./Grid/GridCol";
import Link from "next/link";

export interface CardProps {
  cover: string;
  title: string;
  description: string;
  coverTop?: boolean;
  link?: string;
  footer?: string;
  tags?: string[];
  activateOnTitle?: boolean;
}

interface CardWrapperProps {
  children: React.ReactNode;
  link?: string;
  clickTitle?: boolean;
}

const CardWrapper: FC<CardWrapperProps> = (props) => {
  return (
    <>
      {props.clickTitle ? (
        <>{props.children}</>
      ) : (
        <Link href={props.link ? props.link : ""} passHref>
          <a>{props.children}</a>
        </Link>
      )}
    </>
  );
};

const Card: FC<CardProps> = (props) => {
  return (
    <CardWrapper clickTitle={props.activateOnTitle} link={props.link}>
      <div className={props.activateOnTitle ? style.cardActivateOnTitle : style.card}>
        <GridContainer cols={12} gap="20px">
          {!props.coverTop && (
            <GridCol colSpan={3} sm={12}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={props.cover}
                alt={props.title}
                className={style.cardCover}
              />
            </GridCol>
          )}
          <GridCol colSpan={props.coverTop ? 12 : 9} sm={12}>
            {props.coverTop && (
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={props.cover}
                  alt={props.title}
                  className={
                    props.coverTop ? style.cardTopCover : style.cardCover
                  }
                />
              </div>
            )}
            {props.activateOnTitle ? (
              <Link href={props.link ? props.link : ""} passHref>
                <a>
                  <h5 className={style.cardTitleClick}>{props.title}</h5>
                </a>
              </Link>
            ) : <h5 className={style.cardTitle}>{props.title}</h5>}
            <div className={style.cardDetailsSpacer} />
            <p className={style.cardDescription}>{props.description}</p>
            {props.tags?.map((value, index) => (
              <Link href={`/tags/${value}`} key={index} passHref>
                <a className={style.cardTag}>
                  <span>{value}</span>
                </a>
              </Link>
            ))}
            <p className={style.cardFooter}>{props.footer}</p>
          </GridCol>
        </GridContainer>
      </div>
    </CardWrapper>
  );
};

export default Card;
