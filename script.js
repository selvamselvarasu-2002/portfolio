document.addEventListener('DOMContentLoaded', () => {
  // 1. Dark / Light Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);

  // 2. Mobile Navigation Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuIcon = document.getElementById('mobile-menu-icon');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
      if (mobileMenuIcon) {
        mobileMenuIcon.className = isOpen ? 'fa-solid fa-bars text-xl' : 'fa-solid fa-xmark text-xl';
      }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        if (mobileMenuIcon) mobileMenuIcon.className = 'fa-solid fa-bars text-xl';
      });
    });
  }

  // 3. Interactive Cloud Nodes
  const capNodes = document.querySelectorAll('.cap-node');
  const detailBox = document.getElementById('capability-detail');
  const detailTitle = document.getElementById('cap-detail-title');
  const detailDesc = document.getElementById('cap-detail-desc');

  capNodes.forEach(node => {
    const showDetail = () => {
      const title = node.getAttribute('data-title');
      const desc = node.getAttribute('data-desc');
      if (detailBox && detailTitle && detailDesc) {
        detailTitle.textContent = title;
        detailDesc.textContent = desc;
        detailBox.classList.remove('hidden');
        // On small screens, scroll the drawer into view so users can read it
        if (window.innerWidth < 1024) {
          setTimeout(() => {
            detailBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 50);
        }
      }
    };

    node.addEventListener('mouseenter', showDetail);
    node.addEventListener('click', showDetail);
  });

  // 4. One-Click Email Dispatcher Modal Logic
  const emailModal = document.getElementById('email-modal');
  const openModalBtns = document.querySelectorAll('.open-dispatcher-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const emailText = 'selvamselvarasu81@gmail.com';

  const defaultSubject = encodeURIComponent('Cloud Architecture Inquiry - Selvam S');
  const defaultBody = encodeURIComponent('Hi Selvam,\n\nI reviewed your cloud engineering portfolio and would like to connect regarding...');

  const gmailLink = document.getElementById('gmail-link');
  const outlookLink = document.getElementById('outlook-link');
  if (gmailLink) {
    gmailLink.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailText}&su=${defaultSubject}&body=${defaultBody}`;
  }
  if (outlookLink) {
    outlookLink.href = `https://outlook.live.com/mail/0/deeplink/compose?to=${emailText}&subject=${defaultSubject}&body=${defaultBody}`;
  }

  const openModal = (e) => {
    e.preventDefault();
    if (emailModal) {
      emailModal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  };

  const closeModal = () => {
    if (emailModal) {
      emailModal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  };

  openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (emailModal) {
    emailModal.addEventListener('click', (e) => {
      if (e.target === emailModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && emailModal && !emailModal.classList.contains('hidden')) {
      closeModal();
    }
  });

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText).then(() => {
        if (copyBtnText) {
          copyBtnText.textContent = 'Copied!';
          copyEmailBtn.classList.add('bg-cyan-500', 'text-slate-950');
          setTimeout(() => {
            copyBtnText.textContent = 'Copy';
            copyEmailBtn.classList.remove('bg-cyan-500', 'text-slate-950');
          }, 2000);
        }
      });
    });
  }

  // 5. Global Mesh Canvas Animation
  const canvas = document.getElementById('bg-network-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 1
    }));

    function animateMesh() {
      ctx.clearRect(0, 0, width, height);
      const isLight = document.documentElement.classList.contains('light');

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = isLight 
              ? `rgba(2, 132, 199, ${0.12 * (1 - dist / 130)})`
              : `rgba(6, 182, 212, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.35)' : 'rgba(6, 182, 212, 0.4)';
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      requestAnimationFrame(animateMesh);
    }
    animateMesh();
  }

  // 6. Premium Weather Canvas Engine Around Cloud
  const weatherCanvas = document.getElementById('weather-canvas');
  const cloudElem = document.getElementById('cloud-centerpiece');

  if (weatherCanvas) {
    const wCtx = weatherCanvas.getContext('2d');
    let wWidth = (weatherCanvas.width = weatherCanvas.offsetWidth || 500);
    let wHeight = (weatherCanvas.height = weatherCanvas.offsetHeight || 500);

    window.addEventListener('resize', () => {
      wWidth = weatherCanvas.width = weatherCanvas.offsetWidth || 500;
      wHeight = weatherCanvas.height = weatherCanvas.offsetHeight || 500;
    });

    // Dark Mode Storm Drops
    const rainDrops = Array.from({ length: 40 }, () => ({
      x: Math.random() * wWidth,
      y: Math.random() * wHeight,
      len: Math.random() * 14 + 10,
      speed: Math.random() * 4 + 7,
      opacity: Math.random() * 0.4 + 0.2
    }));

    // Light Mode Gentle Rain / Floating Motes
    const gentleMotes = Array.from({ length: 30 }, () => ({
      x: Math.random() * wWidth,
      y: Math.random() * wHeight,
      radius: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: Math.random() * 0.8 + 0.3,
      opacity: Math.random() * 0.5 + 0.3
    }));

    // Random Lightning Scheduler for Dark Mode (5-12s)
    const triggerLightning = () => {
      if (!document.documentElement.classList.contains('light') && cloudElem) {
        cloudElem.classList.add('lightning-flash');
        setTimeout(() => {
          cloudElem.classList.remove('lightning-flash');
        }, 500);
      }
      const nextDelay = Math.random() * 7000 + 5000;
      setTimeout(triggerLightning, nextDelay);
    };
    setTimeout(triggerLightning, 6000);

    function animateWeather() {
      wCtx.clearRect(0, 0, wWidth, wHeight);
      const isLight = document.documentElement.classList.contains('light');

      if (!isLight) {
        // Dark Mode: Storm Rain Streaks
        wCtx.lineWidth = 1.2;
        rainDrops.forEach(drop => {
          wCtx.beginPath();
          wCtx.strokeStyle = `rgba(56, 189, 248, ${drop.opacity})`;
          wCtx.moveTo(drop.x, drop.y);
          wCtx.lineTo(drop.x - 2, drop.y + drop.len);
          wCtx.stroke();

          drop.y += drop.speed;
          drop.x -= 0.6;

          if (drop.y > wHeight) {
            drop.y = -10;
            drop.x = Math.random() * wWidth;
          }
        });
      } else {
        // Light Mode: Gentle Floating Particles & Light Drops
        gentleMotes.forEach(mote => {
          wCtx.beginPath();
          wCtx.arc(mote.x, mote.y, mote.radius, 0, Math.PI * 2);
          wCtx.fillStyle = `rgba(14, 165, 233, ${mote.opacity})`;
          wCtx.fill();

          mote.y += mote.speedY;
          mote.x += mote.speedX;

          if (mote.y > wHeight) {
            mote.y = -5;
            mote.x = Math.random() * wWidth;
          }
        });
      }

      requestAnimationFrame(animateWeather);
    }
    animateWeather();
  }
});
