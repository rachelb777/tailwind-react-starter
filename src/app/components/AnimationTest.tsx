import { useEffect } from "react";

export function AnimationTest() {
  useEffect(() => {
    // Inject stylesheet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/animation-test/style.css";
    link.dataset.animationTest = "true";
    document.head.appendChild(link);

    // Load scripts sequentially: GSAP -> SplitText -> demo script
    const loadScript = (src: string): Promise<void> =>
      new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.async = false;
        s.dataset.animationTest = "true";
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(s);
      });

    let cancelled = false;
    (async () => {
      try {
        await loadScript("https://unpkg.com/gsap@3/dist/gsap.min.js");
        if (cancelled) return;
        await loadScript("https://assets.codepen.io/16327/SplitText3-beta.min.js?b=26");
        if (cancelled) return;
        await loadScript("/animation-test/script.js");
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      cancelled = true;
      document
        .querySelectorAll('[data-animation-test="true"]')
        .forEach((el) => el.remove());
    };
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="split">
          The text in this paragraph is split by words and lines. We have enabled
          masking on the lines so that we can animate the lines to create a fun
          'reveal' animation.
        </h1>
      </div>
      <button>Replay Slowly</button>
    </>
  );
}
