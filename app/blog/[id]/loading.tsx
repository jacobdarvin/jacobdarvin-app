import { BackLink } from "@/components/BackLink";

const lineWidths = [
  "w-full",
  "w-full",
  "w-11/12",
  "w-full",
  "w-5/6",
  "w-full",
  "w-4/5",
  "w-3/4",
];

export default function BlogPostLoading() {
  return (
    <>
      <BackLink href="/blog">Back to blog</BackLink>

      <div aria-busy="true" aria-label="Loading post" className="animate-pulse">
        <div className="mb-4 h-12 max-w-2xl rounded-lg bg-muted md:h-16" />
        <div className="mb-8 h-4 w-48 rounded-full bg-muted" />
        <div className="mb-8 h-64 w-full rounded-xl bg-muted md:h-96" />
        <div className="space-y-6">
          {lineWidths.map((width, i) => (
            <div key={i} className={`h-4 rounded-full bg-muted ${width}`} />
          ))}
        </div>
      </div>
    </>
  );
}
