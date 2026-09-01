/* ============================================================
   Doltone House Harbourside — behaviour
   GSAP scroll reveals · spaces engine · event-type re-theming
   ============================================================ */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;
  const hasGsap = typeof gsap !== "undefined";

  /* ==========================================================
     DATA — spaces
     ========================================================== */
  const SPACES = {
    horizon: {
      name: "Horizon",
      eyebrow: "01 · Flagship Space",
      idx: "01",
      img: "assets/img/space-horizon.jpg",
      alt: "Artist impression of the Horizon event space",
      desc: "The Horizon represents scale, possibility and outlook — the flagship event space at Doltone House Harbourside. Framed by sweeping waterfront views and designed to transform for different occasions, it offers a sophisticated setting for conferences, gala dinners, exhibitions and large-scale events.",
      caps: [["Banquet", "200"], ["Theatre", "150"], ["Cocktail", "230"], ["Area", "300"]],
      capsConfirmed: true,
      connected: ["Grand Foyer", "Observatory Pre-Function", "Eloura Park Rooftop"],
      tags: { business: "Conferences · Gala Dinners · Exhibitions", celebrations: "Milestones · Gala Celebrations · Large Gatherings", weddings: "Ceremonies · Grand Receptions" }
    },
    sol: {
      name: "Sol",
      eyebrow: "02 · Event Space",
      idx: "02",
      img: "assets/img/space-sol.jpg",
      alt: "Artist impression of the Sol event space",
      desc: "Bathed in natural light and framed by sweeping harbour views, Sol is inspired by warmth, energy and the brilliance of the sun.",
      caps: [["Banquet", "120"], ["Theatre", "180"], ["Cocktail", "150"], ["Area", "220"]],
      capsConfirmed: false,
      connected: ["Grand Foyer", "Cove"],
      tags: { business: "Meetings · Presentations · Business Events", celebrations: "Daytime Celebrations · Long Lunches", weddings: "Ceremonies · Intimate Receptions" }
    },
    lume: {
      name: "Lume",
      eyebrow: "03 · Event Space",
      idx: "03",
      img: "assets/img/space-lume.jpg",
      alt: "Artist impression of the Lume event space",
      desc: "Inspired by illumination and atmosphere — a contemporary waterfront space where natural light and elegant design come together.",
      caps: [["Banquet", "100"], ["Theatre", "140"], ["Cocktail", "160"], ["Area", "190"]],
      capsConfirmed: false,
      connected: ["Lyra", "Grand Foyer"],
      tags: { business: "Corporate Events · Networking · Celebrations", celebrations: "Evening Celebrations · Cocktail Events", weddings: "Receptions · Pre-Wedding Events" }
    },
    cove: {
      name: "Cove",
      eyebrow: "04 · Event Space",
      idx: "04",
      img: "assets/img/space-cove.jpg",
      alt: "Artist impression of the Cove event space",
      desc: "Warm, welcoming and highly adaptable — a space designed for connection, drawn from the harbour's sheltered inlets.",
      caps: [["Banquet", "80"], ["Theatre", "110"], ["Cocktail", "100"], ["Area", "140"]],
      capsConfirmed: false,
      connected: ["Sol", "Grand Foyer"],
      tags: { business: "Meetings · Workshops · Breakouts", celebrations: "Private Dining · Social Gatherings", weddings: "Intimate Ceremonies · Family Gatherings" }
    },
    azure: {
      name: "Azure",
      eyebrow: "05 · Event Space",
      idx: "05",
      img: "assets/img/space-azure.jpg",
      alt: "Artist impression of the Azure event space",
      desc: "Reflecting the colours of Sydney's sky and harbour, Azure embraces openness, elegance and natural light.",
      caps: [["Banquet", "160"], ["Theatre", "220"], ["Cocktail", "200"], ["Area", "260"]],
      capsConfirmed: false,
      connected: ["Observatory Pre-Function"],
      tags: { business: "Conferences · Gala Dinners · Premium Events", celebrations: "Premium Celebrations · Anniversaries", weddings: "Waterfront Receptions" }
    },
    lyra: {
      name: "Lyra",
      eyebrow: "06 · Pre-Function Space",
      idx: "06",
      img: "assets/img/space-lyra.jpg",
      alt: "Artist impression of the Lyra pre-function space",
      desc: "Named after the Lyra constellation — an elegant pre-function space designed as the heart of arrival and connection.",
      caps: [["Banquet", "60"], ["Theatre", "90"], ["Cocktail", "180"], ["Area", "240"]],
      capsConfirmed: false,
      connected: ["Horizon", "Lume"],
      tags: { business: "Arrival · Networking · Receptions", celebrations: "Arrival Drinks · Receptions", weddings: "Guest Arrival · Canapés" }
    }
  };
  const DEFAULT_SPACE = "horizon";
  const CARD_ORDER = ["sol", "lume", "cove", "azure", "lyra"];

  /* Card copy is card-specific (matches design), panel copy above */
  const CARD_META = {
    sol:   { desc: "Bathed in natural light and framed by sweeping harbour views, Sol is inspired by warmth, energy and the brilliance of the sun." },
    lume:  { desc: "Inspired by illumination and atmosphere — a contemporary waterfront space where natural light and elegant design come together." },
    cove:  { desc: "Warm, welcoming and highly adaptable — a space designed for connection, drawn from the harbour's sheltered inlets." },
    azure: { desc: "Reflecting the colours of Sydney's sky and harbour, Azure embraces openness, elegance and natural light." },
    lyra:  { desc: "Named after the Lyra constellation — an elegant pre-function space designed as the heart of arrival and connection." }
  };

  /* Event-type copy variants — business is the built design copy;
     weddings & celebrations carry the supplied copy deck. */
  const VARIANTS = {
    business: {
      heroImg: "assets/img/hero.jpg",
      heroAlt: "Aerial view of the Harbourside precinct on the Darling Harbour waterfront at dusk",
      heroLede: "A new landmark waterfront destination for business events, celebrations and weddings, at the centre of Darling Harbour.",
      heroCta: "Enquire Now",
      overviewHead: "Where the water meets the city, a new stage for Sydney\u2019s most considered events.",
      overviewIntro: "Positioned on the waterfront at the centre of Darling Harbour\u2019s convention and tourism precinct, Harbourside brings together six purpose-built spaces, a landscaped rooftop garden and more than 55 years of Doltone House event delivery.",
      lensTitle: "Seen through the lens of business events.",
      lensCards: [
        { img: "assets/img/lens-conference.jpg", alt: "Conference plenary in the Horizon space", t: "Conferences & keynotes", d: "Plenary in Horizon, breakouts across Sol and Cove, delegate arrival through Lyra." },
        { img: "assets/img/lens-gala.jpg", alt: "Gala dinner beneath the Horizon ceiling", t: "Gala dinners & awards", d: "Evening arrivals over the water, pre-dinner drinks in Lyra, dinner beneath Horizon\u2019s full scale." },
        { img: "assets/img/lens-exhibition.jpg", alt: "Product launch on the rooftop garden", t: "Exhibitions & launches", d: "Flexible floorplates, production access and networking that spills onto the rooftop garden." }
      ],
      enquireHead: "Plan your event at Harbourside.",
      enquireSub: "Tell us about your event and our team will come back to you with availability, options and a considered recommendation.",
      enquireCta: "Enquire Now",
      enquireCta2: "Book a Venue Tour"
    },
    weddings: {
      heroImg: "assets/img/hero-weddings.jpg",
      heroAlt: "A couple walking the flower-lined waterfront promenade at golden hour, guests celebrating behind them",
      heroLede: "A landmark wedding venue on the Darling Harbour waterfront, yours from first arrival to last dance.",
      heroCta: "Plan Your Wedding",
      overviewHead: "A day of your own, on the water.",
      overviewIntro: "Opening in 2027 on the Darling Harbour waterfront, Harbourside pairs a landmark setting with more than 55 years of Doltone House wedding experience. From first arrival to last dance, every detail is planned with you \u2014 the setting, the styling, the food and the flow of the day.",
      lensTitle: "Your wedding at Harbourside.",
      lensCards: [
        { img: "assets/img/lens-wedding-arrival.jpg", alt: "A couple leaving through applauding guests and falling petals at the venue entrance", t: "The arrival", d: "Guests welcomed off the waterfront promenade as the harbour turns gold." },
        { img: "assets/img/lens-wedding-dining.jpg", alt: "Wedding speeches at golden hour with the harbour behind", t: "Dining & speeches", d: "Long tables, considered styling and food that becomes part of the story." },
        { img: "assets/img/lens-wedding-dance.jpg", alt: "The couple\u2019s first dance under the timber ceiling at night", t: "The dance floor", d: "Speeches give way to the first dance and a room that stays up late." }
      ],
      enquireHead: "Plan your wedding at Harbourside.",
      enquireSub: "Tell us about your day and a Doltone House wedding specialist will be in touch.",
      enquireCta: "Plan Your Wedding",
      enquireCta2: "Book a Venue Tour"
    },
    celebrations: {
      heroImg: "assets/img/hero.jpg",
      heroAlt: "Aerial view of the Harbourside precinct on the Darling Harbour waterfront at dusk",
      heroLede: "A waterfront venue for birthdays, engagements and the milestones in between.",
      heroCta: "Plan Your Celebration",
      overviewHead: "Occasions worth gathering for.",
      overviewIntro: "Opening in 2027 on the Darling Harbour waterfront, Harbourside offers flexible spaces for celebrations of every scale \u2014 from intimate dinners to milestone parties \u2014 backed by more than 55 years of Doltone House hospitality, food and service.",
      lensTitle: "Your celebration at Harbourside.",
      lensCards: [
        { img: "assets/img/lens-conference.jpg", alt: "A milestone dinner in the Horizon space", t: "Birthdays & milestones", d: "Rooms that scale from an intimate dinner to a full-floor party." },
        { img: "assets/img/lens-gala.jpg", alt: "An engagement celebration over the water", t: "Engagements", d: "A waterfront backdrop for the first celebration of many." },
        { img: "assets/img/lens-exhibition.jpg", alt: "Evening celebration spilling onto the rooftop garden", t: "Dinner to dancing", d: "The night moves naturally from dining to speeches, entertainment and dancing." }
      ],
      enquireHead: "Plan your celebration at Harbourside.",
      enquireSub: "Tell us about the occasion and a Doltone House event planner will be in touch.",
      enquireCta: "Plan Your Celebration",
      enquireCta2: "Check Your Preferred Date"
    }
  };
  const EVENT_LABELS = { business: "Business Event", celebrations: "Celebration", weddings: "Wedding" };

  /* ==========================================================
     STATE
     ========================================================== */
  let currentSpace = DEFAULT_SPACE;
  let currentEventType = "business";
  let userChoseSpace = false;

  /* ==========================================================
     SPACES — selector cards
     ========================================================== */
  const grid = document.getElementById("spaceGrid");
  const panel = document.getElementById("spacePanel");

  function capRows(space) {
    return space.caps.map(([k, v]) =>
      `<div class="cap-cell"><span class="k">${k}</span><span class="v">${v}</span></div>`).join("");
  }

  function buildCards() {
    const frag = document.createDocumentFragment();
    CARD_ORDER.forEach(key => {
      const s = SPACES[key];
      const card = document.createElement("button");
      card.type = "button";
      card.className = "space-card";
      card.id = "card-" + key;
      card.dataset.space = key;
      card.setAttribute("aria-pressed", "false");
      card.setAttribute("aria-controls", "spacePanel");
      card.innerHTML = `
        <span class="space-card__media"><img class="lazy-img" src="${s.img}" alt="${s.alt}" loading="lazy" decoding="async"></span>
        <span class="space-card__title"><strong>${s.name}</strong><span class="idx">${s.idx}</span></span>
        <span class="space-card__desc">${CARD_META[key].desc}</span>
        <span class="space-card__tags" data-space-tags>${s.tags[currentEventType]}</span>
        <span class="space-card__foot">
          <span class="space-card__foot-row">
            <span class="view-link">View Space Details</span>
            <span class="enquire-link" data-enquire="${key}" role="link" tabindex="0">Enquire →</span>
          </span>
          <span class="space-card__note">${s.capsConfirmed ? "Capacity shown for confirmed configurations" : "Indicative capacities — to be confirmed"}</span>
        </span>
        <span class="space-card__detail" id="detail-${key}">
          <span class="cap-grid">${capRows(s)}</span>
          <span class="connected"><span class="k">Connected Spaces</span>
            <span class="chips">${s.connected.map(c => `<span class="chip">${c}</span>`).join("")}</span>
          </span>
          <span class="detail-actions">
            <span class="space-panel__enquire" data-enquire="${key}" role="link" tabindex="0">Enquire About ${s.name}</span>
            <span class="close-detail" data-close-detail role="button" tabindex="0">Close ✕</span>
          </span>
        </span>`;
      frag.appendChild(card);
    });

    // help cell
    const help = document.createElement("div");
    help.className = "space-help";
    help.innerHTML = `
      <span class="k" data-reveal>Not sure where to start?</span>
      <p data-split>Our events team will match your event to the right space or combination of spaces.</p>
      <div class="btn-row" data-reveal><a class="btn btn--outline-gold" href="#enquire">Talk to the Team</a></div>`;
    frag.appendChild(help);
    grid.appendChild(frag);
  }

  /* ==========================================================
     SPACES — detail panel swap
     ========================================================== */
  const panelImg = document.getElementById("panelImg");
  const panelBody = document.getElementById("panelBody");
  const els = {
    eyebrow: document.getElementById("panelEyebrow"),
    title: document.getElementById("panelTitle"),
    desc: document.getElementById("panelDesc"),
    caps: document.getElementById("panelCaps"),
    chips: document.getElementById("panelChips"),
    enquire: document.getElementById("panelEnquire")
  };

  function writePanel(key) {
    const s = SPACES[key];
    els.eyebrow.textContent = s.eyebrow;
    els.title.textContent = s.name;
    els.desc.textContent = s.desc;
    els.caps.innerHTML = capRows(s);
    els.chips.innerHTML = s.connected.map(c => `<span class="chip">${c}</span>`).join("");
    els.enquire.textContent = "Enquire About " + s.name;
    els.enquire.dataset.space = key;
    panelImg.src = s.img;
    panelImg.alt = s.alt;
  }

  function setSelectedStates(key) {
    grid.querySelectorAll(".space-card").forEach(card => {
      const on = card.dataset.space === key;
      card.classList.toggle("is-selected", on);
      card.setAttribute("aria-pressed", String(on));
    });
  }

  function selectSpace(key, opts = {}) {
    if (!SPACES[key]) return;
    const changed = key !== currentSpace;
    currentSpace = key;
    userChoseSpace = userChoseSpace || !!opts.byUser;

    setSelectedStates(key === DEFAULT_SPACE ? "" : key);

    if (changed) {
      if (reduceMotion) {
        writePanel(key);
      } else {
        panelImg.classList.add("is-fading");
        panelBody.classList.add("is-fading");
        setTimeout(() => {
          writePanel(key);
          requestAnimationFrame(() => {
            panelImg.classList.remove("is-fading");
            panelBody.classList.remove("is-fading");
          });
        }, 250);
      }
    }

    // carry into enquiry form
    syncFormSpace();

    // deep link — replaceState so the page never re-scrolls on swap
    if (opts.byUser) {
      history.replaceState(null, "", "#space-" + key);
    }

    // keep the click target and its result visible together:
    // only nudge the panel into view if it is fully off-screen (desktop only)
    if (opts.byUser && !isMobile() && !opts.noScroll) {
      const r = panel.getBoundingClientRect();
      const fullyAbove = r.bottom < 80;
      const fullyBelow = r.top > window.innerHeight;
      if (fullyAbove || fullyBelow) {
        panel.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }
    }
  }

  /* mobile accordion */
  let openDetail = null;
  function toggleDetail(key, card) {
    const detail = document.getElementById("detail-" + key);
    if (openDetail && openDetail !== detail) {
      openDetail.classList.remove("is-open");
      openDetail.closest(".space-card").setAttribute("aria-expanded", "false");
    }
    const opening = !detail.classList.contains("is-open");
    detail.classList.toggle("is-open", opening);
    card.setAttribute("aria-expanded", String(opening));
    openDetail = opening ? detail : null;
    if (opening) {
      // gentle adjustment only if the expanded state opens off-screen
      requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        if (r.top < 0 || r.top > window.innerHeight * 0.5) {
          card.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        }
      });
    }
  }

  grid.addEventListener("click", e => {
    const enquire = e.target.closest("[data-enquire]");
    if (enquire) {
      e.stopPropagation();
      goToEnquire(enquire.dataset.enquire);
      return;
    }
    if (e.target.closest("[data-close-detail]")) {
      const card = e.target.closest(".space-card");
      toggleDetail(card.dataset.space, card);
      return;
    }
    const card = e.target.closest(".space-card");
    if (!card) return;
    const key = card.dataset.space;
    if (isMobile()) {
      selectSpace(key, { byUser: true, noScroll: true });
      toggleDetail(key, card);
    } else {
      selectSpace(key, { byUser: true });
    }
  });

  document.getElementById("panelReset").addEventListener("click", () => {
    selectSpace(DEFAULT_SPACE, { byUser: true, noScroll: true });
    history.replaceState(null, "", location.pathname + location.search);
  });

  document.getElementById("panelEnquire").addEventListener("click", e => {
    goToEnquire(e.currentTarget.dataset.space);
  });

  function goToEnquire(key) {
    selectSpace(key, { byUser: true, noScroll: true });
    document.getElementById("enquire").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }

  /* ==========================================================
     SPACES — accordion view + toggle
     ========================================================== */
  const ACC_ORDER = ["horizon", "sol", "lume", "cove", "azure", "lyra"];
  const accWrap = document.getElementById("spacesAccordion");
  const cardsWrap = document.getElementById("spacesCards");
  let spacesViewMode = "cards";
  let openAccRow = null;

  function buildAccordion() {
    const frag = document.createDocumentFragment();
    ACC_ORDER.forEach(key => {
      const s = SPACES[key];
      const row = document.createElement("div");
      row.className = "acc-row";
      row.id = "acc-" + key;
      row.dataset.space = key;
      row.innerHTML = `
        <button type="button" class="acc-row__head" aria-expanded="false" aria-controls="acc-body-${key}">
          <span class="acc-row__idx">${s.idx}</span>
          <span class="acc-row__title-cell">
            <span class="acc-row__thumb"><img src="${s.img}" alt="" aria-hidden="true" loading="lazy" decoding="async"></span>
            <span class="acc-row__name">${s.name}</span>
          </span>
          <span class="acc-row__tags" data-acc-tags>${s.tags[currentEventType]}</span>
          <span class="acc-row__sign" aria-hidden="true">+</span>
        </button>
        <div class="acc-row__body" id="acc-body-${key}">
          <div class="acc-row__inner">
            <div class="acc-row__media">
              <img class="lazy-img" src="${s.img}" alt="${s.alt}" loading="lazy" decoding="async">
              <span class="artist-tag">Artist Impression</span>
            </div>
            <div class="acc-row__detail">
              <p>${s.desc}</p>
              <div class="cap-grid">${capRows(s)}</div>
              <div class="acc-row__note">${s.capsConfirmed ? "Capacity shown for confirmed configurations" : "Indicative capacities \u2014 to be confirmed"}</div>
              <div class="connected"><span class="k">Connected Spaces</span>
                <div class="chips">${s.connected.map(c => `<span class="chip">${c}</span>`).join("")}</div>
              </div>
              <div class="acc-row__actions">
                <button type="button" class="acc-row__enquire" data-enquire="${key}">Enquire About ${s.name}</button>
              </div>
            </div>
          </div>
        </div>`;
      frag.appendChild(row);
    });
    accWrap.appendChild(frag);
    bindLazy(accWrap);
  }

  function setAccHeight(body, open) {
    if (reduceMotion) { body.style.height = open ? "auto" : "0px"; return; }
    if (open) {
      body.style.height = body.scrollHeight + "px";
      body.addEventListener("transitionend", function te(e) {
        if (e.propertyName !== "height") return;
        body.style.height = "auto";
        body.removeEventListener("transitionend", te);
      });
    } else {
      body.style.height = body.scrollHeight + "px";
      requestAnimationFrame(() => (body.style.height = "0px"));
    }
  }

  function openAccordionRow(key, opts = {}) {
    const row = document.getElementById("acc-" + key);
    if (!row) return;
    if (openAccRow && openAccRow !== row) {
      openAccRow.classList.remove("is-open");
      openAccRow.querySelector(".acc-row__head").setAttribute("aria-expanded", "false");
      setAccHeight(openAccRow.querySelector(".acc-row__body"), false);
    }
    const body = row.querySelector(".acc-row__body");
    const opening = !row.classList.contains("is-open");
    if (!opening && opts.allowClose === false) return;
    row.classList.toggle("is-open", opening);
    row.querySelector(".acc-row__head").setAttribute("aria-expanded", String(opening));
    setAccHeight(body, opening);
    openAccRow = opening ? row : null;
    if (opening) {
      currentSpace = key;
      userChoseSpace = userChoseSpace || !!opts.byUser;
      setSelectedStates(key === DEFAULT_SPACE ? "" : key);
      writePanel(key);
      syncFormSpace();
      if (opts.byUser) history.replaceState(null, "", "#space-" + key);
    }
  }

  accWrap.addEventListener("click", e => {
    const enquire = e.target.closest("[data-enquire]");
    if (enquire) { goToEnquire(enquire.dataset.enquire); return; }
    const head = e.target.closest(".acc-row__head");
    if (head) openAccordionRow(head.closest(".acc-row").dataset.space, { byUser: true });
  });

  function setSpacesView(mode, opts = {}) {
    if (mode === spacesViewMode && !opts.force) return;
    spacesViewMode = mode;
    document.querySelectorAll("#spacesView .seg button").forEach(b => {
      const on = b.dataset.view === mode;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    const showAcc = mode === "accordion";
    cardsWrap.hidden = showAcc;
    accWrap.hidden = !showAcc;
    if (showAcc) {
      // carry the current selection into the list view
      openAccordionRow(currentSpace, { allowClose: false });
      if (hasGsap) ScrollTrigger.refresh();
    } else {
      writePanel(currentSpace);
      setSelectedStates(currentSpace === DEFAULT_SPACE ? "" : currentSpace);
      if (hasGsap) ScrollTrigger.refresh();
    }
  }

  document.querySelectorAll("#spacesView .seg button").forEach(b => {
    b.addEventListener("click", () => setSpacesView(b.dataset.view));
  });

  /* ==========================================================
     ENQUIRY FORM — space select + event type
     ========================================================== */
  const spaceSelect = document.getElementById("spaceSelect");
  const spaceSelectBtn = spaceSelect.querySelector("button");
  const spaceSelectVal = document.getElementById("spaceSelectVal");
  const spaceSelectHint = document.getElementById("spaceSelectHint");
  const spaceSelectMenu = document.getElementById("spaceSelectMenu");

  function buildSpaceMenu() {
    spaceSelectMenu.innerHTML = Object.keys(SPACES).map(key =>
      `<button type="button" role="option" data-space="${key}" aria-selected="${key === currentSpace}">${SPACES[key].name}</button>`).join("");
  }
  function syncFormSpace() {
    spaceSelectVal.textContent = SPACES[currentSpace].name;
    spaceSelectHint.textContent = userChoseSpace ? "— carried from your selection" : "";
    spaceSelectMenu.querySelectorAll("button").forEach(b =>
      b.setAttribute("aria-selected", String(b.dataset.space === currentSpace)));
  }
  spaceSelectBtn.addEventListener("click", () => {
    const open = spaceSelect.classList.toggle("is-open");
    spaceSelectBtn.setAttribute("aria-expanded", String(open));
  });
  spaceSelectMenu.addEventListener("click", e => {
    const b = e.target.closest("button[data-space]");
    if (!b) return;
    selectSpace(b.dataset.space, { byUser: true, noScroll: true });
    spaceSelect.classList.remove("is-open");
    spaceSelectBtn.setAttribute("aria-expanded", "false");
  });
  document.addEventListener("click", e => {
    if (!spaceSelect.contains(e.target)) {
      spaceSelect.classList.remove("is-open");
      spaceSelectBtn.setAttribute("aria-expanded", "false");
    }
  });

  /* ==========================================================
     EVENT TYPE — re-theme, never reset space selection
     ========================================================== */
  const lensTitle = document.getElementById("lensTitle");
  const lensCards = document.getElementById("lensCards");
  const variantEls = {
    heroLede: document.querySelector('[data-hero="lede"]'),
    heroCta: document.getElementById("heroCta"),
    overviewHead: document.getElementById("overviewHead"),
    overviewIntro: document.getElementById("overviewIntro"),
    enquireHead: document.getElementById("enquireHead"),
    enquireSub: document.getElementById("enquireSub"),
    enquireCta: document.getElementById("enquireCta"),
    enquireCta2: document.getElementById("enquireCta2")
  };

  function setEventType(type, opts = {}) {
    if (!VARIANTS[type] || type === currentEventType) { markEventTypeUI(type); return; }
    currentEventType = type;
    markEventTypeUI(type);
    const V = VARIANTS[type];
    const heroEl = document.getElementById("heroImg");
    const heroChanging = heroEl.dataset.variantSrc !== V.heroImg;

    const apply = () => {
      if (heroChanging) {
        heroEl.src = V.heroImg;
        heroEl.alt = V.heroAlt;
        heroEl.dataset.variantSrc = V.heroImg;
      }
      variantEls.heroLede.textContent = V.heroLede;
      variantEls.heroCta.textContent = V.heroCta;
      variantEls.overviewHead.textContent = V.overviewHead;
      variantEls.overviewIntro.textContent = V.overviewIntro;
      lensTitle.textContent = V.lensTitle;
      lensCards.querySelectorAll(".lens-card").forEach((card, i) => {
        const img = card.querySelector("[data-lens-img]");
        if (img.getAttribute("src") !== V.lensCards[i].img) {
          img.src = V.lensCards[i].img;
          img.alt = V.lensCards[i].alt;
        }
        card.querySelector("[data-lens-title]").textContent = V.lensCards[i].t;
        card.querySelector("[data-lens-desc]").textContent = V.lensCards[i].d;
      });
      variantEls.enquireHead.textContent = V.enquireHead;
      variantEls.enquireSub.textContent = V.enquireSub;
      variantEls.enquireCta.textContent = V.enquireCta;
      variantEls.enquireCta2.textContent = V.enquireCta2;
      // re-theme space cards' use-case lines (selection untouched)
      grid.querySelectorAll(".space-card").forEach(card => {
        const tags = card.querySelector("[data-space-tags]");
        if (tags) tags.textContent = SPACES[card.dataset.space].tags[type];
      });
      accWrap.querySelectorAll(".acc-row").forEach(row => {
        row.querySelector("[data-acc-tags]").textContent = SPACES[row.dataset.space].tags[type];
      });
    };

    const swapNodes = [
      ...(heroChanging ? [heroEl] : []),
      variantEls.heroLede, ...document.querySelectorAll('[data-hero="actions"] .btn'),
      variantEls.overviewHead, variantEls.overviewIntro,
      lensTitle, lensCards,
      variantEls.enquireHead, variantEls.enquireSub,
      variantEls.enquireCta, variantEls.enquireCta2
    ];

    if (reduceMotion || !hasGsap || opts.instant) { apply(); return; }
    gsap.to(swapNodes, { opacity: 0, y: 8, duration: 0.22, ease: "power2.in", onComplete() {
      apply();
      gsap.to(swapNodes, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", clearProps: "opacity,transform" });
    }});
  }

  function markEventTypeUI(type) {
    document.querySelectorAll("#eventTypeSeg button, #formEventType button").forEach(b => {
      const on = b.dataset.eventType === type;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
  }

  document.querySelectorAll("#eventTypeSeg button, #formEventType button").forEach(b => {
    b.addEventListener("click", () => setEventType(b.dataset.eventType));
  });

  /* ==========================================================
     HEADER — compact on scroll, hide on fast downward scroll
     ========================================================== */
  const header = document.getElementById("siteHeader");
  const subnav = document.getElementById("subnav");
  let lastY = window.scrollY;

  function onScrollHeader() {
    const y = window.scrollY;
    const compact = y > 40;
    header.classList.toggle("is-compact", compact);
    if (y > 600 && y > lastY + 4) {
      header.classList.add("is-hidden");
      subnav.classList.remove("under-header");
    } else if (y < lastY - 4 || y < 600) {
      header.classList.remove("is-hidden");
      subnav.classList.toggle("under-header", compact);
    }
    lastY = y;
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ==========================================================
     SCROLLSPY
     ========================================================== */
  const spyLinks = Array.from(document.querySelectorAll("#subnavLinks a"));
  const spyTargets = spyLinks.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        spyLinks.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  spyTargets.forEach(t => spy.observe(t));

  /* ==========================================================
     HERO — pause control
     ========================================================== */
  const heroPause = document.getElementById("heroPause");
  const heroImg = document.getElementById("heroImg");
  heroPause.addEventListener("click", () => {
    const paused = heroImg.classList.toggle("is-paused");
    heroPause.setAttribute("aria-pressed", String(paused));
    heroPause.querySelector(".pill").textContent = paused ? "▶" : "❙❙";
    heroPause.querySelector(".lbl").textContent = paused ? "Play video" : "Pause video";
  });

  /* ==========================================================
     FAQ
     ========================================================== */
  document.querySelectorAll(".faq-item > button").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const answer = item.querySelector(".answer");
      const open = item.classList.contains("is-open");

      // close others
      document.querySelectorAll(".faq-item.is-open").forEach(o => {
        if (o === item) return;
        o.classList.remove("is-open");
        o.querySelector("button").setAttribute("aria-expanded", "false");
        o.querySelector(".sign").textContent = "+";
        const a = o.querySelector(".answer");
        a.style.height = a.scrollHeight + "px";
        requestAnimationFrame(() => (a.style.height = "0px"));
      });

      item.classList.toggle("is-open", !open);
      btn.setAttribute("aria-expanded", String(!open));
      item.querySelector(".sign").textContent = open ? "+" : "−";
      if (open) {
        answer.style.height = answer.scrollHeight + "px";
        requestAnimationFrame(() => (answer.style.height = "0px"));
      } else {
        answer.style.height = answer.scrollHeight + "px";
        answer.addEventListener("transitionend", function te() {
          answer.style.height = "auto";
          answer.removeEventListener("transitionend", te);
        });
      }
    });
  });

  /* ==========================================================
     GALLERY — arrows + counter
     ========================================================== */
  const track = document.getElementById("galTrack");
  const items = Array.from(track.children);
  const counter = document.getElementById("galCounter");
  let galIndex = 0;

  function galTo(i) {
    galIndex = (i + items.length) % items.length;
    const x = items.slice(0, galIndex).reduce((acc, el) => acc + el.getBoundingClientRect().width + 20, 0);
    track.style.transform = `translateX(${-x}px)`;
    counter.textContent = String(galIndex + 1).padStart(2, "0") + " — " + String(items.length).padStart(2, "0");
    items.forEach((el, idx) => el.classList.toggle("is-front", idx === galIndex));
  }
  document.getElementById("galNext").addEventListener("click", () => galTo(galIndex + 1));
  document.getElementById("galPrev").addEventListener("click", () => galTo(galIndex - 1));
  window.addEventListener("resize", () => galTo(galIndex));

  /* ==========================================================
     LAZY IMAGES — fade in on load
     ========================================================== */
  function bindLazy(scope = document) {
    scope.querySelectorAll("img").forEach(img => {
      if (img.dataset.lazyBound) return;
      img.dataset.lazyBound = "1";
      if (img.complete && img.naturalWidth) { img.classList.add("is-loaded"); return; }
      img.addEventListener("load", () => img.classList.add("is-loaded"), { once: true });
      img.addEventListener("error", () => img.classList.add("is-loaded"), { once: true });
    });
  }

  /* ==========================================================
     GSAP — reveals, splits, parallax
     ========================================================== */
  function initMotion() {
    if (!hasGsap || reduceMotion) {
      // no-motion path: everything visible immediately
      document.querySelectorAll("[data-reveal], [data-reveal-group] > *, [data-split]").forEach(el => {
        el.style.opacity = "1";
        el.style.visibility = "visible";
      });
      document.querySelectorAll(".reveal-img").forEach(el => (el.style.clipPath = "none"));
      document.querySelectorAll(".reveal-img > img").forEach(el => (el.style.transform = "none"));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const hasSplit = typeof SplitText !== "undefined";
    if (hasSplit) gsap.registerPlugin(SplitText);

    /* --- hero entrance --- */
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
      .from(".hero__media img", { scale: 1.12, duration: 1.6, ease: "power2.out" }, 0)
      .from('[data-hero="eyebrow"] .rule', { scaleX: 0, duration: 0.9 }, 0.35)
      .from('[data-hero="eyebrow"] span:last-child', { opacity: 0, y: 14, duration: 0.8, clearProps: "opacity,transform" }, 0.45);

    const h1 = document.querySelector('[data-hero="title"]');
    if (hasSplit) {
      const split = new SplitText(h1, { type: "chars,lines", linesClass: "split-line" });
      heroTl.from(split.chars, { yPercent: 110, duration: 1.1, stagger: 0.028, ease: "power4.out" }, 0.55);
      h1.style.overflow = "hidden";
    } else {
      heroTl.from(h1, { opacity: 0, y: 40, duration: 1 }, 0.55);
    }
    heroTl
      .from('[data-hero="lede"]', { opacity: 0, y: 24, duration: 0.9, clearProps: "opacity,transform" }, 0.95)
      .from('[data-hero="actions"] .btn', { opacity: 0, y: 20, duration: 0.7, stagger: 0.1, clearProps: "opacity,transform" }, 1.1)
      .from(".hero__video-ctl", { opacity: 0, duration: 0.8 }, 1.3);

    /* --- headline line reveals --- */
    document.querySelectorAll("[data-split]").forEach(el => {
      const make = () => {
        if (hasSplit) {
          const split = new SplitText(el, { type: "lines", linesClass: "split-line", tag: "span" });
          // wrap inner span for the mask rise
          split.lines.forEach(line => {
            const inner = document.createElement("span");
            inner.innerHTML = line.innerHTML;
            line.innerHTML = "";
            line.appendChild(inner);
          });
          el.classList.add("is-split");
          gsap.from(el.querySelectorAll(".split-line > span"), {
            yPercent: 115,
            duration: 1.05,
            stagger: 0.09,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true }
          });
        } else {
          el.classList.add("is-split");
          gsap.from(el, {
            opacity: 0, y: 36, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true }
          });
        }
      };
      if (document.fonts && document.fonts.status !== "loaded") {
        document.fonts.ready.then(make);
      } else make();
    });

    /* --- generic fade-up reveals --- */
    document.querySelectorAll("[data-reveal]").forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true }
      });
    });

    /* --- staggered groups (stats, lists, cards) --- */
    document.querySelectorAll("[data-reveal-group]").forEach(group => {
      gsap.fromTo(group.children, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: group, start: "top 85%", once: true }
      });
    });

    /* --- image reveals: clip rise + inner settle --- */
    document.querySelectorAll(".reveal-img").forEach(el => {
      const inner = el.querySelector("img, .media-fill");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
        defaults: { ease: "power3.out" }
      });
      tl.to(el, { clipPath: "inset(0 0 0% 0)", duration: 1.2 }, 0);
      if (inner) tl.to(inner, { scale: 1, duration: 1.5 }, 0);
    });

    /* --- parallax scrub on large media --- */
    document.querySelectorAll("[data-parallax]").forEach(el => {
      const strength = parseFloat(el.dataset.parallax) || 0.08;
      const img = el.querySelector("img");
      if (!img) return;
      gsap.fromTo(img, { yPercent: -strength * 100 }, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
      });
    });

    /* --- architecture column stagger (image stacking) --- */
    const stack = gsap.utils.toArray(".architecture .col-b > *");
    if (stack.length) {
      gsap.fromTo(stack, { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 1, stagger: 0.18, ease: "power3.out",
        scrollTrigger: { trigger: ".architecture .col-b", start: "top 80%", once: true }
      });
    }

    ScrollTrigger.refresh();
  }

  /* ==========================================================
     INIT
     ========================================================== */
  buildCards();
  buildAccordion();
  buildSpaceMenu();
  writePanel(DEFAULT_SPACE);
  bindLazy();
  panelImg.addEventListener("load", () => panelImg.classList.add("is-loaded"));
  galTo(0);

  // same-document hash navigation (e.g. links to #space-lume after load)
  window.addEventListener("hashchange", () => {
    const hm = location.hash.match(/^#space-([a-z]+)$/);
    if (hm && SPACES[hm[1]]) {
      userChoseSpace = true;
      selectSpace(hm[1], { noScroll: true });
      setSelectedStates(hm[1] === DEFAULT_SPACE ? "" : hm[1]);
      document.getElementById("spaces").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
  });

  // deep link: #space-lume opens with that space loaded
  const m = location.hash.match(/^#space-([a-z]+)$/);
  if (m && SPACES[m[1]]) {
    userChoseSpace = true;
    selectSpace(m[1], { noScroll: true });
    setSelectedStates(m[1] === DEFAULT_SPACE ? "" : m[1]);
    // land on the spaces section
    requestAnimationFrame(() => {
      document.getElementById("spaces").scrollIntoView({ behavior: "auto", block: "start" });
      if (isMobile()) {
        const card = document.getElementById("card-" + m[1]);
        if (card) toggleDetail(m[1], card);
      }
    });
  } else {
    syncFormSpace();
  }

  document.getElementById("heroImg").dataset.variantSrc = VARIANTS[currentEventType].heroImg;
  markEventTypeUI(currentEventType);
  initMotion();
})();
