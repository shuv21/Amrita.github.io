/* ==========================================================================
   MILES APART, HEARTS TOGETHER - LUXURY ROMANTIC JAVASCRIPT APP ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. STATE & STORAGE MANAGEMENT
  // --------------------------------------------------------------------------
  function getPastDateISO(days) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().slice(0, 10);
  }

  function getFutureDateISO(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 16);
  }

  const defaultState = {
    partner1: 'Shiva',
    partner2: 'Amrita',
    city1: 'Delhi, India',
    city2: 'Hapur, India',
    city1Coords: { lat: 28.6139, lng: 77.2090 },
    city2Coords: { lat: 28.7306, lng: 77.7759 },
    distanceKm: 60,
    distanceMiles: 37,
    reunionDate: '2026-08-21T18:00',
    startDate: '2026-11-27',
    customQuote: 'No matter how many miles separate us, my heart will always find you.',
    currentLetterIdx: 0,
    currentTrackIdx: 0,
    isPlaying: false,
    volume: 0.8,
    isMuted: false
  };

  let state = loadState();

  function loadState() {
    try {
      const saved = localStorage.getItem('romantic_app_state');
      if (!saved) return defaultState;
      const parsed = JSON.parse(saved);
      if (!parsed.startDate || parsed.startDate !== '2026-11-27') {
        parsed.startDate = '2026-11-27';
      }
      if (!parsed.partner1 || parsed.partner1 === 'Alex') {
        parsed.partner1 = 'Shiva';
      }
      if (!parsed.partner2 || parsed.partner2 === 'Maya') {
        parsed.partner2 = 'Amrita';
      }
      if (!parsed.reunionDate || !parsed.reunionDate.startsWith('2026-08-21')) {
        parsed.reunionDate = '2026-08-21T18:00';
      }
      return { ...defaultState, ...parsed };
    } catch (e) {
      return defaultState;
    }
  }

  function saveState() {
    try {
      localStorage.setItem('romantic_app_state', JSON.stringify(state));
    } catch (e) {
      console.warn('LocalStorage restricted');
    }
    updateUIFromState();
  }

  // --------------------------------------------------------------------------
  // 2. MEMORIES DATA
  // --------------------------------------------------------------------------
  const defaultMemories = [
    {
      id: 1,
      title: 'Our First Airport Reunion',
      date: '2024-05-12',
      category: 'travel',
      img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      desc: 'The exact moment I saw you walk out of the arrivals gate. Time stood completely still.',
      likes: 24,
      rotation: -3
    },
    {
      id: 2,
      title: 'Late Night Stargazing',
      date: '2024-08-20',
      category: 'candid',
      img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
      desc: 'Sitting under the clear sky, wrapped in a blanket, talking until the sun came up.',
      likes: 18,
      rotation: 2
    },
    {
      id: 3,
      title: '3 AM Video Call Smiles',
      date: '2024-11-04',
      category: 'calls',
      img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
      desc: 'Even through a screen across 6 time zones, your laugh made my entire week bright.',
      likes: 31,
      rotation: -2
    },
    {
      id: 4,
      title: 'Parisian Coffee Walk',
      date: '2025-02-14',
      category: 'travel',
      img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      desc: 'Holding your warm hand on a chilly morning while sipping hot chocolate together.',
      likes: 42,
      rotation: 4
    },
    {
      id: 5,
      title: 'Sunset Beach Walk',
      date: '2025-06-30',
      category: 'candid',
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      desc: 'The waves touched our feet as we promised that distance would never change us.',
      likes: 29,
      rotation: -1
    },
    {
      id: 6,
      title: 'Virtual Movie Night',
      date: '2025-09-15',
      category: 'calls',
      img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
      desc: 'Counting 3..2..1 to press play together on our favorite romantic film.',
      likes: 19,
      rotation: 3
    }
  ];

  let memories = [...defaultMemories];

  // --------------------------------------------------------------------------
  // 3. LOVE LETTERS DATA
  // --------------------------------------------------------------------------
  const letters = [
    {
      title: "To My Soulmate, When You Miss Me...",
      date: "August 01, 2026",
      body: `My dearest love,\n\nWhenever the miles feel heavy and you wish I was beside you, please close your eyes and place your hand over your heart. That heartbeat you feel is synchronized with mine.\n\nEvery morning I wake up, the first thought in my mind is your smile. Distance is just a test to see how far love can travel, and ours spans the entire universe.\n\nI love you more than words can ever capture.`
    },
    {
      title: "Open When You Can't Sleep At Night...",
      date: "August 01, 2026",
      body: `Hey gorgeous,\n\nI know it's late and the room is quiet. I wish I was there to wrap my arms around you, pull the blanket over us, and whisper soft sweet nothings until you fall asleep.\n\nLook up out your window at the moon. I'm looking at the very same moon right now, sending you a warm bear hug across the night sky. Sleep peacefully, my sweet love.`
    },
    {
      title: "Open On A Rainy Afternoon...",
      date: "August 01, 2026",
      body: `My favorite human,\n\nAs raindrops hit your window, imagine us sitting in a cozy café with two steaming mugs of coffee. No places to rush to, no flight schedules to worry about—just you and me laughing together.\n\nRain always reminds me that after every storm comes the brightest rainbow. Our reunion rainbow is coming very soon!`
    },
    {
      title: "Open On Our Special Anniversary...",
      date: "August 01, 2026",
      body: `My forever love,\n\nHappy Anniversary! Looking back at where we started and how far we've come fills my heart with so much pride and gratitude.\n\nThank you for choosing me every single day. Thank you for your patience, your kindness, and your unconditional warmth. Here's to forever with you!`
    }
  ];

  // --------------------------------------------------------------------------
  // 4. REASONS I LOVE YOU DATA
  // --------------------------------------------------------------------------
  const reasonsData = [
    { num: '01', icon: '💖', title: 'Your Infectious Laugh', desc: 'The way your whole face lights up whenever you laugh makes my heart melt instantly.' },
    { num: '02', icon: '☀️', title: 'Good Morning Texts', desc: 'Sending me sweet morning notes so I wake up feeling loved every single day.' },
    { num: '03', icon: '🎧', title: 'Our Shared Playlist', desc: 'How we listen to the exact same songs together while thousands of miles apart.' },
    { num: '04', icon: '📞', title: '3 AM Video Calls', desc: 'Staying up late just to hear about my day, even when you have an early morning.' },
    { num: '05', icon: '🌟', title: 'Unwavering Support', desc: 'You believe in my dreams even when I doubt myself. You are my biggest anchor.' },
    { num: '06', icon: '🤗', title: 'Your Soft Warm Hugs', desc: 'The feeling of melting into your arms at the airport gate after months apart.' },
    { num: '07', icon: '🍕', title: 'Foodie Adventures', desc: 'Planning every single meal we will eat together on our next upcoming visit.' },
    { num: '08', icon: '🌙', title: 'Looking At Same Moon', desc: 'Knowing that under the same night sky, we are sharing the exact same view.' },
    { num: '09', icon: '💌', title: 'Handwritten Notes', desc: 'The thoughtful letters you hide in my luggage before I board my flight home.' },
    { num: '10', icon: '👑', title: 'Your Kindness', desc: 'The pure, gentle way you treat everyone around you with so much respect.' },
    { num: '11', icon: '🚀', title: 'Our Future Dreams', desc: 'Talking about our future home, cozy living room, and never having to say goodbye.' },
    { num: '12', icon: '♾️', title: 'Simply Being You', desc: 'Because out of 8 billion people on Earth, my heart picked you forever.' }
  ];

  // --------------------------------------------------------------------------
  // 5. CHAT MESSAGES DATA
  // --------------------------------------------------------------------------
  let chatMessages = [
    { sender: 'them', text: 'Good morning my love! ❤️ How did you sleep?', time: '08:30 AM', read: true },
    { sender: 'me', text: 'Morning sweetie! Woke up thinking about you 🥰', time: '08:32 AM', read: true },
    { sender: 'them', text: 'Guess what? Counting down to August 21, 2026 for our reunion! ✈️', time: '08:35 AM', read: true },
    { sender: 'me', text: 'I am counting down every single minute! I miss holding your hand so much.', time: '08:36 AM', read: true },
    { sender: 'them', text: 'Me too... but distance is temporary, and we are forever! Sending you a big warm hug! 🤗❤️', time: '08:40 AM', read: true }
  ];

  // --------------------------------------------------------------------------
  // 6. INITIAL UI SYNC
  // --------------------------------------------------------------------------
  function updateUIFromState() {
    document.getElementById('brand-title').textContent = `${state.partner1} & ${state.partner2}`;
    document.getElementById('footer-couple-names').textContent = `${state.partner1} & ${state.partner2}`;
    document.getElementById('chat-partner-name').textContent = `My Love ${state.partner2}`;

    const sealInitials = document.getElementById('seal-initials');
    if (sealInitials) {
      const p1Init = state.partner1 ? state.partner1.charAt(0).toUpperCase() : 'S';
      const p2Init = state.partner2 ? state.partner2.charAt(0).toUpperCase() : 'A';
      sealInitials.textContent = `${p1Init} & ${p2Init}`;
    }

    const songArtist = document.getElementById('song-artist');
    if (songArtist) {
      songArtist.textContent = `${state.partner1} & ${state.partner2}'s Theme • Ambient Acoustic Piano`;
    }

    document.getElementById('city-1-label').textContent = state.city1;
    document.getElementById('city-2-label').textContent = state.city2;

    const distKm = state.distanceKm || (state.city1.toLowerCase().includes('delhi') && state.city2.toLowerCase().includes('hapur') ? 60 : 60);
    const distMiles = state.distanceMiles || Math.round(distKm * 0.621371);

    const heroDist = document.getElementById('hero-stat-distance');
    if (heroDist) {
      heroDist.textContent = `${distKm.toLocaleString()} Km`;
    }

    const distNumText = document.getElementById('distance-number-text');
    if (distNumText) {
      distNumText.textContent = `${distKm.toLocaleString()} Km / ${distMiles.toLocaleString()} Miles`;
    }

    document.getElementById('input-partner1').value = state.partner1;
    document.getElementById('input-partner2').value = state.partner2;
    document.getElementById('input-city1').value = state.city1;
    document.getElementById('input-city2').value = state.city2;
    document.getElementById('input-reunion-date').value = state.reunionDate;
    document.getElementById('input-start-date').value = state.startDate;
    document.getElementById('input-custom-quote').value = state.customQuote;

    const targetDateObj = new Date(state.reunionDate);
    document.getElementById('target-reunion-display').textContent = targetDateObj.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    calculateDaysTogether();
  }

  function calculateDaysTogether() {
    const start = new Date(state.startDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('hero-stat-together').textContent = diffDays.toLocaleString();
    document.getElementById('milestone-text').textContent = `We have been loving each other for ${diffDays.toLocaleString()} days and counting!`;
  }

  updateUIFromState();

  // --------------------------------------------------------------------------
  // 7. BACKGROUND CANVAS ENGINE (STARS, CLOUDS, FIREFLIES, HEARTS)
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('sky-canvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const stars = [];
  const fireflies = [];
  const floatingHearts = [];

  // Create Stars
  for (let i = 0; i < 180; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005
    });
  }

  // Create Fireflies
  for (let i = 0; i < 25; i++) {
    fireflies.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.5 + 0.2,
      alpha: Math.random()
    });
  }

  // Floating Hearts
  function spawnFloatingHeart() {
    if (floatingHearts.length < 15) {
      floatingHearts.push({
        x: Math.random() * width,
        y: height + 20,
        size: Math.random() * 14 + 10,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.3
      });
    }
  }

  setInterval(spawnFloatingHeart, 1200);

  function renderSky() {
    ctx.clearRect(0, 0, width, height);

    // Draw Stars
    stars.forEach(star => {
      star.alpha += star.speed;
      if (star.alpha > 1 || star.alpha < 0.2) star.speed = -star.speed;
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Fireflies
    fireflies.forEach(f => {
      f.angle += 0.02;
      f.x += Math.cos(f.angle) * f.speed;
      f.y += Math.sin(f.angle) * f.speed;

      if (f.x < 0) f.x = width;
      if (f.x > width) f.x = 0;
      if (f.y < 0) f.y = height;
      if (f.y > height) f.y = 0;

      ctx.fillStyle = `rgba(255, 126, 179, ${Math.abs(Math.sin(f.angle)) * 0.8 + 0.2})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#FF4D88';
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Draw Floating Hearts
    for (let i = floatingHearts.length - 1; i >= 0; i--) {
      const h = floatingHearts[i];
      h.y -= h.speedY;
      h.x += h.speedX;

      ctx.fillStyle = `rgba(255, 77, 136, ${h.alpha})`;
      ctx.font = `${h.size}px sans-serif`;
      ctx.fillText('❤️', h.x, h.y);

      if (h.y < -30) {
        floatingHearts.splice(i, 1);
      }
    }

    requestAnimationFrame(renderSky);
  }

  renderSky();

  // --------------------------------------------------------------------------
  // 8. PAGE 2: WORLD MAP CANVAS & BEZIER HEART PATH
  // --------------------------------------------------------------------------
  const mapCanvas = document.getElementById('world-map-canvas');
  const mapCtx = mapCanvas.getContext('2d');

  function resizeMap() {
    if (mapCanvas && mapCanvas.parentElement) {
      mapCanvas.width = mapCanvas.parentElement.clientWidth;
      mapCanvas.height = mapCanvas.parentElement.clientHeight;
    }
  }

  resizeMap();
  window.addEventListener('resize', resizeMap);

  let heartProgress = 0;

  function drawWorldMap() {
    if (!mapCanvas) return;
    const w = mapCanvas.width;
    const h = mapCanvas.height;

    mapCtx.clearRect(0, 0, w, h);

    // Draw subtle grid map lines
    mapCtx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    mapCtx.lineWidth = 1;

    for (let x = 0; x < w; x += 40) {
      mapCtx.beginPath();
      mapCtx.moveTo(x, 0);
      mapCtx.lineTo(x, h);
      mapCtx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      mapCtx.beginPath();
      mapCtx.moveTo(0, y);
      mapCtx.lineTo(w, y);
      mapCtx.stroke();
    }

    // Two City Nodes Coords
    const p1 = { x: w * 0.28, y: h * 0.45 };
    const p2 = { x: w * 0.72, y: h * 0.42 };
    const cp = { x: w * 0.5, y: h * 0.15 }; // Control point for curved Bezier arch

    // Draw Arc Curve Line
    mapCtx.beginPath();
    mapCtx.moveTo(p1.x, p1.y);
    mapCtx.quadraticCurveTo(cp.x, cp.y, p2.x, p2.y);
    mapCtx.strokeStyle = 'rgba(255, 77, 136, 0.6)';
    mapCtx.lineWidth = 3;
    mapCtx.setLineDash([8, 8]);
    mapCtx.shadowBlur = 15;
    mapCtx.shadowColor = '#FF4D88';
    mapCtx.stroke();
    mapCtx.setLineDash([]);
    mapCtx.shadowBlur = 0;

    // Draw City Nodes
    [p1, p2].forEach((p, idx) => {
      mapCtx.beginPath();
      mapCtx.arc(p.x, p.y, 8, 0, Math.PI * 2);
      mapCtx.fillStyle = '#FF4D88';
      mapCtx.shadowBlur = 12;
      mapCtx.shadowColor = '#FF4D88';
      mapCtx.fill();
      mapCtx.shadowBlur = 0;

      // Pulse ring
      mapCtx.beginPath();
      mapCtx.arc(p.x, p.y, 16 + Math.sin(Date.now() * 0.005) * 6, 0, Math.PI * 2);
      mapCtx.strokeStyle = 'rgba(255, 126, 179, 0.4)';
      mapCtx.lineWidth = 1.5;
      mapCtx.stroke();
    });

    // Calculate Heart Position along Bezier
    heartProgress += 0.004;
    if (heartProgress > 1) heartProgress = 0;

    const t = heartProgress;
    const hx = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * cp.x + t * t * p2.x;
    const hy = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * cp.y + t * t * p2.y;

    // Draw Traveling Heart
    mapCtx.font = '22px sans-serif';
    mapCtx.shadowBlur = 15;
    mapCtx.shadowColor = '#FF4D88';
    mapCtx.fillText('❤️', hx - 11, hy + 8);
    mapCtx.shadowBlur = 0;

    requestAnimationFrame(drawWorldMap);
  }

  drawWorldMap();

  // Map Click Pulse Interaction
  const mapContainer = document.getElementById('map-container');
  if (mapContainer) {
    mapContainer.addEventListener('click', (e) => {
      const rect = mapContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      showToast(`💖 Sending a wave of love to ${state.partner2}!`);
      createHeartExplosion(x, y, mapContainer);
    });
  }

  function createHeartExplosion(x, y, container) {
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('span');
      particle.textContent = '❤️';
      particle.style.position = 'absolute';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.fontSize = `${Math.random() * 16 + 12}px`;
      particle.style.pointerEvents = 'none';
      particle.style.transition = 'all 0.8s ease-out';
      container.appendChild(particle);

      setTimeout(() => {
        const dx = (Math.random() - 0.5) * 120;
        const dy = (Math.random() - 0.5) * 120;
        particle.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
        particle.style.opacity = '0';
      }, 20);

      setTimeout(() => particle.remove(), 900);
    }
  }

  // --------------------------------------------------------------------------
  // 9. PAGE 3: COUNTDOWN TIMER ENGINE
  // --------------------------------------------------------------------------
  function updateCountdown() {
    const target = new Date(state.reunionDate).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      document.getElementById('count-days').textContent = '00';
      document.getElementById('count-hours').textContent = '00';
      document.getElementById('count-minutes').textContent = '00';
      document.getElementById('count-seconds').textContent = '00';
      document.getElementById('hero-stat-days').textContent = 'REUNITED!';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('count-days').textContent = days < 10 ? `0${days}` : days;
    document.getElementById('count-hours').textContent = hours < 10 ? `0${hours}` : hours;
    document.getElementById('count-minutes').textContent = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById('count-seconds').textContent = seconds < 10 ? `0${seconds}` : seconds;

    document.getElementById('hero-stat-days').textContent = `${days} Days`;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Add to Calendar
  document.getElementById('btn-add-calendar').addEventListener('click', () => {
    const startDateISO = new Date(state.reunionDate).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const title = encodeURIComponent(`Reunion with ${state.partner2} ❤️`);
    const details = encodeURIComponent(`Our long awaited reunion date! Distance = 0!`);
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateISO}/${startDateISO}&details=${details}`;
    window.open(gcalUrl, '_blank');
  });

  // --------------------------------------------------------------------------
  // 10. PAGE 4: MEMORIES POLAROID GALLERY
  // --------------------------------------------------------------------------
  const polaroidGrid = document.getElementById('polaroid-grid');

  function renderMemories(filter = 'all') {
    polaroidGrid.innerHTML = '';

    const filtered = filter === 'all' ? memories : memories.filter(m => m.category === filter);

    filtered.forEach(m => {
      const card = document.createElement('div');
      card.className = 'polaroid-card';
      card.style.setProperty('--rotation', `${m.rotation || 0}deg`);

      card.innerHTML = `
        <div class="polaroid-img-wrapper">
          <img src="${m.img}" alt="${m.title}" loading="lazy" />
        </div>
        <div class="polaroid-caption">
          <div class="polaroid-title">${m.title}</div>
          <div class="polaroid-date">${m.date}</div>
        </div>
      `;

      // 3D Tilt Effect
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `rotate(${m.rotation || 0}deg)`;
      });

      card.addEventListener('click', () => openLightbox(m));

      polaroidGrid.appendChild(card);
    });
  }

  renderMemories();

  // Memory Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMemories(btn.dataset.filter);
    });
  });

  // Lightbox Modal
  const modalLightbox = document.getElementById('modal-lightbox');
  let currentLightboxItem = null;

  function openLightbox(item) {
    currentLightboxItem = item;
    document.getElementById('lightbox-img').src = item.img;
    document.getElementById('lightbox-title') ? document.getElementById('lightbox-title').textContent = item.title : null;
    document.getElementById('lightbox-caption').textContent = item.title;
    document.getElementById('lightbox-date').textContent = item.date;
    document.getElementById('lightbox-desc').textContent = item.desc;
    document.getElementById('memory-like-count').textContent = item.likes;
    modalLightbox.classList.add('active');
  }

  document.getElementById('btn-close-lightbox').addEventListener('click', () => {
    modalLightbox.classList.remove('active');
  });

  document.getElementById('btn-like-memory').addEventListener('click', () => {
    if (currentLightboxItem) {
      currentLightboxItem.likes += 1;
      document.getElementById('memory-like-count').textContent = currentLightboxItem.likes;
      showToast('❤️ Memory Liked!');
    }
  });

  // Add Memory Modal
  const modalAddMemory = document.getElementById('modal-add-memory');
  document.getElementById('btn-add-memory').addEventListener('click', () => {
    modalAddMemory.classList.add('active');
  });
  document.getElementById('btn-close-add-memory').addEventListener('click', () => {
    modalAddMemory.classList.remove('active');
  });

  document.getElementById('form-add-memory').addEventListener('submit', (e) => {
    e.preventDefault();
    const newMem = {
      id: Date.now(),
      title: document.getElementById('memory-title').value,
      img: document.getElementById('memory-img-url').value,
      date: document.getElementById('memory-date').value,
      category: document.getElementById('memory-category').value,
      desc: document.getElementById('memory-desc').value,
      likes: 1,
      rotation: (Math.random() - 0.5) * 6
    };
    memories.unshift(newMem);
    renderMemories();
    modalAddMemory.classList.remove('active');
    showToast('📸 New Memory Saved!');
    document.getElementById('form-add-memory').reset();
  });

  // --------------------------------------------------------------------------
  // 11. PAGE 5: LOVE LETTERS & TYPEWRITER ENGINE
  // --------------------------------------------------------------------------
  const envelopeCard = document.getElementById('envelope-card');
  const waxSeal = document.getElementById('wax-seal');
  const letterBodyText = document.getElementById('letter-body-text');

  let typewriterTimeout = null;

  function loadLetter(idx) {
    if (typewriterTimeout) clearTimeout(typewriterTimeout);

    state.currentLetterIdx = idx;
    const l = letters[idx] || letters[0];

    document.getElementById('letter-title').textContent = l.title;
    document.getElementById('letter-date').textContent = l.date;
    document.querySelector('.partner-name-sig').textContent = `${state.partner1} ❤️`;

    // Reset typewriter text
    letterBodyText.textContent = '';
    let i = 0;
    const speed = 25;

    function typeWriter() {
      if (i < l.body.length) {
        letterBodyText.textContent += l.body.charAt(i);
        i++;
        typewriterTimeout = setTimeout(typeWriter, speed);
      }
    }

    if (envelopeCard.classList.contains('open')) {
      typeWriter();
    }
  }

  waxSeal.addEventListener('click', () => {
    envelopeCard.classList.toggle('open');
    if (envelopeCard.classList.contains('open')) {
      loadLetter(state.currentLetterIdx);
      showToast('💌 Envelope Opened!');
    }
  });

  document.getElementById('btn-next-letter').addEventListener('click', () => {
    state.currentLetterIdx = (state.currentLetterIdx + 1) % letters.length;
    updateLetterTabs();
    if (envelopeCard.classList.contains('open')) {
      loadLetter(state.currentLetterIdx);
    } else {
      envelopeCard.classList.add('open');
      loadLetter(state.currentLetterIdx);
    }
  });

  document.getElementById('btn-replay-letter').addEventListener('click', () => {
    if (envelopeCard.classList.contains('open')) {
      loadLetter(state.currentLetterIdx);
    }
  });

  const letterTabs = document.querySelectorAll('.letter-tab-btn[data-letter]');
  letterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.dataset.letter, 10);
      state.currentLetterIdx = idx;
      updateLetterTabs();
      envelopeCard.classList.add('open');
      loadLetter(idx);
    });
  });

  function updateLetterTabs() {
    letterTabs.forEach((tab, i) => {
      if (i === state.currentLetterIdx) tab.classList.add('active');
      else tab.classList.remove('active');
    });
  }

  // Write Custom Letter Modal
  const modalCustomLetter = document.getElementById('modal-custom-letter');
  document.getElementById('btn-write-letter-tab').addEventListener('click', () => {
    modalCustomLetter.classList.add('active');
  });
  document.getElementById('btn-close-custom-letter').addEventListener('click', () => {
    modalCustomLetter.classList.remove('active');
  });

  document.getElementById('form-custom-letter').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('custom-letter-title').value;
    const body = document.getElementById('custom-letter-text').value;

    letters.push({
      title: title,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      body: body
    });

    state.currentLetterIdx = letters.length - 1;
    modalCustomLetter.classList.remove('active');
    envelopeCard.classList.add('open');
    loadLetter(state.currentLetterIdx);
    showToast('💌 Your Custom Letter Added!');
    document.getElementById('form-custom-letter').reset();
  });

  // --------------------------------------------------------------------------
  // 12. PAGE 6: 12 REASONS I LOVE YOU GRID
  // --------------------------------------------------------------------------
  const reasonsGrid = document.getElementById('reasons-grid');

  function renderReasons() {
    reasonsGrid.innerHTML = '';
    reasonsData.forEach(r => {
      const card = document.createElement('div');
      card.className = 'reason-card glass-card';
      card.innerHTML = `
        <div class="reason-number">${r.num}</div>
        <div>
          <div class="reason-icon">${r.icon}</div>
          <h3 class="reason-title">${r.title}</h3>
          <p class="reason-desc">${r.desc}</p>
        </div>
        <div class="reason-flip-hint">Click to send heart ❤️</div>
      `;

      card.addEventListener('click', (e) => {
        createHeartExplosion(e.clientX, e.clientY, document.body);
        showToast(`💖 Reason #${r.num}: ${r.title}`);
      });

      reasonsGrid.appendChild(card);
    });
  }

  renderReasons();

  // --------------------------------------------------------------------------
  // 13. PAGE 7: OUR SONG MUSIC PLAYER (HINDI ROMANTIC SONGS & SYNTHESIZER)
  // --------------------------------------------------------------------------
  let audioCtx = null;
  let synthInterval = null;
  let htmlAudio = null;

  const hindiPlaylist = [
    {
      title: 'Tere Hawaale',
      artist: 'Arijit Singh & Shilpa Rao • Forever In Love',
      duration: '5:46',
      cover: '✨',
      audioUrl:
    }
  ];

  let currentTrackIdx = 0;

  const vinylDisc = document.getElementById('vinyl-disc');
  const btnPlayPause = document.getElementById('btn-play-pause');
  const playPauseIcon = document.getElementById('play-pause-icon');
  const visualizerCanvas = document.getElementById('visualizer-canvas');
  const vizCtx = visualizerCanvas ? visualizerCanvas.getContext('2d') : null;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (!htmlAudio) {
      htmlAudio = new Audio();
      htmlAudio.loop = true;
      htmlAudio.volume = state.volume || 0.8;

      htmlAudio.addEventListener('timeupdate', () => {
        if (htmlAudio.duration) {
          const cur = htmlAudio.currentTime;
          const dur = htmlAudio.duration;
          const pct = (cur / dur) * 100;

          const fill = document.getElementById('progress-bar-fill');
          if (fill) fill.style.width = `${pct}%`;

          const thumb = document.getElementById('progress-bar-thumb');
          if (thumb) thumb.style.left = `${pct}%`;

          const curTimeElem = document.getElementById('time-current');
          if (curTimeElem) {
            const mins = Math.floor(cur / 60);
            const secs = Math.floor(cur % 60).toString().padStart(2, '0');
            curTimeElem.textContent = `${mins}:${secs}`;
          }

          const durTimeElem = document.getElementById('time-total');
          if (durTimeElem && !isNaN(dur)) {
            const mins = Math.floor(dur / 60);
            const secs = Math.floor(dur % 60).toString().padStart(2, '0');
            durTimeElem.textContent = `${mins}:${secs}`;
          }
        }
      });
    }
  }

  // Romantic Melodic Indian Classical / Raag Yaman Synth generator fallback
  function playSynthChord() {
    if (!audioCtx || !state.isPlaying) return;

    // Frequencies for Raag Yaman / Romantic Indian Melody notes (Sa Re Ga Ma Pa Dha Ni Sa)
    const romanticMelodies = [
      [261.63, 329.63, 392.00, 493.88], // C, E, G, B
      [293.66, 369.99, 440.00, 523.25], // D, F#, A, C
      [329.63, 392.00, 493.88, 587.33], // E, G, B, D
      [220.00, 277.18, 329.63, 440.00]  // A, C#, E, A
    ];

    const currentChord = romanticMelodies[Math.floor(Math.random() * romanticMelodies.length)];

    currentChord.forEach(freq => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.04 * state.volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 3.8);
    });
  }

  function loadTrack(idx) {
    currentTrackIdx = (idx + hindiPlaylist.length) % hindiPlaylist.length;
    const track = hindiPlaylist[currentTrackIdx];

    const titleElem = document.getElementById('song-title');
    const artistElem = document.getElementById('song-artist');
    const albumCoverElem = document.getElementById('album-cover-img');
    const totalTimeElem = document.getElementById('time-total');

    if (titleElem) titleElem.textContent = track.title;
    if (artistElem) {
      if (currentTrackIdx === 0) {
        artistElem.textContent = `Arijit Singh • ${state.partner1} & ${state.partner2}'s Special Theme`;
      } else {
        artistElem.textContent = track.artist;
      }
    }
    if (albumCoverElem) albumCoverElem.innerHTML = `<span>${track.cover}</span>`;
    if (totalTimeElem) totalTimeElem.textContent = track.duration;

    // Update track selector pills active state
    const trackPills = document.querySelectorAll('.track-pill');
    trackPills.forEach((pill, i) => {
      if (i === currentTrackIdx) pill.classList.add('active');
      else pill.classList.remove('active');
    });

    if (htmlAudio) {
      htmlAudio.src = track.audioUrl;
      if (state.isPlaying) {
        htmlAudio.play().catch(() => {});
      }
    }
  }

  function togglePlay() {
    initAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    state.isPlaying = !state.isPlaying;

    if (!htmlAudio.src || htmlAudio.src === '') {
      loadTrack(currentTrackIdx);
    }

    if (state.isPlaying) {
      playPauseIcon.textContent = '⏸';
      vinylDisc.classList.add('playing');
      synthInterval = setInterval(playSynthChord, 3000);
      playSynthChord();
      
      htmlAudio.play().catch(e => {
        console.log('Audio autoplay policy caught:', e);
      });

      const currentSongName = hindiPlaylist[currentTrackIdx].title;
      showToast(`🎶 Playing "${currentSongName}" (Hindi Romantic Song)`);
    } else {
      playPauseIcon.textContent = '▶';
      vinylDisc.classList.remove('playing');
      if (synthInterval) clearInterval(synthInterval);
      if (htmlAudio) htmlAudio.pause();
    }
  }

  btnPlayPause.addEventListener('click', togglePlay);
  document.getElementById('btn-audio-toggle').addEventListener('click', togglePlay);

  // Previous & Next Track Buttons
  const btnPrevTrack = document.getElementById('btn-prev-track');
  if (btnPrevTrack) {
    btnPrevTrack.addEventListener('click', () => {
      initAudio();
      loadTrack(currentTrackIdx - 1);
      if (state.isPlaying && htmlAudio) {
        htmlAudio.play().catch(() => {});
      }
      showToast(`⏮️ ${hindiPlaylist[currentTrackIdx].title}`);
    });
  }

  const btnNextTrack = document.getElementById('btn-next-track');
  if (btnNextTrack) {
    btnNextTrack.addEventListener('click', () => {
      initAudio();
      loadTrack(currentTrackIdx + 1);
      if (state.isPlaying && htmlAudio) {
        htmlAudio.play().catch(() => {});
      }
      showToast(`⏭️ ${hindiPlaylist[currentTrackIdx].title}`);
    });
  }

  // Playlist Pills click handler
  document.addEventListener('click', (e) => {
    const pill = e.target.closest('.track-pill');
    if (pill) {
      const trackIdx = parseInt(pill.dataset.track, 10);
      if (!isNaN(trackIdx)) {
        initAudio();
        loadTrack(trackIdx);
        if (!state.isPlaying) {
          togglePlay();
        } else if (htmlAudio) {
          htmlAudio.play().catch(() => {});
          showToast(`🎵 Now Playing: ${hindiPlaylist[currentTrackIdx].title}`);
        }
      }
    }
  });

  // Volume Slider & Mute
  const volumeSlider = document.getElementById('volume-slider');
  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      state.volume = parseFloat(e.target.value);
      if (htmlAudio) htmlAudio.volume = state.volume;
    });
  }

  const btnMute = document.getElementById('btn-mute');
  if (btnMute) {
    btnMute.addEventListener('click', () => {
      if (htmlAudio) {
        htmlAudio.muted = !htmlAudio.muted;
        document.getElementById('volume-icon').textContent = htmlAudio.muted ? '🔇' : '🔊';
        showToast(htmlAudio.muted ? '🔇 Muted' : '🔊 Unmuted');
      }
    });
  }

  // Progress Bar Seek
  const trackContainer = document.getElementById('progress-bar-track');
  if (trackContainer) {
    trackContainer.addEventListener('click', (e) => {
      if (htmlAudio && htmlAudio.duration) {
        const rect = trackContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const pct = clickX / rect.width;
        htmlAudio.currentTime = pct * htmlAudio.duration;
      }
    });
  }

  // Playlist Button toast
  const btnPlaylist = document.getElementById('btn-playlist');
  if (btnPlaylist) {
    btnPlaylist.addEventListener('click', () => {
      showToast('📜 Romantic Playlist: 1. Kesariya, 2. Tum Hi Ho, 3. Raataan Lambiyan, 4. Pehli Nazar Mein, 5. Tere Hawaale');
    });
  }

  // Visualizer Animation Loop
  function drawVisualizer() {
    if (vizCtx && visualizerCanvas) {
      vizCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);

      const bars = 32;
      const barWidth = visualizerCanvas.width / bars;

      for (let i = 0; i < bars; i++) {
        const barHeight = state.isPlaying
          ? Math.abs(Math.sin(Date.now() * 0.005 + i * 0.2)) * (visualizerCanvas.height * 0.8) + 5
          : 4;

        vizCtx.fillStyle = '#FF4D88';
        vizCtx.fillRect(i * barWidth, visualizerCanvas.height - barHeight, barWidth - 2, barHeight);
      }
    }

    requestAnimationFrame(drawVisualizer);
  }

  drawVisualizer();

  // --------------------------------------------------------------------------
  // 15. PAGE 8: VOICE NOTES (DIL KI AAWAZ) & LIVE MIC RECORDER
  // --------------------------------------------------------------------------
  let voiceNotesData = [
    {
      id: 'vn-1',
      title: 'Dil Ki Baat - Miss You So Much',
      sender: `${state.partner1} (Shiva)`,
      duration: '0:20',
      transcript: 'Suno Amrita, jab bhi aapse baat hoti hai na, poore din ki saari thakan door ho jaati hai... Miss you so much!',
      speechText: 'Suno Amrita, jab bhi aapse baat hoti hai na, poore din ki saari thakan door ho jaati hai. Miss you so much!',
      isRecorded: false
    },
    {
      id: 'vn-2',
      title: 'Distance Means Nothing',
      sender: `${state.partner1} (Shiva)`,
      duration: '0:18',
      transcript: 'Distance is temporary my love. August 21, 2026 ko hum phir se hamesha ke liye saath honge!',
      speechText: 'Distance is temporary my love. August twenty one, 2026 ko hum phir se hamesha ke liye saath honge!',
      isRecorded: false
    },
    {
      id: 'vn-3',
      title: 'Sweet Goodnight Message',
      sender: `${state.partner2} (Amrita)`,
      duration: '0:15',
      transcript: 'Goodnight Shiva! Apna khayal rakhna aur sapno me mujhse milna. Love you infinity! ❤️',
      speechText: 'Goodnight Shiva! Apna khayal rakhna aur sapno me mujhse milna. Love you infinity!',
      isRecorded: false
    }
  ];

  let currentlyPlayingVnId = null;
  let activeAudioObject = null;

  function renderVoiceNotesList() {
    const listContainer = document.getElementById('voice-notes-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';

    voiceNotesData.forEach(vn => {
      const isPlaying = vn.id === currentlyPlayingVnId;
      const item = document.createElement('div');
      item.className = `voice-note-item ${isPlaying ? 'playing' : ''}`;
      item.dataset.id = vn.id;

      item.innerHTML = `
        <div class="voice-note-header">
          <div class="voice-note-title">
            <span>🎙️</span> ${vn.title}
          </div>
          <span class="voice-note-sender">${vn.sender}</span>
        </div>

        <div class="voice-note-waveform-bar">
          <button class="btn-vn-play" data-vn-id="${vn.id}">
            ${isPlaying ? '⏸️' : '▶️'}
          </button>
          <div class="vn-waveform-lines">
            <span class="vn-bar"></span>
            <span class="vn-bar"></span>
            <span class="vn-bar"></span>
            <span class="vn-bar"></span>
            <span class="vn-bar"></span>
            <span class="vn-bar"></span>
            <span class="vn-bar"></span>
            <span class="vn-bar"></span>
            <span class="vn-bar"></span>
            <span class="vn-bar"></span>
            <span class="vn-bar"></span>
            <span class="vn-bar"></span>
          </div>
          <span class="voice-note-duration">${vn.duration}</span>
        </div>

        <div class="voice-note-transcript">
          "${vn.transcript}"
        </div>
      `;

      listContainer.appendChild(item);
    });
  }

  renderVoiceNotesList();

  function stopAllVoiceNotes() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (activeAudioObject) {
      activeAudioObject.pause();
      activeAudioObject = null;
    }
    currentlyPlayingVnId = null;
    renderVoiceNotesList();
  }

  // Play / Pause Voice Note
  document.addEventListener('click', (e) => {
    const playBtn = e.target.closest('.btn-vn-play');
    if (playBtn) {
      const vnId = playBtn.dataset.vnId;
      const vn = voiceNotesData.find(v => v.id === vnId);
      if (!vn) return;

      if (currentlyPlayingVnId === vnId) {
        // Pause
        stopAllVoiceNotes();
        showToast('⏸️ Voice Note Paused');
        return;
      }

      stopAllVoiceNotes();
      currentlyPlayingVnId = vnId;
      renderVoiceNotesList();

      if (vn.audioBlobUrl) {
        // Play recorded real audio blob
        activeAudioObject = new Audio(vn.audioBlobUrl);
        activeAudioObject.play().catch(() => {});
        activeAudioObject.onended = () => {
          stopAllVoiceNotes();
        };
        showToast(`🎙️ Playing Recorded Note: "${vn.title}"`);
      } else if ('speechSynthesis' in window) {
        // Play romantic speech voice note
        const utterance = new SpeechSynthesisUtterance(vn.speechText || vn.transcript);
        utterance.rate = 0.9; // Soft, gentle pace
        utterance.pitch = 1.05;

        // Try to pick a natural voice if available
        const voices = window.speechSynthesis.getVoices();
        const hindiOrSoftVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN') || v.name.includes('Google') || v.name.includes('Natural'));
        if (hindiOrSoftVoice) {
          utterance.voice = hindiOrSoftVoice;
        }

        utterance.onend = () => {
          stopAllVoiceNotes();
        };

        utterance.onerror = () => {
          stopAllVoiceNotes();
        };

        window.speechSynthesis.speak(utterance);
        showToast(`🎙️ Playing Voice Note: "${vn.title}"`);
      } else {
        showToast(`🎙️ Playing: "${vn.title}"`);
        setTimeout(() => {
          stopAllVoiceNotes();
        }, 5000);
      }
    }
  });

  // MediaRecorder Live Voice Recording Engine
  let mediaRecorder = null;
  let audioChunks = [];
  let recordTimerInterval = null;
  let recordStartTime = 0;
  let recordedAudioBlob = null;
  let recordedAudioUrl = null;
  let isSimulatedRecording = false;

  const btnStartRecord = document.getElementById('btn-start-record');
  const btnStopRecord = document.getElementById('btn-stop-record');
  const micPulseCircle = document.getElementById('mic-pulse-circle');
  const recorderTimerElem = document.getElementById('recorder-timer');
  const recorderStatusText = document.getElementById('recorder-status-text');
  const recordedPreviewBox = document.getElementById('recorded-preview-box');
  const recordedAudioElement = document.getElementById('recorded-audio-element');
  const btnSaveVoiceNote = document.getElementById('btn-save-voice-note');
  const voiceNoteTitleInput = document.getElementById('voice-note-title-input');

  if (btnStartRecord) {
    btnStartRecord.addEventListener('click', async () => {
      isSimulatedRecording = false;
      let liveStream = null;

      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('MediaDevices unsupported');
        }

        liveStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioChunks = [];
        mediaRecorder = new MediaRecorder(liveStream);

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          if (liveStream) {
            liveStream.getTracks().forEach(track => track.stop());
          }
          recordedAudioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          recordedAudioUrl = URL.createObjectURL(recordedAudioBlob);

          if (recordedAudioElement) {
            recordedAudioElement.src = recordedAudioUrl;
            recordedAudioElement.style.display = 'block';
          }
          recordedPreviewBox.classList.remove('hidden');
          recorderStatusText.textContent = '✅ Microphone recording completed! Play to preview or save to gallery.';
        };

        mediaRecorder.start();
        showToast('🎙️ Live Microphone Recording Started!');
      } catch (err) {
        console.warn('Microphone permission blocked or unavailable. Switching to fallback Voice Note recording mode:', err);
        isSimulatedRecording = true;
        showToast('🎙️ Voice Note Recording Started!');
      }

      recordStartTime = Date.now();

      // UI Recording State
      btnStartRecord.classList.add('hidden');
      btnStopRecord.classList.remove('hidden');
      micPulseCircle.classList.add('recording');
      const emojiElem = document.getElementById('mic-status-emoji');
      if (emojiElem) emojiElem.textContent = '🔴';

      recorderStatusText.textContent = isSimulatedRecording 
        ? '🔴 Recording voice note... Speak your message!'
        : '🔴 Recording live mic audio... Speak your heart out!';

      clearInterval(recordTimerInterval);
      recordTimerInterval = setInterval(() => {
        const elapsedSecs = Math.floor((Date.now() - recordStartTime) / 1000);
        const mins = Math.floor(elapsedSecs / 60).toString().padStart(2, '0');
        const secs = (elapsedSecs % 60).toString().padStart(2, '0');
        recorderTimerElem.textContent = `${mins}:${secs}`;
      }, 1000);
    });
  }

  if (btnStopRecord) {
    btnStopRecord.addEventListener('click', () => {
      clearInterval(recordTimerInterval);

      btnStopRecord.classList.add('hidden');
      btnStartRecord.classList.remove('hidden');
      micPulseCircle.classList.remove('recording');
      const emojiElem = document.getElementById('mic-status-emoji');
      if (emojiElem) emojiElem.textContent = '🎙️';

      if (!isSimulatedRecording && mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      } else {
        // Simulated / Fallback Recording Completion
        recordedAudioBlob = null;
        recordedAudioUrl = null;
        if (recordedAudioElement) {
          recordedAudioElement.style.display = 'none';
        }
        recordedPreviewBox.classList.remove('hidden');
        recorderStatusText.textContent = '✅ Voice message captured! Type a title or love message below and click Save To Gallery.';
      }

      showToast('⏹️ Recording Finished!');
    });
  }

  if (btnSaveVoiceNote) {
    btnSaveVoiceNote.addEventListener('click', () => {
      const customTitle = voiceNoteTitleInput.value.trim() || 'My Heart Voice Message ❤️';
      const durationStr = recorderTimerElem.textContent || '0:05';

      voiceNotesData.unshift({
        id: 'vn-' + Date.now(),
        title: customTitle,
        sender: `${state.partner1} (Shiva)`,
        duration: durationStr,
        transcript: customTitle,
        speechText: customTitle,
        audioBlobUrl: recordedAudioUrl || null,
        isRecorded: true
      });

      renderVoiceNotesList();

      // Reset Recorder UI
      recordedPreviewBox.classList.add('hidden');
      voiceNoteTitleInput.value = '';
      recorderTimerElem.textContent = '00:00';
      recorderStatusText.textContent = 'Ready to record your next voice note...';
      recordedAudioUrl = null;

      showToast('💾 Voice Note Saved To Love Gallery!');
    });
  }

  // --------------------------------------------------------------------------
  // 16. PAGE 9: LOVE QUIZ ENGINE (HOW WELL DO YOU KNOW ME?)
  // --------------------------------------------------------------------------
  const quizQuestionsBank = {
    shiva: [
      {
        question: "What is Shiva's absolute favorite mood-booster when he misses Amrita?",
        category: "Shiva's Secrets",
        options: [
          "Listening to Kesariya on repeat",
          "Watching old recorded video calls",
          "Writing sweet romantic notes",
          "All of the above ❤️"
        ],
        correct: 3,
        explanation: "Every single one of these brings a warm smile to Shiva's face when thinking of Amrita!"
      },
      {
        question: "What time does Shiva love sending sweet messages?",
        category: "Daily Habits",
        options: [
          "11:11 PM (Make a wish time)",
          "12:00 AM Midnight",
          "1:30 AM Late Night",
          "Whenever Amrita is on his mind (all day!)"
        ],
        correct: 3,
        explanation: "Amrita is on Shiva's mind throughout the day, so any moment is the right moment!"
      },
      {
        question: "What is Shiva's dream reunion plan for August 21, 2026?",
        category: "Future Dreams",
        options: [
          "A long warm hug that lasts 10 minutes",
          "A cozy dinner under the moonlight",
          "A romantic drive together",
          "All of these combined!"
        ],
        correct: 3,
        explanation: "August 21, 2026 will be the most special reunion day filled with hugs, dinners, and smiles!"
      },
      {
        question: "What makes Shiva smile instantly on a tiring day?",
        category: "Little Pleasures",
        options: [
          "An unexpected voice note from Amrita",
          "A sweet photo notification",
          "A random 'I love you' text",
          "Any message from Amrita ❤️"
        ],
        correct: 3,
        explanation: "A single notification from Amrita instantly brightens up Shiva's entire day!"
      },
      {
        question: "What is Shiva's favorite nickname for Amrita?",
        category: "Affection",
        options: [
          "My Heart ❤️",
          "Janeman",
          "Sweetheart",
          "Pyaari"
        ],
        correct: 0,
        explanation: "'My Heart' is how Shiva always describes Amrita — because she holds his heart forever."
      },
      {
        question: "Where would Shiva love to travel with Amrita next?",
        category: "Adventures",
        options: [
          "Manali snowy mountains",
          "Goa beach sunset",
          "Paris Eiffel Tower",
          "Anywhere in the world, as long as Amrita is with him"
        ],
        correct: 3,
        explanation: "The destination doesn't matter — being together is the real paradise!"
      }
    ],
    amrita: [
      {
        question: "What is Amrita's favorite romantic gesture from Shiva?",
        category: "Amrita's Favorites",
        options: [
          "Unexpected morning voice notes",
          "Heart-to-heart late night conversations",
          "Cute random check-in messages",
          "All of them ❤️"
        ],
        correct: 3,
        explanation: "Amrita adores every small gesture of love and care from Shiva!"
      },
      {
        question: "How does Amrita react when Shiva sends a cute photo?",
        category: "Sweet Moments",
        options: [
          "Smiles blushingly for minutes",
          "Saves it to her favorite gallery",
          "Replies with heart emojis",
          "All of the above!"
        ],
        correct: 3,
        explanation: "Shiva's photos always bring the sweetest blush to Amrita's face!"
      },
      {
        question: "What is Amrita's favorite comfort mood lifter during distance?",
        category: "Comfort Habits",
        options: [
          "Listening to Kesariya together",
          "Hot Chocolate on a rainy evening",
          "Re-reading sweet letters",
          "Talking to Shiva late at night"
        ],
        correct: 3,
        explanation: "Late-night conversations with Shiva are Amrita's favorite medicine for distance!"
      },
      {
        question: "What is the first thing Amrita wants to do when reunited?",
        category: "Reunion Goals",
        options: [
          "Hold Shiva's hand and never let go",
          "Go for a long peaceful walk",
          "Share a quiet cup of coffee",
          "Give the tightest hug ever ❤️"
        ],
        correct: 3,
        explanation: "That reunion hug is going to be the warmest, tightest, and longest hug ever!"
      },
      {
        question: "What is Amrita's favorite time of the day to talk?",
        category: "Daily Routine",
        options: [
          "Quiet late-night conversations",
          "Early morning check-ins",
          "Afternoon tea break",
          "Anytime Shiva is free"
        ],
        correct: 0,
        explanation: "Late night when the world is quiet is when heart-to-heart talks feel most magical."
      },
      {
        question: "What is Amrita's favorite thing about Shiva?",
        category: "Heart Connection",
        options: [
          "His caring and loving nature",
          "His soothing voice",
          "His smile and jokes",
          "Everything about him ❤️"
        ],
        correct: 3,
        explanation: "Amrita loves everything about Shiva — his heart, his care, and his presence!"
      }
    ],
    couple: [
      {
        question: "What is our special Relationship Start Date?",
        category: "Our Milestones",
        options: [
          "November 27, 2026",
          "February 14, 2023",
          "August 21, 2026",
          "October 15, 2025"
        ],
        correct: 0,
        explanation: "November 27, 2026 is our official, unforgettable relationship start date!"
      },
      {
        question: "What is the reunion target date we are eagerly counting down to?",
        category: "Countdowns",
        options: [
          "August 21, 2026",
          "December 31, 2026",
          "January 1, 2027",
          "October 10, 2026"
        ],
        correct: 0,
        explanation: "August 21, 2026 at 6:00 PM is when our distance comes to an end!"
      },
      {
        question: "What is our featured theme romantic song?",
        category: "Music",
        options: [
          "Kesariya",
          "Tum Hi Ho",
          "Raataan Lambiyan",
          "Tere Hawaale"
        ],
        correct: 0,
        explanation: "Kesariya by Arijit Singh is Shiva & Amrita's ultimate special theme song!"
      },
      {
        question: "What do we both look up at when missing each other at night?",
        category: "Night Sky",
        options: [
          "The Same Moon & Sky 🌕",
          "The Shooting Stars",
          "The City Lights",
          "The Horizon"
        ],
        correct: 0,
        explanation: "No matter how many miles separate us, we look up at the exact same moon every night!"
      },
      {
        question: "What is the distance separating our current cities?",
        category: "Distance",
        options: [
          "60 Km / 37 Miles",
          "120 Km",
          "300 Miles",
          "500 Km"
        ],
        correct: 0,
        explanation: "60 Km / 37 Miles apart, but zero distance between our hearts!"
      },
      {
        question: "What is the secret strength of our long-distance bond?",
        category: "Love Secrets",
        options: [
          "Unshakable trust and daily affection",
          "Sweet voice notes and songs",
          "Late-night conversations",
          "All of the above ❤️"
        ],
        correct: 3,
        explanation: "Trust, communication, and deep love make our bond unbreakable!"
      }
    ]
  };

  let currentQuizMode = 'shiva'; // 'shiva', 'amrita', or 'couple'
  let currentQuestionIdx = 0;
  let quizScore = 0;
  let answeredQuestions = {};

  const quizCardBody = document.getElementById('quiz-card-body');
  const quizResultsCard = document.getElementById('quiz-results-card');
  const questionBadge = document.getElementById('question-badge');
  const questionCategory = document.getElementById('question-category');
  const questionText = document.getElementById('question-text');
  const quizOptionsGrid = document.getElementById('quiz-options-grid');
  const quizFeedbackBox = document.getElementById('quiz-feedback-box');
  const feedbackIcon = document.getElementById('feedback-icon');
  const feedbackHeading = document.getElementById('feedback-heading');
  const feedbackExplanation = document.getElementById('feedback-explanation');
  const btnNextQuestion = document.getElementById('btn-next-question');
  const quizScoreNum = document.getElementById('quiz-score-num');
  const quizTotalNum = document.getElementById('quiz-total-num');
  const quizProgressFill = document.getElementById('quiz-progress-fill');

  function getActiveQuestions() {
    return quizQuestionsBank[currentQuizMode] || quizQuestionsBank.shiva;
  }

  function renderQuestion() {
    const questions = getActiveQuestions();

    if (currentQuestionIdx >= questions.length) {
      showQuizResults();
      return;
    }

    quizCardBody.classList.remove('hidden');
    quizResultsCard.classList.add('hidden');
    quizFeedbackBox.classList.add('hidden');
    btnNextQuestion.classList.add('hidden');

    const q = questions[currentQuestionIdx];

    if (questionBadge) questionBadge.textContent = `QUESTION ${currentQuestionIdx + 1} OF ${questions.length}`;
    if (questionCategory) questionCategory.textContent = q.category || 'Love Quiz';
    if (questionText) questionText.textContent = q.question;
    if (quizScoreNum) quizScoreNum.textContent = quizScore;
    if (quizTotalNum) quizTotalNum.textContent = questions.length;

    const progressPct = ((currentQuestionIdx + 1) / questions.length) * 100;
    if (quizProgressFill) quizProgressFill.style.width = `${progressPct}%`;

    // Render Options
    if (quizOptionsGrid) {
      quizOptionsGrid.innerHTML = '';
      const prefixes = ['A', 'B', 'C', 'D'];

      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.dataset.index = idx;

        btn.innerHTML = `
          <span class="option-prefix">${prefixes[idx]}</span>
          <span>${opt}</span>
        `;

        btn.addEventListener('click', () => handleOptionSelect(idx));
        quizOptionsGrid.appendChild(btn);
      });
    }
  }

  function handleOptionSelect(selectedIdx) {
    const questions = getActiveQuestions();
    const q = questions[currentQuestionIdx];

    // Disable all options
    const optionBtns = quizOptionsGrid.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => btn.disabled = true);

    const isCorrect = selectedIdx === q.correct;

    if (isCorrect) {
      quizScore++;
      if (quizScoreNum) quizScoreNum.textContent = quizScore;
      optionBtns[selectedIdx].classList.add('correct');
      if (feedbackIcon) feedbackIcon.textContent = '🎉';
      if (feedbackHeading) feedbackHeading.textContent = 'Spot On! Correct Answer! ❤️';
      triggerConfettiHearts();
      showToast('🎉 Correct Answer! +1 Love Point');
    } else {
      optionBtns[selectedIdx].classList.add('wrong');
      optionBtns[q.correct].classList.add('correct'); // Highlight right answer
      if (feedbackIcon) feedbackIcon.textContent = '💡';
      if (feedbackHeading) feedbackHeading.textContent = 'So Close! Here is the sweet truth:';
    }

    if (feedbackExplanation) feedbackExplanation.textContent = q.explanation;
    quizFeedbackBox.classList.remove('hidden');

    // Show Next or Finish Button
    if (currentQuestionIdx < questions.length - 1) {
      btnNextQuestion.textContent = 'Next Question ➔';
    } else {
      btnNextQuestion.textContent = 'See Final Score & Soulmate Badge 🏆';
    }
    btnNextQuestion.classList.remove('hidden');
  }

  function triggerConfettiHearts() {
    for (let i = 0; i < 8; i++) {
      const heart = document.createElement('div');
      heart.textContent = ['💖', '✨', '💕', '🌹'][Math.floor(Math.random() * 4)];
      heart.style.position = 'fixed';
      heart.style.left = `${Math.random() * 80 + 10}vw`;
      heart.style.top = `${Math.random() * 50 + 20}vh`;
      heart.style.fontSize = `${Math.random() * 1.5 + 1.2}rem`;
      heart.style.zIndex = '9999';
      heart.style.pointerEvents = 'none';
      heart.style.transition = 'all 1.2s ease-out';

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.style.transform = `translateY(-100px) scale(1.5)`;
        heart.style.opacity = '0';
      }, 50);

      setTimeout(() => {
        heart.remove();
      }, 1300);
    }
  }

  function showQuizResults() {
    quizCardBody.classList.add('hidden');
    quizResultsCard.classList.remove('hidden');

    const questions = getActiveQuestions();
    const total = questions.length;
    const pct = Math.round((quizScore / total) * 100);

    const scoreDisplay = document.getElementById('results-score-display');
    const pctDisplay = document.getElementById('results-percentage');
    const badgeTitle = document.getElementById('badge-title');
    const badgeDesc = document.getElementById('badge-desc');

    if (scoreDisplay) scoreDisplay.textContent = `${quizScore} out of ${total}`;
    if (pctDisplay) pctDisplay.textContent = `${pct}%`;

    if (pct === 100) {
      if (badgeTitle) badgeTitle.textContent = '100% Ultimate Soulmates! 👑💕';
      if (badgeDesc) badgeDesc.textContent = 'You know each other\'s hearts inside out! Zero secrets, pure unconditional love!';
    } else if (pct >= 80) {
      if (badgeTitle) badgeTitle.textContent = 'Deeply Connected Hearts! 💖';
      if (badgeDesc) badgeDesc.textContent = 'You know almost everything about each other! A truly beautiful bond!';
    } else {
      if (badgeTitle) badgeTitle.textContent = 'Growing Love & Sweet Discoveries! 🌹';
      if (badgeDesc) badgeDesc.textContent = 'Every question is a chance to learn something new and sweet about your partner!';
    }

    triggerConfettiHearts();
  }

  // Quiz Mode Switches
  document.addEventListener('click', (e) => {
    const modeBtn = e.target.closest('.quiz-mode-pill');
    if (modeBtn) {
      document.querySelectorAll('.quiz-mode-pill').forEach(b => b.classList.remove('active'));
      modeBtn.classList.add('active');

      currentQuizMode = modeBtn.dataset.mode || 'shiva';
      currentQuestionIdx = 0;
      quizScore = 0;
      renderQuestion();

      const modeNames = {
        shiva: "Shiva's Quiz",
        amrita: "Amrita's Quiz",
        couple: "Our Love Story Quiz"
      };
      showToast(`🧩 Started ${modeNames[currentQuizMode]}`);
    }
  });

  if (btnNextQuestion) {
    btnNextQuestion.addEventListener('click', () => {
      currentQuestionIdx++;
      renderQuestion();
    });
  }

  const btnRestartQuiz = document.getElementById('btn-restart-quiz');
  if (btnRestartQuiz) {
    btnRestartQuiz.addEventListener('click', () => {
      currentQuestionIdx = 0;
      quizScore = 0;
      renderQuestion();
      showToast('🔄 Quiz Reset! Good Luck!');
    });
  }

  // Toggle Custom Question Form
  const btnToggleCustomQ = document.getElementById('btn-toggle-custom-q');
  const customQuestionBox = document.getElementById('custom-question-box');

  if (btnToggleCustomQ && customQuestionBox) {
    btnToggleCustomQ.addEventListener('click', () => {
      customQuestionBox.classList.toggle('hidden');
      if (!customQuestionBox.classList.contains('hidden')) {
        customQuestionBox.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Save Custom Question Handler
  const btnSaveCustomQ = document.getElementById('btn-save-custom-q');
  if (btnSaveCustomQ) {
    btnSaveCustomQ.addEventListener('click', () => {
      const qText = document.getElementById('cq-text').value.trim();
      const opt1 = document.getElementById('cq-opt1').value.trim();
      const opt2 = document.getElementById('cq-opt2').value.trim();
      const opt3 = document.getElementById('cq-opt3').value.trim();
      const opt4 = document.getElementById('cq-opt4').value.trim();
      const story = document.getElementById('cq-story').value.trim();

      if (!qText || !opt1 || !opt2) {
        showToast('⚠️ Please enter a question and at least 2 options!');
        return;
      }

      const options = [opt1, opt2];
      if (opt3) options.push(opt3);
      if (opt4) options.push(opt4);

      quizQuestionsBank[currentQuizMode].push({
        question: qText,
        category: 'Custom Question',
        options: options,
        correct: 0, // Option A is the correct answer
        explanation: story || 'A special custom question created with love!'
      });

      // Clear Inputs
      document.getElementById('cq-text').value = '';
      document.getElementById('cq-opt1').value = '';
      document.getElementById('cq-opt2').value = '';
      document.getElementById('cq-opt3').value = '';
      document.getElementById('cq-opt4').value = '';
      document.getElementById('cq-story').value = '';
      customQuestionBox.classList.add('hidden');

      currentQuestionIdx = 0;
      quizScore = 0;
      renderQuestion();

      showToast('💖 New Question Added To Quiz Successfully!');
    });
  }

  renderQuestion();

  // --------------------------------------------------------------------------
  // 17. PAGE 10: SAME MOON CANVAS & WHISPERS
  // --------------------------------------------------------------------------
  const moonCanvas = document.getElementById('moon-canvas');
  const moonCtx = moonCanvas ? moonCanvas.getContext('2d') : null;

  function drawMoonScene() {
    if (!moonCanvas || !moonCtx) return;
    moonCanvas.width = moonCanvas.parentElement.clientWidth;
    moonCanvas.height = moonCanvas.parentElement.clientHeight;

    const w = moonCanvas.width;
    const h = moonCanvas.height;

    moonCtx.clearRect(0, 0, w, h);

    // Draw Giant Moon
    const moonX = w / 2;
    const moonY = h * 0.35;
    const moonRadius = 60;

    moonCtx.beginPath();
    moonCtx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
    moonCtx.fillStyle = '#FFFDF5';
    moonCtx.shadowBlur = 40;
    moonCtx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    moonCtx.fill();
    moonCtx.shadowBlur = 0;

    // Moon Texture Craters
    moonCtx.fillStyle = 'rgba(200, 200, 200, 0.2)';
    moonCtx.beginPath();
    moonCtx.arc(moonX - 15, moonY - 10, 12, 0, Math.PI * 2);
    moonCtx.arc(moonX + 18, moonY + 12, 16, 0, Math.PI * 2);
    moonCtx.arc(moonX - 5, moonY + 20, 10, 0, Math.PI * 2);
    moonCtx.fill();

    // Silhouettes looking up
    moonCtx.fillStyle = '#070B18';
    moonCtx.fillRect(0, h - 30, w, 30); // Hill

    requestAnimationFrame(drawMoonScene);
  }

  drawMoonScene();

  // Send Whisper to Moon
  const btnSendWhisper = document.getElementById('btn-send-whisper');
  if (btnSendWhisper) {
    btnSendWhisper.addEventListener('click', () => {
      const input = document.getElementById('whisper-input');
      const val = input.value.trim();
      if (!val) return;

      document.getElementById('whisper-status').textContent = `✨ Your wish "${val}" was sent to the moon for ${state.partner2}!`;
      input.value = '';
      showToast('✨ Wish Floating To The Moon!');
    });
  }

  // --------------------------------------------------------------------------
  // 17. PAGE 10: CHAT SIMULATOR ENGINE & VOICE MESSAGES
  // --------------------------------------------------------------------------
  const chatBody = document.getElementById('chat-body');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const typingIndicator = document.getElementById('typing-indicator');

  function renderChat() {
    if (!chatBody) return;
    chatBody.innerHTML = '';
    chatMessages.forEach(msg => {
      const wrapper = document.createElement('div');
      wrapper.className = `chat-bubble-wrapper ${msg.sender === 'me' ? 'sent' : 'received'}`;

      if (msg.isVoice) {
        wrapper.innerHTML = `
          <div class="chat-bubble">
            <div class="chat-voice-bubble">
              <button class="btn-vn-play" data-chat-speech="${msg.speechText || 'I love you'}">▶️</button>
              <div>
                <strong>🎙️ Voice Message</strong>
                <div style="font-size: 0.75rem; opacity: 0.8;">${msg.text}</div>
              </div>
            </div>
            <div class="chat-meta">${msg.time} ${msg.sender === 'me' ? '✓✓' : ''}</div>
          </div>
        `;
      } else {
        wrapper.innerHTML = `
          <div class="chat-bubble">
            ${msg.text}
            <div class="chat-meta">${msg.time} ${msg.sender === 'me' ? '✓✓' : ''}</div>
          </div>
        `;
      }

      chatBody.appendChild(wrapper);
    });

    chatBody.scrollTop = chatBody.scrollHeight;
  }

  renderChat();

  // Chat Play Speech handler
  document.addEventListener('click', (e) => {
    const speechBtn = e.target.closest('[data-chat-speech]');
    if (speechBtn && 'speechSynthesis' in window) {
      const text = speechBtn.dataset.chatSpeech;
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.rate = 0.95;
      window.speechSynthesis.speak(utt);
      showToast('🎙️ Playing Chat Voice Message');
    }
  });

  // Chat Mic button event listener
  const btnChatMic = document.getElementById('btn-chat-mic');
  if (btnChatMic) {
    btnChatMic.addEventListener('click', () => {
      const sampleVoiceNoteText = `Aapki bohot yaad aa rahi hai ${state.partner2}... Jaldi aao na! ❤️`;
      chatMessages.push({
        sender: 'me',
        text: 'Voice note (0:08) - "Aapki bohot yaad aa rahi hai..."',
        speechText: sampleVoiceNoteText,
        isVoice: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true
      });

      renderChat();
      showToast('🎙️ Voice Note Sent in Chat!');

      // Auto Response Voice Note Simulation
      setTimeout(() => {
        typingIndicator.classList.add('active');
        document.getElementById('typing-text-label').textContent = `${state.partner2} is recording a voice note...`;
      }, 800);

      setTimeout(() => {
        typingIndicator.classList.remove('active');
        chatMessages.push({
          sender: 'them',
          text: `Voice note (0:12) - "I love you too ${state.partner1}! Hugs!"`,
          speechText: `I love you too ${state.partner1}! Sending you thousands of hugs!`,
          isVoice: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: true
        });

        renderChat();
        showToast(`🎙️ Voice Message from ${state.partner2}`);
      }, 2600);
    });
  }

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    chatMessages.push({
      sender: 'me',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    });

    chatInput.value = '';
    renderChat();

    // Auto Response Simulation
    setTimeout(() => {
      typingIndicator.classList.add('active');
      document.getElementById('typing-text-label').textContent = `${state.partner2} is typing...`;
    }, 600);

    setTimeout(() => {
      typingIndicator.classList.remove('active');
      const replies = [
        `I love you so much ${state.partner1}! ❤️`,
        `Can't wait until I get to hold you in my arms! 🥰`,
        `You are my absolute favorite person in the world! ✨`,
        `Sending you 1,000 warm kisses across the miles! 💋`
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      chatMessages.push({
        sender: 'them',
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true
      });

      renderChat();
      showToast(`💬 New Message from ${state.partner2}`);
    }, 2200);
  });

  document.getElementById('btn-chat-heart').addEventListener('click', () => {
    chatInput.value = '❤️ I love you!';
  });

  // --------------------------------------------------------------------------
  // 16. PAGE 10: FOREVER US & LOVE BURST FINALE
  // --------------------------------------------------------------------------
  document.getElementById('btn-love-burst-finale').addEventListener('click', (e) => {
    showToast('🌹 Love Burst Explosion Activated!');
    for (let i = 0; i < 40; i++) {
      setTimeout(() => {
        spawnFloatingHeart();
      }, i * 30);
    }
  });

  document.getElementById('btn-quick-love-burst').addEventListener('click', (e) => {
    createHeartExplosion(e.clientX, e.clientY, document.body);
    showToast('💖 Sparkles Sent!');
  });

  // --------------------------------------------------------------------------
  // 17. PERSONALIZATION MODAL & SETTINGS
  // --------------------------------------------------------------------------
  const modalPersonalize = document.getElementById('modal-personalize');

  document.getElementById('btn-personalize').addEventListener('click', () => {
    modalPersonalize.classList.add('active');
  });

  document.getElementById('btn-close-personalize').addEventListener('click', () => {
    modalPersonalize.classList.remove('active');
  });

  document.getElementById('form-personalize').addEventListener('submit', (e) => {
    e.preventDefault();
    state.partner1 = document.getElementById('input-partner1').value;
    state.partner2 = document.getElementById('input-partner2').value;
    state.city1 = document.getElementById('input-city1').value;
    state.city2 = document.getElementById('input-city2').value;
    state.reunionDate = document.getElementById('input-reunion-date').value;
    state.startDate = document.getElementById('input-start-date').value;
    state.customQuote = document.getElementById('input-custom-quote').value;

    saveState();
    modalPersonalize.classList.remove('active');
    showToast('⚙️ Settings Saved & App Personalized!');
  });

  document.getElementById('btn-reset-personalize').addEventListener('click', () => {
    state = { ...defaultState };
    saveState();
    modalPersonalize.classList.remove('active');
    showToast('🔄 Reset To Defaults!');
  });

  // --------------------------------------------------------------------------
  // 18. CUSTOM GLOW CURSOR & TOASTS
  // --------------------------------------------------------------------------
  const cursorGlow = document.getElementById('cursor-glow');
  const cursorDot = document.getElementById('cursor-dot');

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
  });

  function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }

  // --------------------------------------------------------------------------
  // 19. SCROLL REVEAL OBSERVER
  // --------------------------------------------------------------------------
  const observerOptions = {
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.scroll-reveal').forEach(sec => {
    observer.observe(sec);
  });

  // Mobile Menu Toggle
  const btnMobileMenu = document.getElementById('btn-mobile-menu');
  const navMenu = document.getElementById('nav-menu');

  if (btnMobileMenu && navMenu) {
    btnMobileMenu.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

});
