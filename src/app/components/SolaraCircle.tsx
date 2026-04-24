import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Masonry?: any;
    AOS?: any;
    lightbox?: any;
    jQuery?: any;
    $?: any;
  }
}

const galleryItems = [
  {
    large: "/large/handfoot_stretch_wesley-tingey--nZynZmR3Ls-unsplash-3.jpg",
    thumb: "/grid/handfoot_stretch.jpg",
    title: "Deep Balance Pose",
    alt: "woman standing on one leg while pulling other leg straight up over her head",
    wide: false,
  },
  {
    large: "/large/mountain_sun_luke-richardson-dI7vfR1Bqcg-unsplash-3.jpg",
    thumb: "/grid/mountain_sun.jpg",
    title: "Mountain Gorge Sunrise",
    alt: "sunrise over mountain gorge",
    wide: true,
  },
  {
    large: "/large/stretch_braid_luemen-rutkowski-mIHbipd5-Qw-unsplash-3.jpg",
    thumb: "/grid/stretch_braid.jpg",
    title: "Outdoor Nature Stretch",
    alt: "woman stretching in nature",
    wide: false,
  },
  {
    large: "/large/Surya_namaskar_at_the_sea_shore-3.jpg",
    thumb: "/grid/surya_namaskar.jpg",
    title: "Seashore Surya Namaskar",
    alt: "man standing with arms over head, palms touching and leg bent on side of knee at sunrise on seashore with waves",
    wide: false,
  },
  {
    large: "/large/best_community_pexels-silverkblack-36715242-4.jpg",
    thumb: "/grid/best_community.jpg",
    title: "Partner Stretch Practice",
    alt: "2 people sitting outdoors and stretching with hands and feet together",
    wide: true,
  },
  {
    large: "/large/communit_stretch_towards_pexels-silverkblack-36715217-3.jpg",
    thumb: "/grid/community_stretch.jpg",
    title: "Community Outreach Stretching",
    alt: "2 people standing outdoors and stretching towards eachother with arms straight out",
    wide: false,
  },
  {
    large: "/large/editbehnam-samipour-SBvW39-W60I-unsplash-3.jpg",
    thumb: "/grid/edit_behnam.jpg",
    title: "Midday Sun Meditation",
    alt: "woman smiling with face turned toward sun in a field",
    wide: false,
  },
  {
    large: "/large/girl_trampoline_pexels-ron-lach-10045070-3.jpg",
    thumb: "/grid/girl_trampoline.jpg",
    title: "Rebounding Exercise",
    alt: "girl smiling while jumping on mini trampoline",
    wide: true,
  },
  {
    large: "/large/goldenhill_sun-john-towner-CakC6u4d95g-unsplash-3.jpg",
    thumb: "/grid/goldenhill_sun.jpg",
    title: "Sunrise at Golden Hill",
    alt: "silhouette of people standing on mountain looking at sunrise over ocean",
    wide: false,
  },
  {
    large: "/large/greendress_feet_conikal-ft7WMh4T_AQ-unsplash-3.jpg",
    thumb: "/grid/greendress_feet.jpg",
    title: "Barefoot Stream Walk",
    alt: "woman in green dress walking in green jungle with barefeet in stream",
    wide: false,
  },
];

export function SolaraCircle() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let masonryInstance: any = null;
    let cancelled = false;

    const init = () => {
      if (cancelled) return;
      const $ = window.jQuery || window.$;
      if ($ && gridRef.current) {
        const $grid = $(gridRef.current);
        masonryInstance = $grid.masonry({
          itemSelector: ".grid-item",
          columnWidth: 200,
          gutter: 10,
        });
        // Re-layout after each image loads to avoid overlaps
        $grid.find("img").each(function (this: HTMLImageElement) {
          if (this.complete) return;
          this.addEventListener("load", () => $grid.masonry("layout"));
        });
      }
      if (window.AOS) {
        window.AOS.init({ once: true, easing: "ease-in-sine" });
        window.AOS.refreshHard?.();
      }
    };

    if (document.readyState === "complete") {
      init();
    } else {
      window.addEventListener("load", init, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", init);
      try {
        const $ = window.jQuery || window.$;
        if ($ && gridRef.current) $(gridRef.current).masonry("destroy");
      } catch {
        // ignore
      }
    };
  }, []);

  return (
    <div className="relative">
      <style>{`
        .solara-gallery .grid-item { width: 200px; margin-bottom: 10px; }
        .solara-gallery .grid-item--width2 { width: 400px; }
        .solara-gallery .grid-item img {
          width: 100%;
          display: block;
          transition: transform 0.4s ease;
          border-radius: 8px;
        }
        .solara-gallery .grid-item img:hover { transform: scale(1.08); }
      `}</style>

      {/* Hero */}
      <section className="relative w-full bg-gradient-to-b from-background to-muted/40 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16 text-center flex flex-col items-center">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-8 leading-[1.1] tracking-tight">
            The Solara Circle
          </h1>
          <img
            src="/hero/group_stretch.jpg"
            alt="Group of people practicing yoga together in a sunlit meadow at sunrise"
            className="w-full max-w-md h-auto rounded-2xl shadow-xl mb-8"
          />
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The Solara Circle is your community for inspiration and connection. See what your community is
            practicing right now, share your own journey, and draw strength from a supportive Solara community
            that shows up for each other every day.
          </p>
        </div>
      </section>

      {/* Masonry gallery */}
      <section className="solara-gallery max-w-[1200px] mx-auto px-8 lg:px-16 py-16 md:py-24">
        <div ref={gridRef} className="grid mx-auto">
          {galleryItems.map((item) => (
            <div
              key={item.thumb}
              className={`grid-item${item.wide ? " grid-item--width2" : ""}`}
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-delay="200"
            >
              <a href={item.large} data-lightbox="solara-gallery" data-title={item.title}>
                <img src={item.thumb} alt={item.alt} />
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}