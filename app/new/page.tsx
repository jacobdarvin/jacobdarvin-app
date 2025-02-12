import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProfileHeader } from "@/components/kcard/profile-header";
import { SocialLink } from "@/components/kcard/social-links";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Quote } from "@/components/kcard/quote";
import { LongGallery, SquareGallery } from "@/components/kcard/gallery";
import { Text, SmallText } from "@/components/kcard/text";

export default function NewPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
      <Card className="w-full max-w-2xl">
        <ScrollArea className="h-[80vh]">
          <CardHeader>
            <ProfileHeader />
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <SocialLink
                icon={SiGithub}
                label="GitHub"
                username="@jacobdarvin"
                href="https://github.com/jacobdarvin"
              />
              <SocialLink
                icon={SiLinkedin}
                label="LinkedIn"
                username="jacob-darvin"
                href="https://linkedin.com/in/jacob-darvin"
              />
            </div>
            <LongGallery
              image={{
                src: "/soothe.gif",
                alt: "Featured Image",
                width: 1080,
                height: 1080,
              }}
            />
            <div className="grid grid-cols-2 gap-4">
              <SquareGallery
                image={{
                  src: "/download.gif",
                  alt: "Square Image 1",
                  width: 500,
                  height: 500,
                }}
              />
              <SquareGallery
                image={{
                  src: "/milk.gif",
                  alt: "Square Image 2",
                  width: 500,
                  height: 500,
                }}
              />
            </div>
            <Quote
              text="The best way to predict the future is to invent it."
              author="Alan Kay"
              href="https://example.com"
            />
            <Text content="A few things I think we can add, Links, long images, squares, text. I can provide a list for these components." />
            <SmallText content="And more than anything in this world, I am human." />
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}
