import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

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
  {
    large: "/large/barefoot_nature.jpg",
    thumb: "/grid/barefoot_nature.jpg",
    title: "Woman walking barefooted in nature",
    alt: "Woman Wearing Sports Bra and Legging Walking Barefooted on stone steps in nature",
    wide: false,
  },
  {
    large: "/large/woman_rock_water.jpg",
    thumb: "/grid/woman_rock_water.jpg",
    title: "A woman sitting on a rock in the water",
    alt: "A woman touching her feet sitting on rock in shallow water",
    wide: false,
  },
  {
    large: "/large/high_rebounding.jpg",
    thumb: "/grid/high_rebounding.jpg",
    title: "High rebounding women!",
    alt: "group of women on mini trampolines jumping in air at same time outdoors",
    wide: true,
  },
  {
    large: "/large/yogic_stretch.jpg",
    thumb: "/grid/yogic_stretch.jpg",
    title: "A woman doing a yoga pose",
    alt: "A woman sitting on floor arching back into yoga pose with foot behind her touching back of her head",
    wide: true,
  },
  {
    large: "/large/man_watching_sun.jpg",
    thumb: "/grid/man_watching_sun.jpg",
    title: "Man watching sunrise",
    alt: "Profile of man wearing hat watching sunrise",
    wide: false,
  },
];

type FeedPost = {
  name: string;
  initial: string;
  practice: string;
  day: string;
  text: string;
  avatarBg: string;
  avatarFg: string;
};

const feedPosts: FeedPost[] = [
  {
    name: "Maya R.",
    initial: "M",
    practice: "Sun Gazing",
    day: "Day 11 of 14",
    text: "Honestly wasn't sure about this one at first. But looking at my check-ins from the past week, my mood scores are consistently higher on the days I actually go outside for it. I've been skipping some mornings and I can kind of see that in the numbers now. Trying to be more consistent this last stretch.",
    // terracotta
    avatarBg: "hsl(14 55% 60%)",
    avatarFg: "hsl(40 33% 99%)",
  },
  {
    name: "Daniel K.",
    initial: "D",
    practice: "Earthing",
    day: "Day 6 of 14",
    text: "My focus has been lower than I expected — I thought getting outside barefoot would clear my head. But my pain levels are actually down, which surprised me. I'm going to keep going and see if the focus catches up. Curious what my insight will say at the end.",
    // sage green
    avatarBg: "hsl(110 22% 50%)",
    avatarFg: "hsl(40 33% 99%)",
  },
  {
    name: "Tom W.",
    initial: "T",
    practice: "Morning Stretches",
    day: "Day 14 of 14",
    text: "Last day. I almost quit around day 8 — my lower back was actually more sore than when I started and I was ready to switch to something else. Glad I didn't. By day 11 something shifted. Looking forward to seeing what my insight says.",
    // dusty gold
    avatarBg: "hsl(42 55% 55%)",
    avatarFg: "hsl(40 33% 99%)",
  },
  {
    name: "Priya S.",
    initial: "P",
    practice: "Rebounding",
    day: "Day 2 of 14",
    text: "Day two and I already feel ridiculous jumping on a mini trampoline. But I did it. Oddly, I sat down and knocked out my emails right after without getting distracted. Probably a coincidence. We'll see.",
    // soft coral
    avatarBg: "hsl(8 65% 70%)",
    avatarFg: "hsl(40 33% 99%)",
  },
  {
    name: "Lena C.",
    initial: "L",
    practice: "Earthing",
    day: "Day 14 of 14",
    text: "Finished. Two weeks of standing barefoot in my backyard every morning, which my neighbors definitely noticed. I went in skeptical and I'm coming out... still a little skeptical honestly, but my mood scores were higher than I expected and my pain was down most days. Make of that what you will.",
    // muted lavender
    avatarBg: "hsl(265 25% 65%)",
    avatarFg: "hsl(40 33% 99%)",
  },
];

