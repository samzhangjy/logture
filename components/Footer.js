import React from "react";
import style from "../styles/Footer.module.scss";
import config from "../config";

export default function Footer() {
  return (
    <div className={style.footer}>
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
}
