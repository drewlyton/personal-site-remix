import { Tailwind } from "@react-email/tailwind";
import type { PropsWithChildren } from "react";

export const TailwindEmailConfig: React.FC<PropsWithChildren> = ({
  children
}) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              bgMidnight: "#192230",
              bgApache: "#fff8f1"
            },
            spacing: {
              13: "3.25rem"
            },
            rotate: {
              "-0.25": "-0.25deg",
              "-0.5": "-0.5deg"
            },
            lineHeight: {
              0.75: "0.75"
            },
            height: {
              124: "28rem"
            }
          }
        }
      }}
    >
      {children}
    </Tailwind>
  );
};
