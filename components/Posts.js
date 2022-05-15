import React from "react";
import Card from "./Card";
import GridCol from "./Grid/GridCol";
import GridContainer from "./Grid/GridContainer";
import Link from "next/link";

export default function Posts({ posts }) {
  return (
    <GridContainer cols={12}>
      {posts.map((post, index) => (
        <GridCol key={index} colSpan={4} md={6} sm={12}>
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
