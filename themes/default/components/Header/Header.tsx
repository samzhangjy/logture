import config from "config";
import style from "./Header.module.scss";

export default function Header() {
  return (
    <>
      <div className={`${style.slogan} ${style.typography}`}>
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
        <div className={style.navigationContainer}>
          {config.links.map((link, index) => (
            <a className={style.navigation} href={link.link} key={index}>
              <h5 className={style.navigationText}>{link.text}</h5>
            </a>
            // </GridCol>
          ))}
        </div>
      </div>
      <div className={style.mobileSlogan}>
        <h4 className={style.mobileSloganItem}>
          {config.site.slogan.map((slogan, index) => {
            return (
              <span key={index} className={style.mobileSloganSlug}>
                {slogan}.
              </span>
            );
          })}
        </h4>
      </div>
    </>
  );
}
