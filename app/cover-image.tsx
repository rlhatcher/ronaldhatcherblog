'use client';
import { CldImage } from 'next-cloudinary';
import Link from "next/link";

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CoverImage({
  title,
  image,
  slug,
}: {
  title: string;
  image: any;
  slug?: string;
}) {
  const theImage = (
    <CldImage
      width="960"
      height="600"
      src={image.public_id}
      sizes="100vw"
      alt="Description of my image"
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {theImage}
        </Link>
      ) : (
        theImage
      )}
    </div>
  );
}
