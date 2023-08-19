import React, { cloneElement, PropsWithChildren, ReactElement } from "react";
import type Story from "../data/Story";
import StoryCard from "./Story";

interface Props extends PropsWithChildren {
  label: string;
  id: string;
  animation: ReactElement;
  stories: Story[];
}

const StoriesSection: React.FC<Props> = ({
  label,
  id,
  stories,
  animation,
  children
}) => {
  return (
    <section id={id} className="pb-16 max-w-prose mx-auto">
      <div className="tilted mb-8">
        <div className="space-y-1">
          <h5 className="uppercase">{label}</h5>
          {cloneElement(animation)}
        </div>
      </div>
      <div
        className="prose md:prose-lg
        lg:prose-xl
        dark:prose-invert mb-2"
      >
        {children}
      </div>
      <div className="flex flex-wrap items-start">
        {stories.map((story) => (
          <StoryCard story={story} key={story.id} />
        ))}
      </div>
    </section>
  );
};

export default StoriesSection;
