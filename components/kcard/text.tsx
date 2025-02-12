interface TextProps {
  content: string;
}

export function Text({ content }: TextProps) {
  return (
    <div className="relative rounded-lg p-4 overflow-hidden">
      <p className="relative text-xl leading-relaxed text-balance">{content}</p>
    </div>
  );
}

export function SmallText({ content }: TextProps) {
  return (
    <div className="text-center text-sm text-muted-foreground">{content}</div>
  );
}
