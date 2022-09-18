import React, { cloneElement, PropsWithChildren, ReactElement } from "react";
import type IStory from "../data/Story";
import Story from "./Story";

interface Props extends PropsWithChildren {
  label: string;
  id: string;
  animation: ReactElement;
  stories: IStory[];
}

const StoriesSection: React.FC<Props> = ({
  label,
  id,
  stories,
  animation,
  children,
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
          <Story story={story} key={story.id} />
        ))}
      </div>
    </section>
  );
};

export default StoriesSection;
