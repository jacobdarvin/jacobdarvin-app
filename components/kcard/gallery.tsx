import Image from "next/image";

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface LongGalleryProps {
  image: GalleryImage;
}

export interface SquareGalleryProps {
  image: GalleryImage;
}

export function LongGallery({ image }: LongGalleryProps) {
  return (
    <div className="col-span-full bg-muted rounded-lg">
      <Image
        width={image.width}
        height={image.height}
        src={image.src}
        alt={image.alt}
        className="w-full h-48 object-cover rounded-md"
      />
    </div>
  );
}

export function SquareGallery({ image }: SquareGalleryProps) {
  return (
    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
      <Image
        width={image.width}
        height={image.height}
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
