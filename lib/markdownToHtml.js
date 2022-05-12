import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import remarkPrism from 'remark-prism'

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(remarkPrism)
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown)
  return result.toString()
}
