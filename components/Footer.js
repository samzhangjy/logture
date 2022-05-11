import React from "react";
import style from "../styles/Footer.module.css";
import config from "../config";

export default function Footer() {
  return (
    <div className={style.footer}>
      <h5 className={style.footerTitle}>
        {config.site.title}
      </h5>
      <p className={style.footerSubtitle}>
        &copy; {new Date().getFullYear()} All rights reserved.
      </p>
    </div>
  )
}