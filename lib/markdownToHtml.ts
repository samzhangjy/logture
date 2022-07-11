import MarkdownIt from "markdown-it/lib";
import markdownItHighlightjs from "markdown-it-highlightjs";
import markdownItTexMath from "markdown-it-texmath";
import katex from "katex";

const markdownToHtml = async (markdown: string) => {
  MarkdownIt()
  const md = new MarkdownIt({
    html: true,
  })
    .use(markdownItHighlightjs)
    .use(markdownItTexMath, {
      engine: katex,
      delimiters: "dollars",
      katexOptions: { macros: { "\\RR": "\\mathbb{R}" } },
    });
  return md.render(markdown);
};

export default markdownToHtml;
