import config from "config";
import { FC } from "react";
import { Post } from "../../../../lib/api";
import Card from "../Card/Card";
import { GridCol, GridContainer } from "../Grid";
import style from "./Posts.module.scss";

export interface PostsProps {
  posts: Post[];
}

const Posts: FC<PostsProps> = ({ posts }) => {
  return (
    <>
      <GridContainer cols={12}>
        {posts.map((post, index) => {
          return (
            post.visible && (
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
            )
          );
        })}
      </GridContainer>
      {!posts.length && (
        <div className={style.noPost}>
          <h5 className={style.noPostText}>{config.post.noPostText}</h5>
        </div>
      )}
    </>
  );
};

export default Posts;
