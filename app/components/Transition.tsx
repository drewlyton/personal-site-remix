import { useOutlet, useTransition } from "@remix-run/react";
import React, { PropsWithChildren } from "react";

const Transition: React.FC<PropsWithChildren> = ({ children }) => {
  const transition = useTransition();
  const outlet = useOutlet();
  return <main>{outlet}</main>;
};

export default Transition;
