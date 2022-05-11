import React from "react";
import { getAllPosts } from "../lib/api";
import Card from "./Card";
import GridCol from "./Grid/GridCol";
import GridContainer from "./Grid/GridContainer";

export default function Posts({ posts }) {
  return (
    <GridContainer cols={3}>
      {posts.map((post, index) => (
        <GridCol key={index}>
          <Card title={post.title} cover={post.cover} description={post.desc} />
        </GridCol>
      ))}
    </GridContainer>
  );
}
