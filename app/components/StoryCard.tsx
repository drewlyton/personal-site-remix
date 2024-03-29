import { Link } from "@remix-run/react";
import classNames from "classnames";
import React from "react";
import { imageBuilder } from "~/helpers/imageBuilder";
import { Post } from "~/data/types";
import routes from "../helpers/routes";
import { truncateString } from "../helpers/truncateString";

const StoryCard: React.FC<Props> = ({ story }) => {
  return (
    <div className="post-item relative px-2 py-4 flex-grow">
      <Link to={routes.story(story.slug)}>
        <div
          className={classNames("mb-4 rounded-2xl overflow-hidden relative", {
            featured: story.tags.find((t) => t.title === "highlighted")
          })}
        >
          <img
            className="w-full"
            src={imageBuilder.image(story.mainImage).url()}
            alt={`${story.title}`}
            loading="lazy"
          />
        </div>
        <h4 className="leading-none header-font uppercase">{story.title}</h4>
        <div className="text-gray-500 mb-2 text-xs dark:text-gray-300">
          <em>
            {new Date(story.publishedAt).toLocaleString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </em>
        </div>
        <p className="text-black dark:text-white leading-7">
          {truncateString(story.description, 120)}
        </p>
      </Link>
    </div>
  );
};

type Props = {
  story: Post;
};

export default StoryCard;
