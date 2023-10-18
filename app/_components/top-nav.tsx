import React from 'react';
import Link from "next/link";

interface Link {
    href: string;
    label: string;
}

interface Props {
    links: Link[];
    page: {
        title: string;
    };
}

const TopNav: React.FC<Props> = ({ links, page }) => {
    return (
        <section className="flex-col md:flex-row flex font-mono items-center md:justify-between mt-2 mb-2 md:mb-2">
            <h1 className="text-xl md:text-3xl font-bold tracking-tighter leading-tight md:pr-8">
                {links.map((link, index) => (
                    <React.Fragment key={index}>
                        <Link href={link.href} className="hover:underline">{link.label}</Link>
                        <span className="mx-0">.</span>
                    </React.Fragment>
                ))}
            </h1>
            <h2 className="text-center md:text-left text-xl mt-2 md:pl-8">
                {page.title}
            </h2>
        </section>
    );
};

export default TopNav;
