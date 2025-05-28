import { codeToHtml } from 'shiki';

export async function highlightCode(code: string, language: string = 'javascript'): Promise<string> {
  try {
    const html = await codeToHtml(code, {
      lang: language,
      theme: 'one-dark-pro',
      transformers: [
        {
          pre(node) {
            node.properties.class = 'p-6 rounded-lg';
          },
          code(node) {
            node.properties.class = 'text-sm';
          }
        }
      ]
    });
    return html;
  } catch (error) {
    console.error('Error highlighting code:', error);
    return `<pre><code>${escapeHtmlServer(code)}</code></pre>`;
  }
}

export async function parseAndHighlightContent(content: string): Promise<string> {
  let processedContent = content;

  // First, find and temporarily replace code blocks with placeholders
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const blockMatches = Array.from(content.matchAll(codeBlockRegex));
  const codeBlockPlaceholders: string[] = [];

  // Replace code blocks with placeholders
  for (let i = blockMatches.length - 1; i >= 0; i--) {
    const match = blockMatches[i];
    const [fullMatch, language = 'text', code] = match;
    const startIndex = match.index!;
    const endIndex = startIndex + fullMatch.length;

    const placeholder = `__CODE_BLOCK_${i}__`;
    codeBlockPlaceholders[i] = await highlightCode(code.trim(), language);

    processedContent =
      processedContent.slice(0, startIndex) +
      placeholder +
      processedContent.slice(endIndex);
  }

  // Handle headers (##)
  const headerRegex = /^## (.+)$/gm;
  processedContent = processedContent.replace(
    headerRegex,
    '<h2 class="blog-header">$1</h2>'
  );

  // Handle inline code (now safe from code blocks)
  const inlineCodeRegex = /`([^`\n]+)`/g;
  processedContent = processedContent.replace(
    inlineCodeRegex,
    '<code class="blog-code">$1</code>'
  );

  // Handle plain URLs (before song references to avoid conflicts)
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  processedContent = processedContent.replace(
    urlRegex,
    '<a href="$1" class="blog-link underline" target="_blank">$1</a>'
  );

  // Handle song references
  const songRegex = /<song>([^<]+)<\/song>/g;
  processedContent = processedContent.replace(
    songRegex,
    (_match, songName) => {
      const trimmedSong = songName.trim();
      const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(trimmedSong)}`;
      return `<a href="${youtubeSearchUrl}"class="blog-link inline-flex items-center gap-2" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-music-icon lucide-music"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                ${trimmedSong}
              </a>`;
    });

  // Handle bold text
  const boldRegex = /\*\*([^*\n]+)\*\*/g;
  processedContent = processedContent.replace(
    boldRegex,
    '<strong>$1</strong>'
  );

  // Handle italic text
  const italicRegex = /\*([^*\n]+)\*/g;
  processedContent = processedContent.replace(
    italicRegex,
    '<em>$1</em>'
  );

  // Restore code blocks from placeholders
  for (let i = 0; i < codeBlockPlaceholders.length; i++) {
    const placeholder = `__CODE_BLOCK_${i}__`;
    processedContent = processedContent.replace(placeholder, codeBlockPlaceholders[i]);
  }

  return processedContent;
}

// Server-safe HTML escape function
export function escapeHtmlServer(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
} 