function FeedCard({ post, tall = false }: { post: FeedPost; tall?: boolean }) {
  return (
    <article
      className={`bg-card/60 shadow-[0_2px_16px_-4px_hsl(75_20%_15%/0.08)] transition-shadow hover:shadow-[0_6px_24px_-4px_hsl(75_20%_15%/0.12)] flex flex-col items-center justify-center text-center mx-auto w-full max-w-[360px] ${tall ? "aspect-[2/3]" : "aspect-[3/4]"} px-8 md:px-10 py-12`}
      style={{ borderRadius: "50%" }}
    >
      <div
        className="flex items-center justify-center w-12 h-12 rounded-full font-display text-lg mb-4"
        style={{ backgroundColor: post.avatarBg, color: post.avatarFg }}
        aria-hidden="true"
      >
        {post.initial}
      </div>
      <h4 className="font-body font-semibold text-foreground text-lg leading-tight">{post.name}</h4>
      <p className="font-body text-sm text-foreground/55 mt-1 mb-4">
        {post.practice} · {post.day}
      </p>
      <p
        className={`font-body text-sm text-foreground/80 leading-relaxed ${tall ? "line-clamp-[10]" : "line-clamp-6"}`}
      >
        {post.text}
      </p>
    </article>
  );
}

function FeaturedFeedCard({ post }: { post: FeedPost }) {
  return (
    <article
      className="shadow-[0_2px_20px_-4px_hsl(28_55%_30%/0.12)] bg-[hsl(36_55%_92%)] transition-shadow hover:shadow-[0_6px_28px_-4px_hsl(28_55%_30%/0.18)] flex flex-col items-center justify-center text-center mx-auto w-full aspect-[5/2] px-16 md:px-32 py-10"
      style={{ borderRadius: "50%" }}
    >
      <div className="flex items-center gap-4 mb-4 justify-center">
        <div
          className="flex items-center justify-center w-14 h-14 rounded-full font-display text-xl shrink-0"
          style={{ backgroundColor: post.avatarBg, color: post.avatarFg }}
          aria-hidden="true"
        >
          {post.initial}
        </div>
        <div className="text-left">
          <h4 className="font-body font-semibold text-foreground text-lg leading-tight">{post.name}</h4>
          <p className="font-body text-sm text-foreground/55 mt-0.5">
            {post.practice} · {post.day}
          </p>
        </div>
      </div>
      <p className="font-body text-base text-foreground/80 leading-relaxed max-w-2xl">{post.text}</p>
    </article>
  );
}

export function SolaraCircle() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [shareOpen, setShareOpen] = useState(false);

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
          percentPosition: false,
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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground mb-16 md:mb-20 leading-tight"
          >
            The Solara <span className="text-accent italic">Circle</span>
          </motion.h1>
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            src="/hero/group_stretch.jpg"
            alt="Group of people practicing yoga together in a sunlit meadow at sunrise"
            className="w-full max-w-md h-auto rounded-2xl shadow-xl mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="font-body text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed"
          >
            The Solara Circle is your community for inspiration and connection. See what your community is practicing
            right now, share your own journey, and draw strength from a supportive Solara community that shows up for
            each other every day.
          </motion.p>
        </div>
      </section>

      {/* Community Feed */}
      <section className="max-w-[1200px] mx-auto px-8 lg:px-16 pt-8 md:pt-12 pb-8">
        <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground text-center mb-12 md:mb-16">
          What the community is <span className="text-accent italic">discovering</span>
        </h3>

        <div className="flex flex-col gap-8 md:gap-10">
          {/* Row 1 - Maya centered */}
          <div className="flex justify-center">
            <div className="w-full max-w-[360px]">
              <FeedCard post={feedPosts[0]} />
            </div>
          </div>
          {/* Row 2 - Featured Tom */}
          <FeaturedFeedCard post={feedPosts[2]} />
          {/* Row 3 - Daniel, Priya, Lena */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <FeedCard post={feedPosts[1]} tall />
            <FeedCard post={feedPosts[3]} tall />
            <FeedCard post={feedPosts[4]} tall />
          </div>
        </div>
      </section>

      {/* Bridge */}
      <section className="max-w-[1200px] mx-auto px-8 lg:px-16 py-20 md:py-28 text-center">
        <p className="font-display italic text-xl md:text-2xl text-foreground/70 mb-6">
          These are their moments. Add yours.
        </p>
        <Button
          size="lg"
          onClick={() => setShareOpen(true)}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Share Your Practice
        </Button>
      </section>

      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-foreground">Welcome to the Circle</DialogTitle>
            <DialogDescription className="font-body text-base text-foreground/70 pt-2">
              Thank you for being part of the Circle. Photo sharing coming soon!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
