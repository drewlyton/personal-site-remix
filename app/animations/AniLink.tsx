import classNames from "classnames";
import React from "react";
import type { AniComp } from "./AniComp";

const AniLink: React.FC<AniComp> = ({ link, children }) => {
  return (
    <a
      href={link || undefined}
      className={classNames({ ["wave-border bottom inline-block"]: link })}
    >
      {children}
    </a>
  );
};

export default AniLink;
