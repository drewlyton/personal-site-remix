import { useTransition } from "@remix-run/react";
import type { PropsWithChildren, Reducer } from "react";
import React, { useEffect, useReducer } from "react";

const transitionReducer: Reducer<
  { enter: boolean; entering: boolean; exit: boolean; exiting: boolean },
  { type: "enter" | "exit" }
> = (state, action) => {
  switch (action.type) {
    case "enter":
      return {
        ...state,
        enter: true,
        entering: true,
        exit: false,
        exiting: false
      };
    case "exit":
      return {
        ...state,
        exit: true,
        exiting: true,
        enter: false,
        entering: false
      };
    default:
      return { ...state };
  }
};

const initialState = {
  enter: false,
  exit: false,
  exiting: false,
  entering: false
};

const Transition: React.FC<PropsWithChildren> = ({ children }) => {
  const transition = useTransition();
  const [state, dispatch] = useReducer(transitionReducer, initialState);

  useEffect(() => {
    switch (transition.state) {
      case "idle":
        dispatch({ type: "enter" });
        break;
      case "loading":
        dispatch({ type: "exit" });
      default:
        break;
    }
  }, [transition]);

  return (
    <main
      className={[
        state.enter && "page-enter",
        state.entering && "page-enter-active",
        state.exit && "page-exit",
        state.exiting && "page-exit-active"
      ].join(" ")}
    >
      {children}
    </main>
  );
};

export default Transition;
