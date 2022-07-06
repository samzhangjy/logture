import Link from "next/link";
import { FC, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import config from "../../../../config";
import style from "./Navbar.module.scss";

export interface NavbarProps {
  show?: boolean;
}

const Navbar: FC<NavbarProps> = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`${props.show ? style.navbar : style.navbarHide} ${style.typography}`}>
      <button
        className={style.navbarToggle}
        onClick={() => setExpanded(!expanded)}
        aria-label="Toggle navigation pane"
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
              <a
                className={style.mobileLink}
                onClick={() => {
                  setTimeout(() => setExpanded(false), 500);
                }}
              >
                <p className={style.mobileLinkItem}>{link.text}</p>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
