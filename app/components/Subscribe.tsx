import { useFetcher } from "@remix-run/react";
import React from "react";

export const Subscribe: React.FC = () => {
  const { Form, submission, data } = useFetcher();

  const formState = submission
    ? "submitting"
    : data?.subscription
    ? "success"
    : data?.error
    ? "error"
    : "idle";

  return (
    <div className="bg-black bg-opacity-5 dark:bg-opacity-20 px-10 py-8 rounded-2xl mb-8">
      <h2 className="mb-2 text-3xl">LET'S KEEP THE CONVERSATION GOING</h2>
      {/* <p>
        I write these essays for myself. However, I hope that by sharing the
        things I'm learning with others, we all can become a better
        entrepreneurs, communicators and internet citizens.
      </p> */}
      <p>
        If this article has been valuable and you'd like to be notified the next
        time I post, you can subscribe to my newsletter,{" "}
        <a
          target={"_blank"}
          rel="noreferrer"
          className="italic font-bold wave-border bottom dotted"
          href="https://www.getrevue.co/profile/realizingthought"
        >
          Realizing Thought
        </a>
        .
      </p>
      <p>
        Each week, I share my latest post along with three other works from
        people smarter than me on whatever topic is top of mind. Of course, you
        can unsubscribe at anytime.
      </p>

      <hr className="opacity-20 border-black dark:border-white my-6 w-3/4 mx-auto" />

      <Form
        action="/newsletter/subscribe"
        method="post"
        className={formState === "success" ? "hidden" : ""}
      >
        <fieldset disabled={formState === "submitting"} className="flex">
          <input
            type="email"
            name="email"
            placeholder="Your email..."
            className="px-4 py-3 rounded-md flex-1 mr-2"
          />
          <button type="submit">
            {formState === "submitting" ? "Subscribing..." : "Subscribe"}
          </button>
        </fieldset>
      </Form>
      <p className="text-center text-xl">
        {formState === "success" &&
          "✅ Thanks for subscribing! Check your email to confirm your subscription."}
        {formState === "error" &&
          "🚨 Hmmm...something went wrong, please try again later."}
      </p>
    </div>
  );
};
