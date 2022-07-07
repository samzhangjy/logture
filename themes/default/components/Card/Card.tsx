import GridCol from "../../components/Grid/GridCol";
import GridContainer from "../../components/Grid/GridContainer";
import Link from "next/link";
import { FC } from "react";
import style from "./Card.module.scss";

export interface CardProps {
  cover?: string;
  title: string;
  description?: string;
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

const CardWrapper: FC<CardWrapperProps> = ({ clickTitle, children, link }) => {
  return (
    <>
      {clickTitle ? (
        <>{children}</>
      ) : (
        <Link href={link ? link : ""} passHref>
          <a>{children}</a>
        </Link>
      )}
    </>
  );
};

const Card: FC<CardProps> = ({
  cover,
  coverTop,
  description,
  title,
  activateOnTitle,
  footer,
  link,
  tags,
}) => {
  return (
    <CardWrapper clickTitle={activateOnTitle} link={link}>
      <div className={`${activateOnTitle ? style.cardActivateOnTitle : style.card} ${style.typography}`}>
        <GridContainer cols={12} gap="20px">
          {!coverTop && cover && (
            <GridCol colSpan={3} sm={12}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cover} alt={title} className={style.cardCover} />
            </GridCol>
          )}
          <GridCol colSpan={coverTop || !cover ? 12 : 9} sm={12}>
            {coverTop && cover && (
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cover}
                  alt={title}
                  className={coverTop ? style.cardTopCover : style.cardCover}
                />
              </div>
            )}
            {activateOnTitle ? (
              <Link href={link ? link : ""} passHref>
                <a>
                  <h5 className={style.cardTitleClick}>{title}</h5>
                </a>
              </Link>
            ) : (
              <h5 className={style.cardTitle}>{title}</h5>
            )}
            <div className={style.cardDetailsSpacer} />
            {description && (
              <p className={style.cardDescription}>{description}</p>
            )}
            {tags?.map((value, index) => (
              <Link href={`/tags/${value}`} key={index} passHref>
                <a className={style.cardTag}>
                  <span>{value}</span>
                </a>
              </Link>
            ))}
            {footer && <p className={style.cardFooter}>{footer}</p>}
          </GridCol>
        </GridContainer>
      </div>
    </CardWrapper>
  );
};

export default Card;
