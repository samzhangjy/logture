import simpleTheme from "themes/simple";

const config = {
  // global site information configuration
  site: {
    name: "Sam's Blog", // site name
    title: "Sam Zhang.", // site title
    description: "A developer who loves open source.", // site description
    slogan: ["Eat", "Code", "Sleep"], // slogans
    owner: "Sam Zhang", // site owner, used in footer copyright
  },
  // post configuration
  post: {
    folder: "posts", // post storage folder
    title: "博客",  // post title (displayed on the index page and on the posts page)
    description: "我的博客文章",  // post description (displayed only on the posts page)
    indexDescription: "在博客页面查看所有的博客存档",  // post description (displayed only on the index page)
    readMore: "更多文章", // read more text on the index page
    postsToDisplay: 6, // number of posts to display on the index page
    noPostText: "还没有文章", // text to display when no posts exist for the current section
  },
  // tag configuration
  tags: {
    // {{tag}} is the template string format in LogTure used to inject variables into the current string template
    description: "标签为 {{tag}} 的文章",  // tag description (displayed only on the tag page)
    title: "标签 {{tag}}",  // tag title (displayed on the tag page)
    // configuration for the `all tags` page
    allTags: {
      title: "所有标签",  // title (displayed on the all tags page)
      description: "博客中所有文章的标签汇总",  // description (displayed only on the all tags page)
      postCount: "共有 {{count}} 篇文章",  // post count description (displayed on the all tags page)
    }
  },
  // navbar links configuration
  links: [
    {
      text: "首页", // link text
      link: "/", // link url
    },
    {
      text: "博客",
      link: "/posts",
    },
    {
      text: "标签",
      link: "/tags",
    },
    {
      text: "项目",
      link: "/sections/projects",
    },
    {
      text: "关于",
      link: "https://samzhangjy.com",
    },
    {
      text: "GitHub",
      link: "https://github.com/samzhangjy",
    },
  ],
  // custom sections configuration
  custom: [
    {
      // section data, can be either an array of objects
      // or a string (see the `Join us` section below)
      data: [
        // if data is an array, then each object in the array
        // represents a card with certain information
        {
          title: "LogTure", // card title
          // card description
          description:
            "📝 A modern and light-weight personal blogging framework built with Nextjs.",
          cover: "/assets/projects/logture.png", // card cover, shown on the left of card description
          link: "https://github.com/samzhangjy/logture", // the link to navigate to when clicking on the card
        },
        {
          title: "VueTerm",
          description: "An Ubuntu like terminal portfolio site.",
          cover: "/assets/projects/vueterm.png",
          link: "https://github.com/samzhangjy/VueTerm",
        }
      ],
      name: "项目", // section name (title)
      description: "我的开源项目们", // section description
      slug: "projects", // section slug, needed if the creation of a new page containing only this section is needed
      newPage: true, // weather to create a single page under `/sections/[slug]` or not
      showOnIndex: true,  // weather to show the current section on the index page or not
    },
  ],
  showPoweredBy: true, // change it to false if you want to hide the `Powered by LogTure` text and remove the console.log message
  footer: `
    Made with ❤️ by 
    <a href="https://github.com/samzhangjy" rel="noreferrer" target="_blank">
      samzhangjy
    </a>.
    <br />
    <a href="https://beian.miit.gov.cn" rel="noreferrer" target="_blank">
      津 ICP 备 2022003937 号
    </a>.
  `, // extra footer content, can include HTML tags
  theme: simpleTheme,
};

export default config;
