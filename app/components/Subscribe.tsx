import { useFetcher } from "@remix-run/react";
import React from "react";

export const Subscribe: React.FC<{
  refLink?: string;
  noPreamble?: boolean;
}> = ({ refLink, noPreamble }) => {
  const { Form, submission, data } = useFetcher();

  const formState = submission
    ? "submitting"
    : data?.subscribed
    ? "success"
    : data?.error
    ? "error"
    : "idle";

  console.log(data);

  return (
    <div className="bg-black bg-opacity-5 dark:bg-opacity-20 px-10 py-8 rounded-2xl mb-8">
      {noPreamble ? (
        <>
          <h2 className="mb-2 text-3xl uppercase">
            Subscribe to my newsletter
          </h2>
          <p>
            Each week, I share my latest post along with three other works from
            people smarter than me on whatever topic is top of mind. Of course,
            you can unsubscribe at anytime.
          </p>

          <hr className="opacity-20 border-black dark:border-white my-6 w-3/4 mx-auto" />
        </>
      ) : (
        <>
          <h2 className="mb-2 text-3xl">LET'S KEEP THE CONVERSATION GOING</h2>
          <p>
            If this article has been valuable and you'd like to be notified the
            next time I post, subscribe to my newsletter!
          </p>
          <p>
            Each week, I share my latest post along with three other works from
            people smarter than me on whatever topic is top of mind. Of course,
            you can unsubscribe at anytime.
          </p>

          <hr className="opacity-20 border-black dark:border-white my-6 w-3/4 mx-auto" />
        </>
      )}

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
          <input hidden aria-hidden readOnly value={refLink} />
          <Honeypot />
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

// Form field used to catch spammers
export const Honeypot = () => (
  <label
    htmlFor="last_name"
    aria-hidden="true"
    className="hidden"
    aria-label="Hey friend, if you're human, don't fill this out. It's only to catch spammers."
  >
    Last Name
    <input
      type="text"
      name="last_name"
      id="last_name"
      className="hidden"
      autoComplete="off"
    />
  </label>
);
