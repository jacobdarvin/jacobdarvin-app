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

  const inlineCodeRegex = /`([^`\n]+)`/g;
  processedContent = processedContent.replace(
    inlineCodeRegex,
    '<code style="font-family: \'Fira Code\', \'Monaco\', \'Cascadia Code\', \'Roboto Mono\', monospace; background-color: rgba(255, 255, 255, 0.1); padding: 0.125rem 0.25rem; border-radius: 0.25rem; font-size: 0.875em;">$1</code>'
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