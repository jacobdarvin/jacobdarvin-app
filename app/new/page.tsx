import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { SiGithub, SiLinkedin } from "react-icons/si";

export default function NewPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
      <Card className="w-full max-w-2xl">
        <ScrollArea className="h-[80vh]">
          <CardHeader className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src="/me.jpeg" alt="Jacob Darvin" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-2xl font-bold">Jacob Darvin</h2>
              <p className="text-muted-foreground">Designer @ Ckard</p>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col p-4 bg-neutral-50 border rounded-lg">
                <span className="flex items-center gap-2 text-xl font-bold">
                  <SiGithub />
                  GitHub
                </span>
                <span className="text-muted-foreground">@jacobdarvin</span>
              </div>
              <div className="flex flex-col p-4 bg-neutral-50 border rounded-lg">
                <span className="flex items-center gap-2 text-xl font-bold">
                  <SiLinkedin />
                  LinkedIn
                </span>
                <span className="text-muted-foreground">jacob-darvin</span>
              </div>
            </div>
            <div className="col-span-full bg-muted rounded-lg">
              <Image
                width={1080}
                height={1080}
                src="/soothe.gif"
                alt="Featured Image"
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <Image
                  width={500}
                  height={500}
                  src="/download.gif"
                  alt="Square Image 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <Image
                  width={500}
                  height={500}
                  src="/milk.gif"
                  alt="Square Image 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <a
              href="https://example.com"
              className="block p-4 bg-neutral-50 border rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <blockquote className="text-sm text-muted-foreground italic">
                &quot;The best way to predict the future is to invent it.&quot;
              </blockquote>
              <div className="mt-2 text-sm font-medium">— Alan Kay</div>
            </a>
            <div className="relative rounded-lg p-4 overflow-hidden">
              <p className="relative text-xl leading-relaxed text-balance">
                A few things I think we can add, Links, long images, squares,
                text. I can provide a list for these components.
              </p>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              And more than anything in this world, I am human.
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}
