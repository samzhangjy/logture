import ViewPost from "./pages/ViewPost";
import ViewPosts from "./pages/ViewPosts";
import ViewSection from "./pages/ViewSection";
import ViewTag from "./pages/ViewTag";
import ViewTags from "./pages/ViewTags";
import Home from "./pages/Home";

const defaultTheme = {
  posts: {
    ViewPost,
    ViewPosts,
  },
  sections: {
    ViewSection,
  },
  tags: {
    ViewTag,
    ViewTags,
  },
  Home,
};

export default defaultTheme;
