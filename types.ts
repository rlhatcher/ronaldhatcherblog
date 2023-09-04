export interface Feature {
  name: string;
  description: string;
  href: string;
  icon: {
    url: string;
  };
}

export interface Project {
  title: string;
  overview: string;
  images: string[];
  slug: string;
  author?: {
    name: string;
    picture: {
      url: string;
    };
  };
}

export interface ProjectCardProps {
  project: Project;
}
