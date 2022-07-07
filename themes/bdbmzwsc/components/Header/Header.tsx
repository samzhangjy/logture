import config from "config";
import style from "./Header.module.scss";

export default function Header() {
  return (
    <div className={style.titleContainer}>
      <div className={style.testanimation}>{config.site.title}</div>
      <div className={style.word}>Powered</div>
      <div className={style.word}>by</div>
      <div className={style.word}>Bdbmzwsc</div>
      <div className={style.spacer} />
      <h4 className={style.subtitle}>{config.site.description}</h4>
      <hr />
    </div>
  );
}
