import React from "react";
import { getAllPosts } from "../lib/api";
import Card from "./Card";
import GridCol from "./Grid/GridCol";
import GridContainer from "./Grid/GridContainer";
import Link from "next/link";

export default function Posts({ posts }) {
  return (
    <GridContainer cols={3}>
      {posts.map((post, index) => (
        <GridCol key={index}>
          <Link href={`/posts/${encodeURIComponent(post.slug)}`} passHref>
            <a>
              <Card
                title={post.title}
                cover={post.cover}
                description={post.desc}
                coverTop
              />
            </a>
          </Link>
        </GridCol>
      ))}
    </GridContainer>
  );
}
