// script.js – Twitter/X Timeline Clone interactivity

(function() {
  "use strict";

  // ----- initial posts (simulated timeline) -----
  const postsData = [
    {
      id: 1,
      name: "Bella",
      handle: "@kim_kwizera",
      time: "15h",
      text: 'OMG 😂😂😂 it\'s like heaven\'s door opening...',
      likes: 24,
      liked: false,
      replies: 3,
      reposts: 2,
      avatar: 'B'
    },
    {
      id: 2,
      name: "Enny mtshweni",
      handle: "@EnnyMtshweni",
      time: "2h",
      text: 'Just finished the Twitter clone project! 🔥 #zaio #coding',
      likes: 12,
      liked: true,
      replies: 5,
      reposts: 1,
      avatar: 'E'
    },
    {
      id: 3,
      name: "Kago Kgolagano",
      handle: "@kago_zaio",
      time: "4h",
      text: 'Building a Twitter clone with HTML, CSS & JS. Loving the process! 🚀',
      likes: 8,
      liked: false,
      replies: 2,
      reposts: 0,
      avatar: 'K'
    }
  ];

  const feedContainer = document.getElementById('feedContainer');
  const tweetInput = document.getElementById('tweetInput');
  const tweetSubmit = document.getElementById('tweetSubmit');

  // ----- render posts -----
  function renderPosts() {
    if (!feedContainer) return;
    feedContainer.innerHTML = '';
    postsData.forEach(post => {
      const postEl = document.createElement('div');
      postEl.className = 'post';
      postEl.dataset.id = post.id;

      const avatarColor = ['#1d9bf0', '#f91880', '#ff7a00', '#794bc4', '#00ba7c'][post.id % 5];
      postEl.innerHTML = `
        <div class="avatar" style="background:${avatarColor};">${post.avatar || '?'}</div>
        <div class="content">
          <div class="user">
            <span class="name">${post.name}</span>
            <span class="handle">${post.handle}</span>
            <span class="time">· ${post.time}</span>
          </div>
          <div class="text">${post.text}</div>
          <div class="actions">
            <i class="far fa-comment" data-action="reply"></i>
            <i class="far fa-retweet" data-action="repost"></i>
            <i class="${post.liked ? 'fas fa-heart liked' : 'far fa-heart'}" data-action="like"></i>
            <i class="far fa-chart-bar" data-action="analytics"></i>
          </div>
        </div>
      `;
      feedContainer.appendChild(postEl);
    });
  }

  // ----- toggle like (data + UI) -----
  function toggleLike(postId) {
    const post = postsData.find(p => p.id === postId);
    if (!post) return;
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;

    const postElement = document.querySelector(`.post[data-id="${postId}"]`);
    if (postElement) {
      const likeIcon = postElement.querySelector('.actions i[data-action="like"]');
      if (likeIcon) {
        likeIcon.className = post.liked ? 'fas fa-heart liked' : 'far fa-heart';
      }
    }
  }

  // ----- add new post (from tweet box) -----
  function addNewPost(text) {
    if (!text.trim()) return false;
    const newPost = {
      id: Date.now(),
      name: "You",
      handle: "@yourhandle",
      time: "now",
      text: text.trim(),
      likes: 0,
      liked: false,
      replies: 0,
      reposts: 0,
      avatar: "Y"
    };
    postsData.unshift(newPost);
    renderPosts();
    return true;
  }

  // ----- event delegation for post actions (like, reply, etc.) -----
  document.addEventListener('click', function(e) {
    // like
    const likeIcon = e.target.closest('[data-action="like"]');
    if (likeIcon) {
      const postEl = likeIcon.closest('.post');
      if (postEl) {
        const id = parseInt(postEl.dataset.id, 10);
        if (!isNaN(id)) toggleLike(id);
      }
      return;
    }

    // other actions (demo)
    const actionIcon = e.target.closest('[data-action="reply"], [data-action="repost"], [data-action="analytics"]');
    if (actionIcon) {
      e.preventDefault();
      alert('✨ Feature coming soon! (this is a demo)');
    }
  });

  // ----- tweet submit -----
  tweetSubmit.addEventListener('click', function(e) {
    e.preventDefault();
    const text = tweetInput.value.trim();
    if (text === '') {
      alert('Write something!');
      return;
    }
    if (addNewPost(text)) {
      tweetInput.value = '';
      tweetInput.style.height = 'auto';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // ----- auto-resize textarea -----
  tweetInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
  });

  // ----- initial render -----
  renderPosts();

})();