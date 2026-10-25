import { codeToHtml } from "shiki";

/*
 * A deliberately small markdown dialect for log posts:
 *
 *   ## Heading            ```lang fenced code```     `inline code`
 *   **bold**  *italic*    [text](https://…)          bare https://… links
 *   <song>Artist - Title</song>  → YouTube search link
 *
 * Blocks are separated by blank lines. All other text is HTML-escaped.
 */

const CODE_BLOCK = /```(\w+)?\n([\s\S]*?)```/g;
const CODE_BLOCK_TOKEN = /^\u0001(\d+)\u0001$/;
const INLINE_TOKEN = /\u0000(\d+)\u0000/g;

const MUSIC_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';

export async function renderMarkdown(content: string): Promise<string> {
  const codeBlocks = await Promise.all(
    Array.from(content.matchAll(CODE_BLOCK), ([, lang = "text", code]) =>
      highlight(code.trim(), lang),
    ),
  );

  let index = 0;
  const source = content
    .replace(/\r\n/g, "\n")
    .replace(CODE_BLOCK, () => `\n\n\u0001${index++}\u0001\n\n`)
    .replace(/^(## .+)$/gm, "\n\n$1\n\n");

  return source
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const code = block.match(CODE_BLOCK_TOKEN);
      if (code) {
        return codeBlocks[Number(code[1])];
      }
      if (block.startsWith("## ")) {
        return `<h2>${renderInline(block.slice(3))}</h2>`;
      }
      return `<p>${renderInline(block)}</p>`;
    })
    .join("\n");
}

function renderInline(text: string): string {
  // Rendered fragments are swapped for tokens so later passes can't touch them.
  const fragments: string[] = [];
  const stash = (html: string) => `\u0000${fragments.push(html) - 1}\u0000`;

  const html = escapeHtml(text)
    .replace(/`([^`\n]+)`/g, (_, code) => stash(`<code>${code}</code>`))
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<]+)/g,
      (_, label, href, bare) => stash(link(href ?? bare, label ?? bare)),
    )
    .replace(/&lt;song&gt;(.+?)&lt;\/song&gt;/g, (_, song) => {
      const href = `https://www.youtube.com/results?search_query=${encodeURIComponent(unescapeHtml(song.trim()))}`;
      return stash(
        `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5">${MUSIC_ICON}${song.trim()}</a>`,
      );
    })
    .replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>");

  return html.replace(INLINE_TOKEN, (_, i) => fragments[Number(i)]);
}

function link(href: string, label: string) {
  return `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

async function highlight(code: string, lang: string) {
  try {
    return await codeToHtml(code, {
      lang,
      themes: { light: "github-light", dark: "github-dark" },
    });
  } catch {
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
  }
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function unescapeHtml(text: string) {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}
