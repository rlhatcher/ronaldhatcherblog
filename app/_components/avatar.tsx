import ContentfulImage from "@/lib/contentful-image";

interface AvatarProps {
  name: string;
  picture: {
    url: string;
  };
}

export default function Avatar({ name, picture }: AvatarProps) {
  return (
    <div className="flex gap-x-2.5">
      <ContentfulImage
        alt={name}
        className="h-6 w-6 flex-none rounded-full bg-white/10"
        height={48}
        width={48}
        src={picture.url}
      />
      {name}
    </div>
  );
}