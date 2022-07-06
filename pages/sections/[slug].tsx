import { SectionConfigType } from "@/config/default";
import getConfig from "@/lib/getConfig";
import config from "config";
import "highlight.js/styles/github-dark.css";
import { getAllSections, getSectionBySlug } from "lib/api";
import { GetStaticProps, NextPage } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";

interface ViewSectionRouteProps {
  section: SectionConfigType;
}

export interface ViewSectionProps {
  section: SectionConfigType;
  getConfig: (path: string) => any;
}

const ViewSectionRoute: NextPage<ViewSectionRouteProps> = ({ section }) => {
  const router = useRouter();
  const ViewSection: FC<ViewSectionProps> = getConfig("theme.sections.ViewSection");
  if (!router.isFallback && !section?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>
          {section.name} - {config.site.title}
        </title>
        <meta name="description" content={section.description} />
      </Head>
      <ViewSection section={section} getConfig={getConfig} />
    </>
  );
};

interface ViewSectionSlug {
  slug: string;
}

interface ViewSectionParam {
  params: ViewSectionSlug;
}

export const getStaticProps: GetStaticProps = ({ params }) => {
  let slug = "";
  if (params && typeof params.slug === "object") slug = params.slug[0];
  else if (params && typeof params.slug === "string") slug = params.slug;
  const section = getSectionBySlug(slug);

  return {
    props: { section },
  };
};

export async function getStaticPaths() {
  const sections = getAllSections();
  const slugs: ViewSectionParam[] = [];

  sections.forEach((value) => {
    if (value.newPage && value.slug) {
      slugs.push({
        params: {
          slug: value.slug,
        },
      });
    }
  });

  return {
    paths: slugs,
    fallback: false,
  };
}

export default ViewSectionRoute;
