/*
 * A deliberately small markdown dialect for log posts:
 *
 *   ## Heading    ### Subheading    - bullet (or * bullet)
 *   **bold**  *italic*  [text](https://…)  bare https://… links
 *   <song>Artist - Title</song>  → YouTube search link
 *
 * Blocks are separated by blank lines; headings and runs of bullets don't
 * need them. All other text is HTML-escaped.
 */

const BULLET = /^[-*] +/;
const INLINE_TOKEN = /\u0000(\d+)\u0000/g;

const MUSIC_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';

export function renderMarkdown(content: string): string {
  const source = content
    .replace(/\r\n/g, "\n")
    .replace(/^(#{2,3} .+)$/gm, "\n\n$1\n\n")
    .replace(/^(?:[-*] +.*(?:\n|$))+/gm, "\n\n$&\n\n");

  return source
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("### ")) {
        return `<h3>${renderInline(block.slice(4))}</h3>`;
      }
      if (block.startsWith("## ")) {
        return `<h2>${renderInline(block.slice(3))}</h2>`;
      }
      const lines = block.split("\n");
      if (lines.every((line) => BULLET.test(line))) {
        const items = lines.map(
          (line) => `<li>${renderInline(line.replace(BULLET, ""))}</li>`,
        );
        return `<ul>${items.join("")}</ul>`;
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
