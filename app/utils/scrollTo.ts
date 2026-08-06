import { ScrollSmoother } from "gsap/ScrollSmoother";

export function scrollToSection(
  e: React.MouseEvent<HTMLAnchorElement>,
  target: string
) {
  e.preventDefault();
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(target, true, "top top");
  } else {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
}
