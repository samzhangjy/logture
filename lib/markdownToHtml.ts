import MarkdownIt from "markdown-it/lib";

export default async function markdownToHtml(markdown: string) {
  const md = new MarkdownIt({
    html: true,
  }).use(require("markdown-it-highlightjs"));
  return md.render(markdown);
}
