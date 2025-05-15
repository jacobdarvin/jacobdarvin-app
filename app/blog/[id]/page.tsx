// import { Post as PostType } from "@/types/post";
// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { ChevronLeft, Box } from "lucide-react";
// import { Young_Serif } from "next/font/google";
// import { calculateReadTime, formatTimestamp } from "@/lib/utils";

// const youngSerif = Young_Serif({
//   subsets: ["latin"],
//   weight: ["400"],
// });

// type Params = {
//   params: Promise<{ id: string }>;
// };

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// async function getPost(id: string) {
//   try {
//     const res = await fetch(`${API_BASE_URL}/api/blog/${id}`, {
//       method: "GET",
//       cache: "force-cache",
//     });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch data: ${res.statusText}`);
//     }

//     return await res.json();
//   } catch (error) {
//     console.error(error);
//     return {
//       id: "",
//       title: "Post not found",
//       content: "We couldn't find the post you're looking for.",
//       created_at: { _seconds: Date.now() / 1000, _nanoseconds: 0 },
//       image: "",
//     };
//   }
// }

// export default async function BlogIdPage(props: Params) {
//   const params = await props.params;
//   const id = params.id;

//   const post: PostType = await getPost(id);
//   const date = formatTimestamp(post.created_at);
//   const readTime = calculateReadTime(post.content);

//   // Split content into paragraphs for better rendering
//   const paragraphs = post.content.split("\n\n").filter((p) => p.trim() !== "");

//   return (
//     <div className="min-h-screen bg-black text-white py-8 md:py-16">
//       <div className="container mx-auto px-4 max-w-4xl">
//         <Link
//           href="/blog"
//           className="text-white/80 hover:text-white transition-colors flex items-center mb-10"
//         >
//           <ChevronLeft className="w-4 h-4 mr-1" />
//           Back to blog
//         </Link>

//         <article>
//           <header className="mb-8">
//             <h1 className={`${youngSerif.className} text-3xl md:text-5xl mb-4`}>
//               {post.title}
//             </h1>
//             <div className="flex items-center text-gray-400 mb-6">
//               <time>{date}</time>
//               <span className="mx-2">•</span>
//               <span>{readTime}</span>
//             </div>

//             {post.image && (
//               <div className="mb-8">
//                 <Image
//                   src={post.image}
//                   alt={post.title}
//                   width={1200}
//                   height={600}
//                   className="w-full rounded-xl"
//                   priority
//                 />
//               </div>
//             )}
//           </header>

//           <div className="prose prose-lg prose-invert max-w-none">
//             {paragraphs.map((paragraph, index) => (
//               <p key={index} className="text-white/90 mb-6 leading-relaxed">
//                 {paragraph}
//               </p>
//             ))}
//           </div>
//         </article>

//         <div className="mt-12 pt-8 border-t border-neutral-800">
//           <div className="flex items-center">
//             <div className={`${youngSerif.className} text-xl md:text-2xl mr-2`}>
//               Jacob&apos;s Life Box
//             </div>
//             <Box className="w-5 h-5" />
//           </div>
//           <p className="text-white/70 mt-2">
//             Thank you for reading! Check out more stuff from my blog.
//           </p>
//           <Link
//             href="/blog"
//             className="inline-block mt-4 bg-white/10 hover:bg-white/15 transition-colors py-2 px-5 rounded-full border border-neutral-800"
//           >
//             More entries
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
