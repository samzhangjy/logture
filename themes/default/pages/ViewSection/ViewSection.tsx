import { ViewSectionProps } from "pages/sections/[slug]";
import { FC } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { CustomSection } from "../../components/Section";
import { useScrollTrigger } from "../../hooks";
import style from "./ViewSection.module.scss";

const ViewSection: FC<ViewSectionProps> = ({ section }) => {
  const trigger = useScrollTrigger(150);

  return (
    <div className={`${style.container} ${style.typography}`}>
      <Navbar show={trigger} />
      <Header />
      <CustomSection {...section} />
      <Footer />
    </div>
  );
};

export default ViewSection;
