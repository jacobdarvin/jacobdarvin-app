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
    return `${escapeHtmlServer(code)}`;
  }
}

export async function highlightInlineCode(code: string, language: string = 'javascript'): Promise<string> {
  try {
    const html = await codeToHtml(code, {
      lang: language,
      theme: 'github-dark',
      transformers: [
        {
          pre(node) {
            // Convert pre to inline span for inline code
            node.tagName = 'code';
            node.properties.class = 'inline-code bg-neutral-800 text-neutral-200 px-1.5 py-0.5 rounded text-sm font-mono';
          }
        }
      ]
    });
    // Remove the outer structure and just return the content
    return html.replace(/<pre[^>]*>|<\/pre>/g, '').replace(/<code[^>]*>|<\/code>/g, '');
  } catch (error) {
    console.error('Error highlighting inline code:', error);
    return `<code class="inline-code bg-neutral-800 text-neutral-200 px-1.5 py-0.5 rounded text-sm font-mono">${escapeHtmlServer(code)}</code>`;
  }
}

export async function parseAndHighlightContent(content: string): Promise<string> {
  let processedContent = content;

  // First, handle code blocks (```language\ncode```)
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const blockMatches = Array.from(content.matchAll(codeBlockRegex));

  // Process block matches in reverse order to maintain string indices
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

  // Then handle inline code (`code`)
  const inlineCodeRegex = /`([^`\n]+)`/g;
  const inlineMatches = Array.from(processedContent.matchAll(inlineCodeRegex));

  // Process inline matches in reverse order
  for (let i = inlineMatches.length - 1; i >= 0; i--) {
    const match = inlineMatches[i];
    const [fullMatch, code] = match;
    const startIndex = match.index!;
    const endIndex = startIndex + fullMatch.length;

    const inlineCode = `<code class="inline-code bg-neutral-800 text-neutral-200 px-1.5 py-0.5 rounded text-sm font-mono">${escapeHtmlServer(code)}</code>`;

    processedContent =
      processedContent.slice(0, startIndex) +
      inlineCode +
      processedContent.slice(endIndex);
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