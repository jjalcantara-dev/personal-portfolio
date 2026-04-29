"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ScrollAnimation from "@/components/ScrollAnimation";

type Person = {
  name: string;
  role: string;
  url: string;
  linkLabel: string;
  linkedinUrl: string;
  image: string;
  description: string;
};

type Props = {
  people: Person[];
  visitLabel: string;
};

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const LinkedInIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const linkClass = "inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-300 hover:border-black hover:-translate-y-px hover:shadow-md transition-all duration-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2";

export default function CollabList({ people, visitLabel }: Props) {
  const [list, setList] = useState(people);

  useEffect(() => {
    setList((prev) => [...prev].sort(() => Math.random() - 0.5));
  }, []);

  return (
    <ul className="space-y-12 list-none m-0 p-0">
      {list.map((person, index) => {
        const isLinkedIn = person.url.includes("linkedin.com");
        return (
          <ScrollAnimation key={person.url} animation="fade-up" delay={200 + index * 100}>
            <li className="border-b border-gray-200 pb-12 last:border-b-0 last:pb-0">
              <article className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
                <div className="flex-shrink-0">
                  {person.image ? (
                    <Image
                      src={person.image}
                      alt={person.name}
                      width={96}
                      height={96}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 text-xl sm:text-2xl font-light tracking-wide"
                      aria-hidden="true"
                    >
                      {getInitials(person.name)}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-medium text-black mb-2">
                    {person.name}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span className="inline-flex items-center">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                      {person.role}
                    </span>
                  </div>
                  {person.description && (
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                      {person.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3 mt-4">
                    <a
                      href={person.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                      aria-label={`${visitLabel}: ${person.name}`}
                    >
                      {isLinkedIn ? <LinkedInIcon /> : <GlobeIcon />}
                      <span className="text-sm font-medium text-black">
                        {person.linkLabel}
                      </span>
                    </a>
                    {person.linkedinUrl && (
                      <a
                        href={person.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                        aria-label={`LinkedIn: ${person.name}`}
                      >
                        <LinkedInIcon />
                        <span className="text-sm font-medium text-black">LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </li>
          </ScrollAnimation>
        );
      })}
    </ul>
  );
}
