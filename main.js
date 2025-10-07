// INDEX SCRIPT
       // Splash (kept as-is functionally)
    window.addEventListener("load", () => {
      setTimeout(() => {
        document.getElementById("splash").style.display = "none";
      }, 1200);
    });
    /* ============ GSAP Animations ============ */
    gsap.registerPlugin(ScrollTrigger);

    // Fade / slide in the "How It Works" cards & hero text
    gsap.from(".hero-head", {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2
    });

    gsap.from(".hero-sub", {
      opacity: 0,
      y: -6,
      duration: 0.7,
      ease: "power2.out",
      delay: 0.35
    });

    gsap.utils.toArray('.container .row .col-md-4').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: i * 0.12
      });
    });

    // Stagger in testimonials when entering viewport
    gsap.from(".marquee-content .testimonial .inner-card", {
      scrollTrigger: {
        trigger: ".myratingcards",
        start: "top 85%",
      },
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.08
    });

    /* ============ Automatic horizontal scrolling for testimonials ============ */
    (function () {
      const track = document.getElementById('reviewsTrack');
      if (!track) return;

      // Duplicate content to allow seamless loop if not already longer than container
      function duplicateUntilLongEnough() {
        const containerWidth = track.parentElement.offsetWidth;
        let totalWidth = track.scrollWidth;
        let clones = 0;
        while (totalWidth < containerWidth * 2) { // ensure enough length
          const nodes = Array.from(track.children).map(n => n.cloneNode(true));
          nodes.forEach(n => track.appendChild(n));
          totalWidth = track.scrollWidth;
          clones++;
          if (clones > 6) break; // safety
        }
      }

      duplicateUntilLongEnough();

      // GSAP continuous tween
      function startLoop() {
        // total width of track
        const distance = track.scrollWidth / 2; // move half so the duplicate keeps it seamless
        // remove previous tween if any
        if (track._gsapTween) track._gsapTween.kill();

        // set initial x
        gsap.set(track, { x: 0 });

        const tween = gsap.to(track, {
          x: -distance,
          ease: "none",
          duration: Math.max(18, distance / 60),
          repeat: -1
        });

        track._gsapTween = tween;
      }

      startLoop();

      // Pause on pointer enter, resume on leave
      track.addEventListener('mouseenter', () => {
        if (track._gsapTween) track._gsapTween.pause();
      });
      track.addEventListener('mouseleave', () => {
        if (track._gsapTween) track._gsapTween.resume();
      });

      // Small left/right buttons to nudge
      document.querySelectorAll('.left-btn, .right-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          // only affect instruction track if clicked there; but nudge reviews too if needed
          const target = btn.classList.contains('left-btn') ? 1 : -1;
          // nudge both instruction and reviews if visible
          [document.getElementById('instructionTrack'), document.getElementById('reviewsTrack')].forEach(t => {
            if (!t) return;
            // temporary manual tween using GSAP
            gsap.to(t, { x: `+=${220 * target}`, duration: 0.35, ease: "power2.out" });
          });
        });
      });

      // handle resize
      let rTimer;
      window.addEventListener('resize', () => {
        clearTimeout(rTimer);
        rTimer = setTimeout(() => {
          // rebuild duplicates to fit new size
          // remove duplicates first: keep only first group of unique testimonials
          const originals = [];
          const seen = new Set();
          const children = Array.from(track.children);
          for (const c of children) {
            const txt = c.innerText.trim().slice(0, 60);
            if (!seen.has(txt)) {
              originals.push(c.cloneNode(true));
              seen.add(txt);
            }
          }
          track.innerHTML = "";
          originals.forEach(n => track.appendChild(n));
          duplicateUntilLongEnough();
          startLoop();
        }, 180);
      });

    })();

    /* ============ Marquee for instructions (separate from reviews) ============ */
    (function () {
      const container = document.querySelector('.marquee-container.position-relative');
      const track = document.getElementById('instructionTrack');
      if (!track) return;

      // duplicate to allow looping
      const items = Array.from(track.children);
      items.forEach(i => track.appendChild(i.cloneNode(true)));

      // simple continuous animation
      const totalWidth = track.scrollWidth / 2;
      const duration = Math.max(16, totalWidth / 60);

      gsap.set(track, { x: 0 });
      const tween = gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        duration: duration,
        repeat: -1
      });

      // left/right buttons already nudging both strips above
    })();

  gsap.registerPlugin(ScrollTrigger);

  // Animate section heading and paragraph
  gsap.from(".text-danger, .text-muted", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".text-danger", // section starts when heading enters
      start: "top 85%",
    }
  });

  // Animate the feature cards
  gsap.from(".row .col-md-3", {
    opacity: 0,
    y: 80,
    scale: 0.8,
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".row",
      start: "top 80%",
      toggleActions: "play none none reverse",
    }
  });


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

