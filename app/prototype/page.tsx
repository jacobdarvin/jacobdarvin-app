"use client";

import React, { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProfileHeader } from "@/components/kcard/profile-header";
import { SocialLink, SocialLinkProps } from "@/components/kcard/social-links";
import { LongGallery, LongGalleryProps } from "@/components/kcard/gallery";
import { SquareGallery, SquareGalleryProps } from "@/components/kcard/gallery";
import { Quote, QuoteProps } from "@/components/kcard/quote";
import { Text, SmallText, TextProps } from "@/components/kcard/text";
import { SiGithub } from "react-icons/si";
import { GripVertical } from "lucide-react";
import { IconType } from "react-icons";

type ComponentProps = {
  icon?: IconType;
  label?: string;
  username?: string;
  href?: string;
  image?: { src: string; alt: string; width: number; height: number };
  text?: string;
  author?: string;
  content?: string;
};

interface Block {
  type: string;
  span: number;
  props: ComponentProps;
}
const COMPONENT_OPTIONS = [
  {
    type: "social",
    label: "Social Link",
    span: 1,
    props: {
      icon: SiGithub,
      label: "GitHub",
      username: "@username",
      href: "https://github.com",
    },
  },
  {
    type: "long-gallery",
    label: "Long Gallery",
    span: 2,
    props: {
      image: {
        src: "/soothe.gif",
        alt: "Gallery Image",
        width: 1080,
        height: 1080,
      },
    },
  },
  {
    type: "square-gallery",
    label: "Square Gallery",
    span: 1,
    props: {
      image: {
        src: "/download.gif",
        alt: "Square Image",
        width: 500,
        height: 500,
      },
    },
  },
  {
    type: "quote",
    label: "Quote",
    span: 2,
    props: {
      text: "Add your quote here",
      author: "Author Name",
      href: "#",
    },
  },
  {
    type: "text",
    label: "Text Block",
    span: 2,
    props: {
      content: "Add your text here",
    },
  },
  {
    type: "small-text",
    label: "Small Text",
    span: 2,
    props: {
      content: "Add your small text here",
    },
  },
];

export default function TemplatePage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const dropZoneRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (dropZoneRef.current && sidebarRef.current) {
      // Sidebar sortable
      new Sortable(sidebarRef.current, {
        group: {
          name: "components",
          pull: "clone",
          put: false,
        },
        sort: false,
        animation: 150,
        onClone: (evt) => {
          const item = evt.item;
          const type = item.dataset.componentType;
          const component = COMPONENT_OPTIONS.find((c) => c.type === type);
          if (component) {
            item.dataset.span = component.span.toString();
          }
        },
      });

      // Drop zone sortable
      new Sortable(dropZoneRef.current, {
        group: {
          name: "components",
          pull: true,
          put: true,
        },
        animation: 150,
        ghostClass: "opacity-50",
        handle: ".drag-handle",
        onAdd: (evt) => {
          const type = evt.item.dataset.componentType;
          const component = COMPONENT_OPTIONS.find((c) => c.type === type);
          if (component) {
            setBlocks((prev) => {
              const newBlocks = [...prev];
              newBlocks.splice(evt.newIndex ?? prev.length, 0, {
                type: component.type,
                span: component.span,
                props: component.props,
              });
              return newBlocks;
            });
          }
          evt.item.remove(); // Remove the temporary DOM element
        },
        onUpdate: (evt) => {
          setBlocks((prev) => {
            const newBlocks = [...prev];
            const [movedBlock] = newBlocks.splice(evt.oldIndex ?? 0, 1);
            newBlocks.splice(evt.newIndex ?? newBlocks.length, 0, movedBlock);
            return newBlocks;
          });
        },
      });
    }
  }, []);

  const renderComponent = (type: string, props: ComponentProps) => {
    switch (type) {
      case "social":
        if (props.icon && props.label && props.username && props.href) {
          return <SocialLink {...(props as SocialLinkProps)} />;
        }
        return null;
      case "long-gallery":
        if (props.image) {
          return <LongGallery {...(props as LongGalleryProps)} />;
        }
        return null;
      case "square-gallery":
        if (props.image) {
          return <SquareGallery {...(props as SquareGalleryProps)} />;
        }
        return null;
      case "quote":
        if (props.text && props.author && props.href) {
          return <Quote {...(props as QuoteProps)} />;
        }
        return null;
      case "text":
        if (props.content) {
          return <Text {...(props as TextProps)} />;
        }
        return null;
      case "small-text":
        if (props.content) {
          return <SmallText {...(props as TextProps)} />;
        }
        return null;
      default:
        return null;
    }
  };

  const BlockWrapper = ({
    children,
    type,
    className = "",
  }: {
    children: React.ReactNode;
    type: string;
    className?: string;
  }) => (
    <div className={`group relative ${className}`} data-block={type}>
      <div className="absolute left-0 top-0 bottom-0 -ml-8 w-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="drag-handle cursor-grab active:cursor-grabbing p-2">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen flex">
      {/* Component Sidebar */}
      <div className="w-64 border-r bg-white p-4">
        <h2 className="font-bold mb-4">Components</h2>
        <div ref={sidebarRef} className="space-y-2">
          {COMPONENT_OPTIONS.map((component, index) => (
            <div
              key={index}
              className="p-3 border rounded-lg bg-neutral-50 cursor-move hover:bg-neutral-100"
              data-component-type={component.type}
            >
              {component.label}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Card className="w-full max-w-2xl mx-auto">
          <ScrollArea className="h-[80vh]">
            <CardHeader>
              <ProfileHeader />
            </CardHeader>
            <CardContent>
              <div ref={dropZoneRef} className="grid grid-cols-2 gap-4 pl-8">
                {blocks.map((block, index) => (
                  <BlockWrapper
                    key={index}
                    type={block.type}
                    className={block.span === 2 ? "col-span-2" : ""}
                  >
                    {renderComponent(block.type, block.props)}
                  </BlockWrapper>
                ))}
              </div>
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
