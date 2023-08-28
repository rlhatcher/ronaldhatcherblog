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
  image: any;
  slug?: string;
  className?: string | undefined;
}) {
  const theClassName = className
    ? className
    : "shadow-small hover:shadow-medium transition-shadow duration-200";

  const theImage = (
    <CldImage
      width="3000"
      height="2000"
      src={image.public_id}
      sizes="100vw"
      alt="Description of my image"
      className={theClassName}
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
