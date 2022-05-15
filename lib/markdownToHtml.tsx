import MarkdownIt from "markdown-it/lib";

export default async function markdownToHtml(markdown: string) {
  var md: MarkdownIt = new MarkdownIt().use(require("markdown-it-highlightjs"));
  return md.render(markdown);
}
