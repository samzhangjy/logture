import React, { FC } from "react";
import Card from "./Card";
import GridCol from "./Grid/GridCol";
import GridContainer from "./Grid/GridContainer";
import Link from "next/link";
import { Post } from "../lib/api";

export interface PostsProps {
  posts: Post[];
}

const Posts: FC<PostsProps> = ({ posts }) => {
  return (
    <GridContainer cols={12}>
      {posts.map((post, index) => (
        <GridCol key={index} colSpan={4} md={6} sm={12}>
          <Card
            title={post.title}
            cover={post.cover}
            description={post.desc}
            footer={`Posted on ${post.date}`}
            tags={post.tags}
            link={`/posts/${encodeURIComponent(post.slug)}`}
            coverTop
            activateOnTitle
          />
        </GridCol>
      ))}
    </GridContainer>
  );
}

export default Posts;
