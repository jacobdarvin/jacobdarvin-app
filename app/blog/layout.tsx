export default function BlogLayout({ children }: LayoutProps<"/blog">) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:py-20">{children}</div>
  );
}
