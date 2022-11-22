import { NavLink } from "@remix-run/react";
import routes from "../helpers/routes";
import Logo from "./Logo";
import ThemeSwitch from "./ThemeSwitch";

const Topbar = () => {
  return (
    <nav className="px-4 top-0 fixed w-full z-50 box-border">
      <div
        className="
        container
        mx-auto
        max-w-screen-lg
        flex
        items-center
        py-4
        px-5
        wave-border
        bottom
        solid
      "
      >
        <Logo />
        <div
          className="
          flex-grow
          items-end
          justify-end
          flex
          
          header-font
          uppercase
        "
        >
          <NavLink
            to={routes.stories}
            className={({ isActive }) =>
              `leading-none wave-border bottom ${isActive && "active"}`
            }
          >
            <i className="bi bi-book pb-2 mr-1"></i> Stories
          </NavLink>
          {/* <a
            href="https://www.getrevue.co/profile/realizingthought"
            target={"_blank"}
            rel="noreferrer"
            className={`leading-none wave-border bottom`}
          >
            Newsletter
          </a> */}
          <div>{/* <ThemeSwitch /> */}</div>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
