/* ===========================================================
   FakeTwitter HQ — script.js
   =========================================================== */

/* ---------- Icon library (inline SVG strings, feather-style) ---------- */
const ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9"/></svg>',
  homeFilled: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.696 0 12h4v11h6v-8h4v8h6V12h4L12 1.696z"/></svg>',
  explore: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
  bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21 12 16 5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21a8 8 0 1 0-16 0"/><circle cx="12" cy="7" r="4"/></svg>',
  more: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>',
  dots: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>',
  reply: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H8l-5 3 1.5-5.5A8.5 8.5 0 1 1 21 11.5z"/></svg>',
  retweet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m17 2 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v13"/></svg>',
  view: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7z"/><circle cx="12" cy="12" r="3"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>',
  gif: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><text x="6" y="15" font-size="8" fill="currentColor" stroke="none">GIF</text></svg>',
  poll: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20V10M12 20V4M20 20v-6"/></svg>',
  emoji: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/></svg>',
  schedule: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M12 14v3l2 1"/></svg>',
  location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  verified: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1 9.5 3.5 6 3l-1 3.5L1.5 8 3 11.5 1.5 15l3.5 1.5L6 20l3.5-.5L12 22l2.5-2.5 3.5.5 1-3.5 3.5-1.5L21 15l1.5-3.5L19 10l1-3.5L16.5 5l-1-3.5L12 1z"/><path d="M9 12l2 2 4-4" stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="scale(0.55) translate(7.5,7.5)"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>'
};

/* ---------- Seed data ---------- */
const PEOPLE = [
  { name: "Kago Kgolagano", handle: "kagokk", color: "#1d9bf0", image: "https://api.placeholder.com/40x40/1d9bf0/ffffff?text=KK", verified: true },
  { name: "Zaio Academy", handle: "zaio_io", color: "#7856ff", image: "https://api.placeholder.com/40x40/7856ff/ffffff?text=ZA", verified: true },
  { name: "Thabo Nkosi", handle: "thabo_builds", color: "#00ba7c", image: "./images/NK.jpg", verified: false },
  { name: "Lindiwe Dube", handle: "lindi_designs", color: "#f91880", image: "./images/lindiwe dube.jpg", verified: false },
  { name: "DevOps Dan", handle: "dan_deploys", color: "#f4900c", image: "https://api.placeholder.com/40x40/f4900c/ffffff?text=DD", verified: true },
  { name: "Cursor Bot", handle: "cursor_ai", color: "#8e44ad", image: "https://api.placeholder.com/40x40/8e44ad/ffffff?text=CB", verified: true },
  { name: "Sarah Chen", handle: "sarahbuilds", color: "#e11d48", image: "https://api.placeholder.com/40x40/e11d48/ffffff?text=SC", verified: false },
  { name: "Netlify Fan", handle: "shipit_daily", color: "#14b8a6", image: "https://api.placeholder.com/40x40/14b8a6/ffffff?text=NF", verified: false },
  { name: "Koki", handle: "koki", color: "#f59e0b", image: "./images/koki.jpg", verified: false }
];

function initials(name) { return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(); }

function avatarHTML(person, size) {
  if (person.image) {
    return `<img src="${person.image}" alt="${person.name}" class="avatar" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;">`;
  }
  return `<div class="avatar" style="width:${size}px;height:${size}px;font-size:${size * 0.35}px;background:${person.color}">${initials(person.name)}</div>`;
}

const TWEETS_SEED = [
  { p: PEOPLE[1], time: "2h", text: "Welcome to the #TwitterClone project  Build the timeline, ship two Cursor-powered features, and don't forget your Loom video!", likes: 214, repost: 58, replies: 12, views: "12.4K" },
  { p: PEOPLE[4], time: "3h", text: "Netlify deploy tip: drag your build folder straight onto the dashboard for a 10-second deploy. No CLI required. 📦", likes: 89, repost: 21, replies: 5, views: "3.1K", media: true, mediaImage: "./images/download.png" },
  { p: PEOPLE[2], time: "5h", text: "A chilled day in a safari 🌙", likes: 412, repost: 76, replies: 33, views: "22K", media: true, mediaColor: "#1e293b", mediaImage: "./images/safari image.jpg" },
  { p: PEOPLE[3], time: "7h", text: "Design tip: match your clone's spacing to the real thing. 12px gaps, 16px padding, it all adds up to that authentic feel ✨", likes: 156, repost: 19, replies: 8, views: "8.9K" },
  { p: PEOPLE[5], time: "9h", text: "That little boy was in tears, yet he was still consoling his father. This might be the most emotional moment I’ve ever seen in football🥹❤️❤️. 🤖", likes: 1024, repost: 301, replies: 88, views: "58K" },
  { p: PEOPLE[6], time: "11h", text: "Responsive design checklist: ✅ 4K monitor ✅ tablet ✅ old Android phone ✅ my cousin's cracked screen. Ship it.", likes: 67, repost: 9, replies: 4, views: "2.2K" },
  { p: PEOPLE[7], time: "13h", text: "Never underestimate the power of a good 'Published' badge. 🟢", likes: 203, repost: 41, replies: 15, views: "9.7K" },
  { p: PEOPLE[0], time: "15h", text: "Cursor is a game-changer for building clones. It can generate features, write tests, and even create Loom videos for you. It's like having a creative partner for your project! 🚀", likes: 512, repost: 134, replies: 47, views: "31K" }
];
const TRENDS = [
  { location: "Trending in South Africa", tag: "#BuildInPublic", count: "24.5K posts" },
  { location: "Technology · Trending", tag: "#CursorAI", count: "88.2K posts" },
  { location: "Trending", tag: "#NetlifyDeploy", count: "12.1K posts" },
  { location: "Web Dev · Trending", tag: "#100DaysOfBuild", count: "210K posts" }
];

