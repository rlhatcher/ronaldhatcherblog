import { CogIcon, BeakerIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import FeatureList from "./feature-list";

interface Feature {
  name: string;
  description: string;
  icon: React.ElementType;
  href: string;
}

const features: Feature[] = [
  {
    name: "Projects",
    description:
      "This section highlights my explorations in both rocketry and robotics. From the initial concept to the final implementation, these contents address the inspiration, design thinking, research, coding, and engineering principles.",
    href: "/projects",
    icon: BeakerIcon,
  },
  {
    name: "Builds and Techniques",
    description:
      "For those interested in the tangible aspects of rocketry and robotics, this section provides a detailed look into the assembly and testing processes. All of my hands-on work, along with the challenges faced and lessons learned.",
    href: "/builds",
    icon: CogIcon,
  },
  {
    name: "Thoughts and Documents",
    description: "A curated repository of supplementary resources. Whether you're a beginner or looking to deepen your knowledge, these documents offer guides, schematics, and academic insights into the fields of rocketry and robotics.",
    href: "documents",
    icon: BookOpenIcon,
  },
];

export default function FeatureSection() {
  return (
    <div className="bg-gray-100 rounded-xl pt-4 sm:pt-4">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:mx-0 ">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Resources for rockets, robots and ... something else that starts
            with an R
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Welcome to my (semi) structured repository of projects and
            explorations I've undertaken and am undertaking. I have grouped
            things around projects and builds to give those perspectives with
            general thoughts and documents grouped separately but linked to the
            projects and builds they relate to.
          </p>
        </div>
        <div className="mx-auto max-w-2xl sm:mt-4 lg:mt-6 lg:max-w-none">
          <FeatureList features={features} />
        </div>
      </div>
    </div>
  );
}
