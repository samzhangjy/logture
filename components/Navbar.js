import { useState } from "react";
import Link from "next/link";
import React from "react";
import config from "../config";
import style from "../styles/Navbar.module.scss";
import { IoMenuOutline } from "react-icons/io5";

export default function Navbar(props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={props.show ? style.navbar : style.navbarHide}>
      <button
        className={style.navbarToggle}
        onClick={() => setExpanded(!expanded)}
      >
        <IoMenuOutline />
      </button>
      <h6 className={style.navbarTitle}>{config.site.name}</h6>
      {config.links.map((link, index) => (
        <Link href={link.link} passHref key={index}>
          <a className={style.link}>
            <p className={style.linkItem}>{link.text}</p>
          </a>
        </Link>
      ))}
      {expanded && (
        <div
          className={`${style.mobileNavbar} ${
            !expanded && style.mobileNavbarHide
          }`}
        >
          {config.links.map((link, index) => (
            <Link href={link.link} passHref key={index}>
              <a className={style.mobileLink}>
                <p className={style.mobileLinkItem}>{link.text}</p>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