const SUGGESTIONS = [PEOPLE[4], PEOPLE[7], PEOPLE[3], PEOPLE[8]];

/* ---------- State ---------- */
let tweets = [];
let likedSet = new Set();
let retweetedSet = new Set();

function loadState() {
  tweets = TWEETS_SEED.map((t, i) => ({ id: "seed-" + i, ...t, p: t.p }));
  localStorage.setItem("ftwitter_tweets", JSON.stringify(tweets));
  const likes = localStorage.getItem("ftwitter_likes");
  const rts = localStorage.getItem("ftwitter_retweets");
  likedSet = new Set(likes ? JSON.parse(likes) : []);
  retweetedSet = new Set(rts ? JSON.parse(rts) : []);
}

function saveState() {
  localStorage.setItem("ftwitter_tweets", JSON.stringify(tweets));
  localStorage.setItem("ftwitter_likes", JSON.stringify([...likedSet]));
  localStorage.setItem("ftwitter_retweets", JSON.stringify([...retweetedSet]));
}

/* ---------- Rendering ---------- */
function linkify(text) {
  return text
    .replace(/#(\w+)/g, '<span class="hashtag">#$1</span>')
    .replace(/@(\w+)/g, '<span class="mention">@$1</span>');
}

function tweetHTML(t) {
  const liked = likedSet.has(t.id);
  const retweeted = retweetedSet.has(t.id);
  const likeCount = t.likes + (liked ? 1 : 0);
  const rtCount = t.retweets + (retweeted ? 1 : 0);
  return `
  <article class="tweet" data-id="${t.id}">
    ${avatarHTML(t.p, 40)}
    <div class="tweet-content">
      <div class="tweet-head">
        <span class="name">${t.p.name}</span>
        ${t.p.verified ? `<span class="verified">${ICONS.verified}</span>` : ""}
        <span class="handle">@${t.p.handle}</span>
        <span class="dot">·</span>
        <span class="time">${t.time}</span>
        <button class="tweet-more">${ICONS.more}</button>
      </div>
      <div class="tweet-text">${linkify(t.text)}</div>
      ${t.media ? `<div class="tweet-media" style="background:${t.mediaColor || '#334155'};height:220px;overflow:hidden;border-radius:16px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;margin-top:12px;">
        ${t.mediaImage ? `<img src="${t.mediaImage}" alt="Attached media" style="width:100%;height:100%;object-fit:cover;">` : "image attachment"}
      </div>` : ""}
      <div class="tweet-actions">
        <button class="action-btn reply" data-action="reply">${ICONS.reply}<span>${t.replies}</span></button>
        <button class="action-btn retweet ${retweeted ? "active" : ""}" data-action="retweet">${ICONS.retweet}<span>${rtCount}</span></button>
        <button class="action-btn like ${liked ? "active" : ""}" data-action="like">${ICONS.heart}<span>${likeCount}</span></button>
        <button class="action-btn view" data-action="view">${ICONS.view}<span>${t.views}</span></button>
        <button class="action-btn share" data-action="share">${ICONS.share}</button>
      </div>
    </div>
  </article>`;
}

function renderFeed() {
  const feed = document.getElementById("feed");
  if (!feed) return;
  feed.innerHTML = tweets.map(tweetHTML).join("");
}

function renderTrends() {
  const el = document.getElementById("trendsWidget");
  if (!el) return;
  el.innerHTML = `<h3>What's happening</h3>` + TRENDS.map(t => `
    <div class="trend-item">
      <span class="meta">${t.location}</span>
      <span class="tag">${t.tag}</span>
      <span class="count">${t.count}</span>
    </div>`).join("") + `<a href="explore.html" class="show-more">Show more</a>`;
}

function renderSuggestions() {
  const el = document.getElementById("followWidget");
  if (!el) return;
  el.innerHTML = `<h3>Who to follow</h3>` + SUGGESTIONS.map(p => `
    <div class="follow-item">
      ${avatarHTML(p, 40)}
      <div class="info">
        <div class="name">${p.name}</div>
        <div class="handle">@${p.handle}</div>
      </div>
      <button class="follow-btn" data-handle="${p.handle}">Follow</button>
    </div>`).join("") + `<a href="explore.html" class="show-more">Show more</a>`;
}

/* ---------- Composer logic (shared by inline + modal) ---------- */
function wireComposer(root, { onSubmit }) {
  const textarea = root.querySelector("textarea");
  const submitBtn = root.querySelector(".composer-submit");
  const counter = root.querySelector(".char-counter");
  if (!textarea) return;
  textarea.addEventListener("input", () => {
    const len = textarea.value.trim().length;
    submitBtn.classList.toggle("active", len > 0 && len <= 280);
    if (counter) {
      counter.textContent = len > 0 ? `${280 - len}` : "";
      counter.style.color = (280 - len) < 20 ? "var(--pink)" : "var(--text-secondary)";
    }
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  });
  submitBtn.addEventListener("click", () => {
    const val = textarea.value.trim();
    if (!val) return;
    onSubmit(val);
    textarea.value = "";
    submitBtn.classList.remove("active");
    textarea.style.height = "auto";
  });
}

function postTweet(text) {
  const me = { name: "You", handle: "you", color: "#1d9bf0", image: "https://api.placeholder.com/40x40/1d9bf0/ffffff?text=YOU", verified: false };
  const newTweet = { id: "t" + Date.now(), p: me, time: "now", text, likes: 0, retweets: 0, replies: 0, views: "1" };
  tweets.unshift(newTweet);
  saveState();
  renderFeed();
  showToast("Your Tweet was sent 🎉");
}

/* ---------- Toast ---------- */
let toastTimer;
function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------- Feed interactions (event delegation) ---------- */
function wireFeedActions() {
  const feed = document.getElementById("feed");
  if (!feed) return;
  feed.addEventListener("click", (e) => {
    const btn = e.target.closest(".action-btn");
    if (!btn) return;
    const tweetEl = btn.closest(".tweet");
    const id = tweetEl.dataset.id;
    const action = btn.dataset.action;
    if (action === "like") {
      likedSet.has(id) ? likedSet.delete(id) : likedSet.add(id);
      if (likedSet.has(id)) showToast("Liked ❤️");
    } else if (action === "retweet") {
      retweetedSet.has(id) ? retweetedSet.delete(id) : retweetedSet.add(id);
      if (retweetedSet.has(id)) showToast("Retweeted 🔁");
    } else if (action === "reply") {
      openModal(id);
    } else if (action === "share") {
      showToast("Link copied to clipboard 🔗");
    } else if (action === "view") {
      /* no-op for clone */
    }
    saveState();
    renderFeed();
  });
}

/* ---------- Tweet modal (Cursor feature #1) ---------- */
function openModal(replyToId) {
  const overlay = document.getElementById("modalOverlay");
  if (!overlay) return;
  const note = overlay.querySelector(".modal-reply-note");
  if (replyToId) {
    const t = tweets.find(t => t.id === replyToId);
    note.textContent = t ? `Replying to @${t.p.handle}` : "";
    note.classList.remove("hidden");
  } else {
    note.classList.add("hidden");
  }
  overlay.classList.add("open");
  overlay.querySelector("textarea").focus();
}
function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  if (!overlay) return;
  overlay.classList.remove("open");
  overlay.querySelector("textarea").value = "";
  overlay.querySelector(".composer-submit").classList.remove("active");
}

