import React from "react";
import config from "../config";
import style from "../styles/Header.module.css";

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
        <h1>{config.site.title}</h1>
        <div className={style.spacer} />
        <h4 className={style.subtitle}>
          {config.site.subtitle}
        </h4>
        <div className={style.spacer} />
        <div className={style.navigationContainer}>
          {config.links.map((link, index) => (
            <a className={style.navigation} href={link.link} key={index} target="_blank" rel="noreferrer">
              <h5>{link.text}</h5>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
