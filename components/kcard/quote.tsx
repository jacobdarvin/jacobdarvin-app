export interface QuoteProps {
  text: string;
  author: string;
  href: string;
}

export function Quote({ text, author, href }: QuoteProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-neutral-50 border rounded-lg hover:shadow-lg transition-all hover:-translate-y-1 hover:bg-white"
    >
      <blockquote className="text-sm text-muted-foreground italic">
        &quot;{text}&quot;
      </blockquote>
      <div className="mt-2 text-sm font-medium">— {author}</div>
    </a>
  );
}
