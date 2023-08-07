import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useLocation } from "@remix-run/react";
import { client } from "~/data/client";
import GetStoriesByTag from "~/data/GetStoriesByTag";
import type IStory from "~/data/Story";
import { metaTags } from "~/helpers/metaTags";
import LifeAni from "../animations/LifeAni";
import Me from "../animations/Me";
import ProductAni from "../animations/ProductAni";
import VideoAni from "../animations/VideoAni";
import StoriesSection from "../components/StoriesSection";

interface LoaderData {
  productStories: IStory[];
  videoStories: IStory[];
  lifeStories: IStory[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const { stories: productStories }: { stories: IStory[] } =
    await client.request(GetStoriesByTag, {
      tags: ["software", "design"]
    });
  const { stories: videoStories }: { stories: IStory[] } = await client.request(
    GetStoriesByTag,
    {
      tags: ["video", "entrepreneurship"]
    }
  );
  const { stories: lifeStories }: { stories: IStory[] } = await client.request(
    GetStoriesByTag,
    {
      tags: ["life"]
    }
  );

  return json(
    { productStories, videoStories, lifeStories },
    {
      headers: {
        "Cache-Control": "s-maxage:60, stale-while-revalidate"
      }
    }
  );
};

export default function Index() {
  const { productStories, lifeStories, videoStories } =
    useLoaderData<LoaderData>();
  const { key } = useLocation();
  return (
    <>
      <div>
        <section className="h-screen top-section">
          <div className="h-full relative flex flex-col items-center">
            <div className="tilted-header flex-grow-0">
              <div>
                <h5>HEY, FRIEND 👋</h5>
                <h2>MY NAME’S DREW</h2>
              </div>
            </div>
            <div className="flex justify-center flex-grow w-full pb-4">
              <Me />
            </div>
            <div className="flex-grow-0 flex flex-col items-center text-gray-500 pb-2">
              <div className="header-font text-sm uppercase">scroll down</div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 5a5 5 0 0 1 10 0v6a5 5 0 0 1-10 0V5zm5.5-1.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2z" />
                </svg>
              </div>
            </div>
          </div>
        </section>
        <section className="h-screen flex flex-col items-center justify-center">
          <div>
            <div className="tilted-header mb-6">
              <h3>I{"'"}M A...</h3>
            </div>
            <div className="pt-4 flex flex-col items-center space-y-12">
              <ProductAni link="#product" />
              <div className="pt-2">
                <h4 className="leading-0.75 inline-block uppercase">AND</h4>
              </div>
              <VideoAni link="#video" />
              <div className="pt-2">
                <h4 className="leading-0.75 inline-block uppercase">in</h4>
              </div>
              <LifeAni link="#life" />
            </div>
          </div>
        </section>
        <StoriesSection
          animation={<ProductAni />}
          label={"I'm a..."}
          id={"product"}
          stories={productStories}
        >
          <p>
            I love designing and developing digital products -{" "}
            <a
              href="https://join.lumastic.com"
              target="_blank"
              className="wave-border bottom"
              rel="noreferrer"
            >
              primarily for creators
            </a>
            . I{"'"}m always learning new skills to help bring my ideas to life.
          </p>
          <p>Here are some of my latest learnings:</p>
        </StoriesSection>
        <StoriesSection
          animation={<VideoAni />}
          label={"I'm an..."}
          id={"video"}
          stories={videoStories}
        >
          <p>
            I love telling stories about the intersection of the social internet
            and entrepreneurship.
          </p>
          <p>
            Here are the latest stories from my blog and{" "}
            <a
              className="wave-border bottom"
              rel="noreferrer"
              href="https://www.youtube.com/c/Curiository"
              target="_blank"
            >
              YouTube channel
            </a>
            :
          </p>
        </StoriesSection>
        <StoriesSection
          animation={<LifeAni />}
          label={"living in..."}
          id={"life"}
          stories={lifeStories}
        >
          <p>
            Home to me is being in the Blue Ridge Mountains with my girlfriend
            and my dog. Outside of work, I love board sports, cooking, and
            playing music with friends.
          </p>
          <p>Here are some of my latest life adventures:</p>
        </StoriesSection>
      </div>
    </>
  );
}
