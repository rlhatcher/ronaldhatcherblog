type Meta = {
  id: string,
  title: string,
  date: string,
  tags: string[],
}

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

export interface Build {
  title: string;
  project: {
    overview: string;
    slug: string;
    title: string;
    images: string[];
  };
  stepCollection: {
    items: Step[];
  };
  slug: string;
  description: string;
  images: string[];
}

export interface Step {
  step: number;
  title: string;
  description: any;
  images: any[];
  content: any;
}