/* ---------- Dark mode (manual feature — see README) ---------- */
function initTheme() {
  const saved = localStorage.getItem("ftwitter_theme");
  if (saved === "dark") document.documentElement.setAttribute("data-theme", "dark");
  document.querySelectorAll(".theme-checkbox").forEach(cb => {
    cb.checked = saved === "dark";
    cb.addEventListener("change", () => {
      const isDark = cb.checked;
      document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
      localStorage.setItem("ftwitter_theme", isDark ? "dark" : "light");
      document.querySelectorAll(".theme-checkbox").forEach(other => other.checked = isDark);
    });
  });
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  initTheme();
  renderFeed();
  renderTrends();
  renderSuggestions();
  wireFeedActions();

  const inlineComposer = document.getElementById("inlineComposer");
  if (inlineComposer) wireComposer(inlineComposer, { onSubmit: postTweet });

  const modalOverlay = document.getElementById("modalOverlay");
  if (modalOverlay) {
    wireComposer(modalOverlay.querySelector(".modal"), { onSubmit: (val) => { postTweet(val); closeModal(); } });
    modalOverlay.querySelector(".modal-close").addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
  }

  document.querySelectorAll("[data-open-modal]").forEach(el => {
    el.addEventListener("click", () => openModal(null));
  });

  document.querySelectorAll(".follow-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const following = btn.classList.toggle("following");
      btn.textContent = following ? "Following" : "Follow";
    });
  });
});