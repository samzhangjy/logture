import { getAllTags, getPostsByTag } from "@/lib/api";
import getConfig from "@/lib/getConfig";
import config from "config";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { FC } from "react";

export interface Tag {
  name: string;
  count: number;
}

export interface ViewTagsRouteProps {
  tags: Tag[];
}

export interface TagType {
  name: string;
  count: number;
}

export interface ViewTagsProps {
  tags: TagType[];
  getConfig: (path: string) => any;
}

const ViewTags: NextPage<ViewTagsRouteProps> = ({ tags }) => {
  const ViewTags: FC<ViewTagsProps> = getConfig("theme.tags.ViewTags");

  return (
    <>
      <Head>
        <title>
          {config.tags.allTags.title} - {config.site.title}
        </title>
        <meta name="description" content={config.tags.allTags.description} />
      </Head>
      <ViewTags tags={tags} getConfig={getConfig} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const tagNames = getAllTags();
  const tags = tagNames.map((tag) => ({
    name: tag,
    count: getPostsByTag(tag).length,
  }));
  return {
    props: { tags },
  };
};

export default ViewTags;
