// <!-- GSAP Animations -->
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.matchMedia({
    // For desktop (min-width: 769px)
    "(min-width: 769px)": function () {
      // Animate headings
      gsap.utils.toArray(".section-heading").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      });
      // Animate images differently
      gsap.utils.toArray("img").forEach((img, i) => {
        gsap.from(img, {
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
          },
          x: i % 2 === 0 ? -100 : 100, // alternate left & right
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });
      // Animate list items
      gsap.utils.toArray("ul li").forEach((li) => {
        gsap.from(li, {
          scrollTrigger: {
            trigger: li,
            start: "top 95%",
          },
          x: -20,
          opacity: 0,
          duration: 0.6,
          ease: "power1.out"
        });
      });
    },
    // ✅ Mobile (max-width: 768px)
    "(max-width: 768px)": function () {
      // Mobile headings - fade up faster
      gsap.utils.toArray(".section-heading").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power1.out"
        });
      });
      // Mobile images - scale in (instead of slide)
      gsap.utils.toArray("img").forEach((img) => {
        gsap.from(img, {
          scrollTrigger: {
            trigger: img,
            start: "top 90%",
          },
          scale: 0.85,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)"
        });
      });
      // Mobile list items - simple fade in with stagger
      gsap.utils.toArray("ul").forEach((ul) => {
        gsap.from(ul.children, {
          scrollTrigger: {
            trigger: ul,
            start: "top 90%",
          },
          opacity: 0,
          y: 15,
          duration: 0.5,
          stagger: 0.15
        });
      });
    }
  });

