import { CogIcon, BeakerIcon, BookOpenIcon } from "@heroicons/react/24/outline";

const features = [
  {
    name: "Projects",
    description:
      "This section highlights my explorations in both rocketry and robotics. From the initial concept to the final implementation, these contents address the inspiration, design thinking, research, coding, and engineering principles.",
    href: "#",
    icon: BeakerIcon,
  },
  {
    name: "Builds and Techniques",
    description:
      "For those interested in the tangible aspects of rocketry and robotics, this section provides a detailed look into the assembly and testing processes. All of my hands-on work, along with the challenges faced and lessons learned.",
    href: "#",
    icon: CogIcon,
  },
  {
    name: "Thoughts and Documents",
    description: "A curated repository of supplementary resources. Whether you're a beginner or looking to deepen your knowledge, these documents offer guides, schematics, and academic insights into the fields of rocketry and robotics.",
    href: "#",
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
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none bg-gray-100 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon
                    className="h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a
                      href={feature.href}
                      className="text-sm font-semibold leading-6 text-blue-600"
                    >
                      Go There<span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
