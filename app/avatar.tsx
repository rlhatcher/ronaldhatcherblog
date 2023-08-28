import ContentfulImage from "@/lib/contentful-image";

export default function Avatar({
  name,
  picture,
}: {
  name: string;
  picture: any;
}) {
  return (
    <div className="flex gap-x-2.5">
      <ContentfulImage
        alt={name}
        className="h-6 w-6 flex-none rounded-full bg-white/10"
        // className="object-cover h-full rounded-full"
        height={48}
        width={48}
        src={picture.url}
      />
      {name}
    </div>
  );
}
