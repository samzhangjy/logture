import MarkdownIt from "markdown-it/lib";

const markdownToHtml = async (markdown: string) => {
  const md = new MarkdownIt({
    html: true,
  }).use(require("markdown-it-highlightjs"));
  return md.render(markdown);
};

export default markdownToHtml;
