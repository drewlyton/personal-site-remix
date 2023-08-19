import gsap from "gsap";
import React, { useEffect } from "react";
import type { AniComp } from "./AniComp";
import { SplitText } from "../../public/static/gsap/SplitText";
import AniLink from "./AniLink";

const ProductAni: React.FC<AniComp> = ({ link }) => {
  useEffect(animate, []);
  return (
    <div
      id="software-header"
      className="leading-0.75 header-font text-5xl sm:text-6xl"
    >
      {"< "}
      <AniLink link={link}>product engineer</AniLink>
      {" >"}
    </div>
  );
};

function animate() {
  const timeline = gsap.timeline({ repeat: -1, yoyo: true });
  const mySplitText = new SplitText("#software-header", {
    type: "words"
  });
  mySplitText.words[0]?.classList.add("left-bracket");
  mySplitText.words[3]?.classList.add("right-bracket");
  mySplitText.words[4]?.classList.add("left-bracket");
  mySplitText.words[7]?.classList.add("right-bracket");
  timeline
    .set(".left-bracket", { y: 2 })
    .set(".right-bracket", { y: 5 })
    .to(".left-bracket", { y: 5, ease: "power1.inOut" })
    .to(".right-bracket", { y: 2, ease: "power1.inOut" }, "<")
    .timeScale(0.7);
}

export default ProductAni;
