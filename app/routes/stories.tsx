import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useLocation } from "@remix-run/react";
import { useState } from "react";
import Story from "~/components/Story";
import { client } from "~/data/client";
import GetHighlighted from "~/data/GetHighlighted";
import GetStories from "~/data/GetStories";
import type IStory from "~/data/Story";
import { filterStories } from "~/helpers/filterStories";
import { motion } from "framer-motion";

interface LoaderData {
  stories: IStory[];
  highlighted: IStory[];
}

export const loader: LoaderFunction = async () => {
  const { stories }: { stories: IStory[] } = await client.request(GetStories);
  const { stories: highlighted }: { stories: IStory[] } = await client.request(
    GetHighlighted
  );
  return json(
    { stories, highlighted },
    {
      headers: {
        "Cache-Control": "s-maxage:60, stale-while-revalidate"
      }
    }
  );
};

export default function Stories() {
  const [searchString, setSearch] = useState("");
  const { stories, highlighted } = useLoaderData<LoaderData>();

  return (
    <>
      <section className="top-section">
        <div className="tilted-header">
          <h1 className="uppercase mb-4">Stories</h1>
        </div>
        <div className="mx-auto max-w-prose">
          {highlighted.map((story) => (
            <Story story={story} key={story.id} />
          ))}

          <div className="px-2 mt-4">
            <h5 className="mb-2">ALL STORIES</h5>
            <div
              className="
            border border-gray-700
            dark:border-gray-200
            rounded-lg
            flex
            items-center
            px-3
            py-2
            focus-within:ring-2 focus-within:ring-red-300
            dark:focus-within:ring-indigo-300
            mb-6
          "
            >
              <i className="bi bi-search mr-4"></i>
              <input
                type="text"
                placeholder="Search stories..."
                className="flex-grow focus:outline-none"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-start">
            {filterStories(stories, searchString).map((story) => (
              <Story story={story} key={story.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
