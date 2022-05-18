import React from "react";
import config from "../config";
import style from "../styles/Header.module.scss";
import GridContainer from "./Grid/GridContainer";
import GridCol from "./Grid/GridCol";

export default function Header() {
  return (
    <>
      <div className={style.slogan}>
        {config.site.slogan.map((slogan, index) => {
          return (
            <h3 key={index} className={style.sloganItem}>
              {slogan}.
            </h3>
          );
        })}
      </div>
      <div className={style.titleContainer}>
        <h1 className={style.title}>{config.site.title}</h1>
        <div className={style.spacer} />
        <h4 className={style.subtitle}>{config.site.description}</h4>
        <div className={style.spacerSubtitle} />
        <GridContainer cols={12} className={style.navigationContainer}>
          {config.links.map((link, index) => (
            <GridCol
              key={index}
              colSpan={12 / config.links.length}
              md={3}
              sm={4}
            >
              <a className={style.navigation} href={link.link}>
                <h5 className={style.navigationText}>{link.text}</h5>
              </a>
            </GridCol>
          ))}
        </GridContainer>
      </div>
      <div className={style.mobileSlogan}>
        <h4 className={style.mobileSloganItem}>
          {config.site.slogan.map((slogan, index) => {
            return <span key={index} className={style.mobileSloganSlug}>{slogan}.</span>;
          })}
        </h4>
      </div>
    </>
  );
}
