import config from "config";
import style from "./Footer.module.scss";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <div className={`${style.footer} ${style.typography}`}>
      <h5 className={style.footerTitle}>{config.site.title}</h5>
      {config.footer && (
        <p
          className={style.footerSubtitle}
          dangerouslySetInnerHTML={{ __html: config.footer }}
        />
      )}
      <p className={style.footerSubtitle}>
        &copy; {new Date().getFullYear()} {config.site.owner}.
        {config.showPoweredBy === undefined || config.showPoweredBy ? (
          <span>
            {" "}
            Powered by{" "}
            <a
              href="https://github.com/samzhangjy/logture"
              rel="noreferrer"
              target="_blank"
            >
              LogTure
            </a>
            .
          </span>
        ) : null}
      </p>
    </div>
  );
};

export default Footer;
