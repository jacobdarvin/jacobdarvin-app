import { codeToHtml } from 'shiki';

export async function highlightCode(code: string, language: string = 'javascript'): Promise<string> {
  try {
    const html = await codeToHtml(code, {
      lang: language,
      theme: 'github-dark',
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

  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const blockMatches = Array.from(content.matchAll(codeBlockRegex));

  for (let i = blockMatches.length - 1; i >= 0; i--) {
    const match = blockMatches[i];
    const [fullMatch, language = 'text', code] = match;
    const startIndex = match.index!;
    const endIndex = startIndex + fullMatch.length;

    const highlightedCode = await highlightCode(code.trim(), language);

    processedContent =
      processedContent.slice(0, startIndex) +
      highlightedCode +
      processedContent.slice(endIndex);
  }

  // Handle headers (##)
  const headerRegex = /^## (.+)$/gm;
  processedContent = processedContent.replace(
    headerRegex,
    '<h2 class="blog-header">$1</h2>'
  );

  const inlineCodeRegex = /`([^`\n]+)`/g;
  processedContent = processedContent.replace(
    inlineCodeRegex,
    '<code class="blog-code">$1</code>'
  );

  // Handle plain URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  processedContent = processedContent.replace(
    urlRegex,
    '<a href="$1" class="blog-link" target="_blank">$1</a>'
  );

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