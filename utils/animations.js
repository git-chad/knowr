import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageIn = () => {
  const bannerOne = document.getElementById("banner-1");
  const bannerTwo = document.getElementById("banner-2");
  const bannerThree = document.getElementById("banner-3");

  if (bannerOne && bannerTwo && bannerThree) {
    const tl = gsap.timeline();

    tl.set([bannerOne, bannerTwo, bannerThree], {
      yPercent: 0,
    }).to([bannerOne, bannerTwo, bannerThree], {
      yPercent: 100,
      stagger: 0.1,
      ease: "power3.inOut",
      duration: 1,
    });
  }
};

export const animatePageOut = (href, router) => {
  const bannerOne = document.getElementById("banner-1");
  const bannerTwo = document.getElementById("banner-2");
  const bannerThree = document.getElementById("banner-3");

  if (bannerOne && bannerTwo && bannerThree) {
    const tl = gsap.timeline();

    tl.set([bannerOne, bannerTwo, bannerThree], {
      yPercent: -100,
    }).to([bannerOne, bannerTwo, bannerThree], {
      yPercent: 0,
      stagger: 0.1,
      ease: "power3.inOut",
      duration: 1,
      onComplete: () => {
        router.push(href);
      },
    });
  }
};
