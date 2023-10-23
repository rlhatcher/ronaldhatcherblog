"use client";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CoverImage({
  title,
  image,
  slug,
  className,
}: {
  title: string;
  image: string;
  slug?: string;
  className?: string | undefined;
}) {

  const theImage = (
    <CldImage
      width="900"
      height="1600"
      src={image}
      sizes="100vw"
      alt="Description of my image"
      className={className}
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
