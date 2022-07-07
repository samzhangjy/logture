import config from "config";
import style from "./Header.module.scss";

export default function Header() {
  return (
    <div className={style.titleContainer}>
      <h1 className={style.title}>{config.site.title}</h1>
      <div className={style.spacer} />
      <h4 className={style.subtitle}>{config.site.description}</h4>
      <hr />
    </div>
  );
}
