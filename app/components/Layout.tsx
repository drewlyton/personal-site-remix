import React, { PropsWithChildren } from "react";
import Footer from "./Footer";
import Topbar from "./Topbar";
import Transition from "./Transition";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Topbar />
      <Transition>{children}</Transition>
      <Footer />
    </>
  );
};

export default Layout;
