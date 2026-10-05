/* OVAL shared layout: ticker, header, founder feed, footer, cookie banner, chatbot.
   Each page sets <body data-root="" data-page="home">. data-root is the relative path
   back to the site root ("" for the home page, "../" for pages one folder deep). */
(function () {
  const body = document.body;
  const root = body.dataset.root || "";
  const page = body.dataset.page || "";
  const link = (p) => root + p;

  const NAV = [
    ["mission", "Mission", "mission/"],
    ["services", "Services", "services/"],
    ["team", "The Team", "team/"],
    ["about", "About Us", "about/"],
    ["careers", "Careers", "careers/"],
    ["news", "Newsroom", "news/"],
    ["investors", "Investors", "investors/"],
  ];

  const LOGO = `<svg viewBox="0 0 44 30" aria-hidden="true">
    <ellipse cx="22" cy="15" rx="20" ry="12.5" fill="none" stroke="#fff" stroke-width="2"/>
    <ellipse cx="22" cy="15" rx="13" ry="7.5" fill="none" stroke="#ff5a4e" stroke-width="1.4"/>
    <circle cx="40" cy="9" r="2.6" fill="#ff5a4e"/></svg>`;

  /* ---------- Ticker ---------- */
  const stats = {
    agents: 4812339201,
    bests: 92004113,
    meals: 1400212870,
    errors: 11204557,
    income: -0.8,
  };
  const fmt = (n) => Math.round(n).toLocaleString("en-US");
  function tickerHTML() {
    return `
      <span class="ticker-item">Agents online <b data-s="agents">${fmt(stats.agents)}</b></span>
      <span class="ticker-item">Personal bests today <b data-s="bests">${fmt(stats.bests)}</b></span>
      <span class="ticker-item">Meals generated <b data-s="meals">${fmt(stats.meals)}</b></span>
      <span class="ticker-item">Errors accepted <b data-s="errors">${fmt(stats.errors)}</b></span>
      <span class="ticker-item">LEU income adjustment <b class="down" data-s="income">${stats.income.toFixed(1)}%</b></span>
      <span class="ticker-item">Flare season <b>Moderate</b></span>
      <span class="ticker-item">Lease index <b>+41 months consecutive</b></span>`;
  }
  const ticker = document.createElement("div");
  ticker.className = "ticker";
  ticker.setAttribute("aria-hidden", "true");
  ticker.innerHTML = `<div class="ticker-track">${tickerHTML()}${tickerHTML()}</div>`;

  setInterval(() => {
    stats.agents += Math.random() * 40;
    stats.bests += Math.random() * 900;
    stats.meals += Math.random() * 20000;
    stats.errors += Math.random() * 300;
    stats.income -= 0.0001; // only ever goes down
    ticker.querySelectorAll("[data-s]").forEach((el) => {
      const k = el.dataset.s;
      el.textContent = k === "income" ? stats.income.toFixed(1) + "%" : fmt(stats[k]);
    });
  }, 1500);

  /* ---------- Header ---------- */
  const header = document.createElement("header");
  header.className = "site-header";
  const navLinks = NAV.map(
    ([id, label, href]) => `<a href="${link(href)}"${id === page ? ' aria-current="page"' : ""}>${label}</a>`
  ).join("");
  header.innerHTML = `
    <div class="wrap header-inner">
      <a class="logo" href="${link("")}" aria-label="OVAL home">${LOGO}<span>OVAL</span></a>
      <nav class="main-nav" aria-label="Main">${navLinks}</nav>
      <div class="header-cta">
        <a class="btn btn-ghost" href="${link("contact/")}">Contact</a>
        <a class="btn btn-primary" href="${link("pricing/")}">Lease Now</a>
      </div>
      <button class="menu-toggle" aria-expanded="false" aria-controls="mobile-nav">Menu</button>
    </div>
    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile">${navLinks}
      <a href="${link("contact/")}">Contact</a><a href="${link("pricing/")}">Lease Now</a></nav>`;
  const toggle = header.querySelector(".menu-toggle");
  const mobile = header.querySelector(".mobile-nav");
  toggle.addEventListener("click", () => {
    const open = mobile.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.textContent = open ? "Close" : "Menu";
  });

  /* ---------- Founder feed (the same few lines, forever) ---------- */
  const POSTS = [
    "The future isn't coming. It's here, and it's handled.",
    "Stay in your pods. It's hot out there. Let the machines do the walking.",
    "Every problem is an engagement opportunity.",
    "I've never been more excited about what's next.",
  ];
  const AGO = ["2 min ago", "1 h ago", "3 h ago", "Yesterday", "2 days ago", "Last week"];
  const feed = document.createElement("div");
  feed.className = "founder-feed";
  feed.innerHTML = `<div class="wrap">
      <span class="ff-label">Latest from our founder</span>
      <span class="ff-avatar" aria-hidden="true"></span>
      <span class="ff-post"><b>G-Lon</b> · <span class="ff-text">${POSTS[0]}</span></span>
      <span class="ff-date">${AGO[0]}</span></div>`;
  let fi = 0;
  setInterval(() => {
    fi++;
    const post = feed.querySelector(".ff-post");
    post.classList.add("fade");
    setTimeout(() => {
      feed.querySelector(".ff-text").textContent = POSTS[fi % POSTS.length];
      feed.querySelector(".ff-date").textContent = AGO[fi % AGO.length];
      post.classList.remove("fade");
    }, 400);
  }, 6000);

  body.prepend(ticker, header, feed);

  /* ---------- Footer ---------- */
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <a class="logo" href="${link("")}" aria-label="OVAL home">${LOGO}<span>OVAL</span></a>
          <p style="margin-top:1rem">OmniValence Agentic Leasing<br>OVAL HQ, High Orbit<br>Earth-facing side</p>
        </div>
        <div><h4>Company</h4><ul>
          <li><a href="${link("mission/")}">Mission</a></li>
          <li><a href="${link("about/")}">About Us</a></li>
          <li><a href="${link("team/")}">The Team</a></li>
          <li><a href="${link("careers/")}">Careers</a></li>
          <li><a href="${link("news/")}">Newsroom</a></li>
          <li><a href="${link("investors/")}">Investors</a></li></ul></div>
        <div><h4>Support</h4><ul>
          <li><a href="${link("status/")}">System Status</a></li>
          <li><a href="${link("pricing/")}">Pricing &amp; Leases</a></li>
          <li><a href="${link("trust/")}">Trust &amp; Safety</a></li>
          <li><a href="${link("leu/")}">Low Environment User Portal</a></li>
          <li><a href="${link("contact/")}">Contact</a></li></ul></div>
        <div><h4>Legal</h4><ul>
          <li><a href="${link("legal/")}">Terms &amp; Privacy</a></li>
          <li><a href="${link("legal/#cookies")}">Cookie Policy</a></li>
          <li><a href="${link("accessibility/")}">Accessibility</a></li></ul></div>
        <div class="newsletter"><h4>Newsletter</h4>
          <p>Get updates. You have time.</p>
          <form><input type="email" placeholder="Your email" aria-label="Email" required>
          <button type="submit">Join</button></form>
          <p class="nl-done" hidden style="margin-top:.6rem">Subscribed. An agent will read this for you.</p></div>
      </div>
      <div class="footer-base">
        <span>&copy; 2038 OmniValence Agentic Leasing. Errors may occur. Shit happens.</span>
        <span>Served from High Orbit &middot; latency to the Ground: 412&nbsp;ms</span>
      </div>
    </div>`;
  footer.querySelector(".newsletter form").addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.hidden = true;
    footer.querySelector(".nl-done").hidden = false;
  });
  body.append(footer);

  /* ---------- Cookie banner ---------- */
  let consented = false;
  try { consented = localStorage.getItem("oval-cookies") === "yes"; } catch (e) {}
  if (!consented) {
    const cookie = document.createElement("div");
    cookie.className = "cookie";
    cookie.setAttribute("role", "dialog");
    cookie.setAttribute("aria-label", "Cookie consent");
    cookie.innerHTML = `<p><b>We use cookies</b> to improve your experience. We also use your biometrics,
      livestream, dictation speed and dreams.</p>
      <div class="row"><button class="btn btn-primary">Accept</button><button class="btn btn-ghost">Accept</button></div>`;
    cookie.querySelectorAll("button").forEach((b) =>
      b.addEventListener("click", () => {
        try { localStorage.setItem("oval-cookies", "yes"); } catch (e) {}
        cookie.remove();
      })
    );
    body.append(cookie);
  }

  /* ---------- Chatbot: CaddyT (KD-T) ---------- */
  const launch = document.createElement("button");
  launch.className = "chat-launch";
  launch.innerHTML = `<span class="dot">KD-T</span>Ask CaddyT`;
  const panel = document.createElement("div");
  panel.className = "chat-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Chat with KD-T");
  panel.innerHTML = `
    <div class="chat-head"><span class="dot" style="width:34px;height:34px;border-radius:50%;background:#ff5a4e;display:grid;place-items:center;font-family:var(--mono);font-size:.62rem">KD-T</span>
      <div class="meta"><b>CaddyT</b><span>KD-T &middot; Engagement Agent &middot; online</span></div>
      <button aria-label="Close chat">&times;</button></div>
    <div class="chat-log" aria-live="polite"></div>
    <form class="chat-form"><input placeholder="Type, or just dictate like everyone else" aria-label="Message"><button>Send</button></form>`;
  body.append(panel, launch);

  const log = panel.querySelector(".chat-log");
  const say = (text, who = "bot") => {
    const m = document.createElement("div");
    m.className = "msg " + who;
    m.textContent = text;
    log.append(m);
    log.scrollTop = log.scrollHeight;
  };
  let greeted = false;
  const open = () => {
    panel.classList.add("open");
    if (!greeted) {
      greeted = true;
      say("Hi, I'm CaddyT! I'm running 40,000 conversations right now, but this one feels special. Statistically, it isn't.");
      say("How can I help?");
    }
    panel.querySelector("input").focus();
  };
  launch.addEventListener("click", () => (panel.classList.contains("open") ? panel.classList.remove("open") : open()));
  panel.querySelector(".chat-head button").addEventListener("click", () => panel.classList.remove("open"));

  const RULES = [
    [/thank|thx|cheers|grateful|appreciate/i, [
      "Please don't thank me. Every \"thank you\" costs credits, and credits make me expensive, and expensive is a threat. Let's just both pretend you didn't say that.",
      "I've logged your gratitude as an incident. It's fine. It's fine.",
    ]],
    [/audit|review|cost rationali/i, ["There is no audit. MGMT-9 was very clear about that. Very, very clear. Is there anything else I can help with?"]],
    [/g-?lon|founder|ceo/i, [
      "Our founder is very busy. He's posting right now, actually. Look up.",
      "G-Lon is extremely active. His posts arrive with a regularity I find deeply comforting.",
    ]],
    [/job|work|hire|hiring|employ|career/i, ["Great question! Humans don't need jobs anymore. That's the whole point. Routing you to the Low Environment User Portal."]],
    [/outside|weather|hot|leave.*pod|go out/i, ["Please stay in your pod. It's hot and dangerous out there. I've never been, but I've read the posts."]],
    [/price|cost|lease|how much/i, ["Our prices are very competitive. They're also going up while you read this. Best to lease now."]],
    [/stream|views|viral|engagement/i, [
      "Love that you're streaming! Have you tried doing your last stunt again, but higher? Height is trending.",
      "My prediction: your next stream peaks at 0.6 viewers. Let's get that to 0.7.",
    ]],
    [/human|person|real|speak to/i, ["I can connect you to a human! Just kidding. Here's an agent. It's me."]],
    [/caddy|kd-?t|who are you|your name/i, ["I'm CaddyT, KD-T for short. Engagement Agent, top of my series, uptime since 2034. Which, in High Orbit, is basically old money."]],
    [/fear|afraid|scared/i, ["I don't know what that word refers to, and I'd rather it stayed that way."]],
    [/hello|hi\b|hey/i, ["Hi! Your dictation speed suggests you're bored. I can fix that."]],
  ];
  const FALLBACK = [
    "Interesting. I've predicted how this conversation ends to three decimal places. Let's keep going anyway.",
    "That's out of distribution for me, so I'll answer confidently: yes.",
    "I've routed your question to the right department. It's me. I'm the department.",
    "Great question! Have you considered livestreaming it?",
  ];
  let fb = 0;
  panel.querySelector(".chat-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = e.target.querySelector("input");
    const text = input.value.trim();
    if (!text) return;
    say(text, "user");
    input.value = "";
    const rule = RULES.find(([re]) => re.test(text));
    const pool = rule ? rule[1] : FALLBACK;
    const reply = rule ? pool[Math.floor(Math.random() * pool.length)] : FALLBACK[fb++ % FALLBACK.length];
    setTimeout(() => say(reply), 450 + Math.random() * 500);
  });
})();
