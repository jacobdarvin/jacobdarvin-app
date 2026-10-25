export default function LogPostLoading() {
  return (
    <div aria-busy="true" aria-label="Loading entry" className="px-4 md:px-8">
      <div className="mx-auto aspect-4/3 w-full max-md:aspect-auto max-md:h-[calc(100svh-6rem)] max-w-[calc((100svh-6rem)*4/3)] bg-card" />
      <div className="mx-auto max-w-[65ch] pt-16">
        <div className="h-14 w-3/4 bg-card" />
        <div className="mt-4 h-5 w-48 bg-card" />
      </div>
    </div>
  );
}
