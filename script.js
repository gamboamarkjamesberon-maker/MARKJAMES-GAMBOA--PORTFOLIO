document.addEventListener('DOMContentLoaded', () => {
  const htmlEl = document.documentElement;
  const tplButtons = document.querySelectorAll('.tpl-btn');

  // 1. 3 Non-Gaming Full-Effect Interactive Themes
  let currentTheme = localStorage.getItem('mj-kinetic-fx-theme') || 'solar-eclipse';
  setTheme(currentTheme);

  function setTheme(theme) {
    currentTheme = theme;
    htmlEl.setAttribute('data-fx-theme', theme);
    localStorage.setItem('mj-kinetic-fx-theme', theme);

    tplButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
  }

  tplButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setTheme(btn.dataset.theme);
    });
  });

  // 2. Scroll Progress Bar
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = `${pct}%`;
  });

  // 3. Cursor Spotlight & Magnetic Buttons
  const spotlight = document.getElementById('cursorSpotlight');
  window.addEventListener('mousemove', (e) => {
    if (spotlight) {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
    }
  });

  document.querySelectorAll('.magnetic-el').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // 4. 3D Hover Tilt + Dynamic Mouse Glare on Cards
  document.querySelectorAll('.tilt-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      if (window.innerWidth < 768) return;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // =========================================================
  // 5. FULL-EFFECT INTERACTIVE KINETIC CANVAS ENGINE
  //    - Solar Eclipse Gravitational Rings & Light Streams
  //    - Liquid Aurora Silk Ribbons
  //    - Neural Constellation Starfield
  // =========================================================
  const canvas = document.getElementById('kineticBgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: width * 0.5,
      y: height * 0.42,
      vx: 0,
      vy: 0,
      down: false
    };

    const shockwaves = [];
    const lightTrail = [];
    let tick = 0;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    });

    window.addEventListener('mousemove', (e) => {
      mouse.vx = e.clientX - mouse.x;
      mouse.vy = e.clientY - mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      for (let i = 0; i < 3; i++) {
        lightTrail.push({
          x: mouse.x + (Math.random() - 0.5) * 12,
          y: mouse.y + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 2.2 + mouse.vx * 0.1,
          vy: (Math.random() - 0.5) * 2.2 + mouse.vy * 0.1,
          r: Math.random() * 3.5 + 1.5,
          life: 1.0
        });
      }
    });

    window.addEventListener('mousedown', (e) => {
      mouse.down = true;
      shockwaves.push({ x: e.clientX, y: e.clientY, r: 8, alpha: 0.95 });
    });

    window.addEventListener('mouseup', () => {
      mouse.down = false;
    });

    // Orbital & Constellation Particles
    let nodes = [];
    function initNodes() {
      nodes = [];
      const count = Math.min(95, Math.floor((width * height) / 14000));
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.9,
          vy: (Math.random() - 0.5) * 0.9,
          size: Math.random() * 2.6 + 1.2,
          orbitAngle: Math.random() * Math.PI * 2,
          orbitSpeed: (Math.random() * 0.02 + 0.01) * (i % 2 === 0 ? 1 : -1)
        });
      }
    }
    initNodes();

    function drawSolarEclipse() {
      // Glowing Gravitational Core at Cursor
      const coreGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 240);
      coreGrad.addColorStop(0, 'rgba(251, 191, 36, 0.22)');
      coreGrad.addColorStop(0.45, 'rgba(249, 115, 22, 0.08)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, width, height);

      // Rotating Gyroscopic Eclipse Rings around Cursor
      ctx.save();
      ctx.translate(mouse.x, mouse.y);
      for (let r = 0; r < 3; r++) {
        ctx.save();
        ctx.rotate(tick * (0.4 + r * 0.25) * (r % 2 === 0 ? 1 : -1));
        ctx.strokeStyle = r === 0 ? 'rgba(251, 191, 36, 0.42)' : 'rgba(249, 115, 22, 0.24)';
        ctx.lineWidth = r === 0 ? 1.8 : 1.1;
        ctx.setLineDash([28 + r * 14, 18 + r * 10]);
        ctx.beginPath();
        ctx.ellipse(0, 0, 65 + r * 42, 46 + r * 30, r * 0.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();

      // Golden Dust Particles Swirl into Orbit around Cursor
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 220 && dist > 1) {
          const pull = ((220 - dist) / 220) * (mouse.down ? -2.8 : 1.5);
          // Tangential swirl + radial pull
          n.x += (dx / dist) * pull - (dy / dist) * 1.4;
          n.y += (dy / dist) * pull + (dx / dist) * 1.4;
        }

        ctx.fillStyle = dist < 220 ? 'rgba(251, 191, 36, 0.9)' : 'rgba(245, 158, 11, 0.32)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawLiquidAurora() {
      // Multi-layered Sine Wave Silk Ribbons that bend toward the cursor!
      const ribbonColors = [
        'rgba(52, 211, 153, 0.24)',
        'rgba(56, 189, 248, 0.20)',
        'rgba(16, 185, 129, 0.16)',
        'rgba(125, 211, 252, 0.14)'
      ];

      for (let r = 0; r < 4; r++) {
        ctx.beginPath();
        const baseY = height * (0.28 + r * 0.14);
        ctx.moveTo(0, baseY);

        for (let x = 0; x <= width; x += 28) {
          const distToMouse = Math.hypot(x - mouse.x, baseY - mouse.y);
          const mouseInfluence = Math.max(0, 1 - distToMouse / 340);
          const pullY = (mouse.y - baseY) * mouseInfluence * 0.45;
          const wave =
            Math.sin(x * 0.004 + tick * (0.9 + r * 0.2) + r) * 48 +
            Math.cos(x * 0.009 - tick * 0.7) * 22;
          ctx.lineTo(x, baseY + wave + pullY);
        }

        ctx.strokeStyle = ribbonColors[r];
        ctx.lineWidth = 3.2 - r * 0.4;
        ctx.stroke();
      }

      // Floating Bioluminescent Droplets
      nodes.forEach((n) => {
        n.y -= 0.45;
        n.x += Math.sin(tick + n.orbitAngle) * 0.4;
        if (n.y < -10) n.y = height + 10;

        const dist = Math.hypot(mouse.x - n.x, mouse.y - n.y);
        ctx.fillStyle = dist < 180 ? 'rgba(52, 211, 153, 0.9)' : 'rgba(56, 189, 248, 0.35)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * (dist < 180 ? 1.5 : 1), 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawCyberNeural() {
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > width) a.vx *= -1;
        if (a.y < 0 || a.y > height) a.vy *= -1;

        const dxM = mouse.x - a.x;
        const dyM = mouse.y - a.y;
        const distM = Math.hypot(dxM, dyM);

        if (distM < 210 && distM > 1) {
          const force = ((210 - distM) / 210) * (mouse.down ? -2.4 : 1.2);
          a.x += (dxM / distM) * force;
          a.y += (dyM / distM) * force;

          // Connect node directly to cursor with glowing neural beam
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - distM / 210) * 0.55})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Connect nearby nodes to each other
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(192, 132, 252, ${(1 - d / 120) * 0.25})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        ctx.fillStyle = distM < 210 ? '#22d3ee' : '#c084fc';
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function renderLoop() {
      tick += 0.025;
      ctx.clearRect(0, 0, width, height);

      if (currentTheme === 'solar-eclipse') {
        drawSolarEclipse();
      } else if (currentTheme === 'liquid-aurora') {
        drawLiquidAurora();
      } else {
        drawCyberNeural();
      }

      // Draw Luminous Cursor Ribbon Trail
      for (let i = lightTrail.length - 1; i >= 0; i--) {
        const p = lightTrail[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.028;
        if (p.life <= 0) {
          lightTrail.splice(i, 1);
          continue;
        }
        ctx.fillStyle =
          currentTheme === 'solar-eclipse'
            ? `rgba(251, 191, 36, ${p.life * 0.85})`
            : currentTheme === 'liquid-aurora'
            ? `rgba(52, 211, 153, ${p.life * 0.85})`
            : `rgba(34, 211, 238, ${p.life * 0.85})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Click Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.r += 10;
        sw.alpha -= 0.025;
        if (sw.alpha <= 0) {
          shockwaves.splice(i, 1);
          continue;
        }
        ctx.strokeStyle =
          currentTheme === 'solar-eclipse'
            ? `rgba(251, 191, 36, ${sw.alpha})`
            : currentTheme === 'liquid-aurora'
            ? `rgba(52, 211, 153, ${sw.alpha})`
            : `rgba(192, 132, 252, ${sw.alpha})`;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      requestAnimationFrame(renderLoop);
    }

    renderLoop();
  }

  // 6. Typing Effect in Hero
  const typingEl = document.getElementById('typingText');
  const phrases = [
    '1st Year IT Student @ Mindoro State University',
    'Aspiring Future Engineer · Calapan City',
    'C# & C Programming Certified (99%+ Score)',
    'Creative Thinker · Problem Solver · Builder'
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeLoop() {
    if (!typingEl) return;
    const currentPhrase = phrases[phraseIdx];
    typingEl.textContent = currentPhrase.substring(0, charIdx);

    if (!isDeleting && charIdx < currentPhrase.length) {
      charIdx++;
      setTimeout(typeLoop, 55);
    } else if (!isDeleting && charIdx === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1800);
    } else if (isDeleting && charIdx > 0) {
      charIdx--;
      setTimeout(typeLoop, 30);
    } else {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeLoop, 350);
    }
  }
  typeLoop();

  // 7. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 8. Scroll Reveal
  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealItems.forEach((el) => observer.observe(el));

  // 9. Certificate Modal
  const certificates = {
    csharp: {
      badge: 'CODECHUM C# · VERIFIED',
      score: '99.8% · 1312/1315',
      subtitle: 'C# Programming 1 (1F3-ITC112-CSharp)',
      description:
        'has successfully completed C# Programming 1 in 1F3-ITC112-CSharp with a total score of 1312/1315 at Mindoro State University.',
      date: 'Nov. 8, 2026',
      id: '32405',
      rawScore: '1312 / 1315',
      url: 'https://minsu.codechum.com/certificates/32405'
    },
    clang: {
      badge: 'CODECHUM C · VERIFIED',
      score: '99.0% · 1352/1365',
      subtitle: 'C Programming 1 (1F3-ITC112)',
      description:
        'has successfully completed C Programming 1 in 1F3-ITC112 with a total score of 1352/1365 at Mindoro State University.',
      date: 'Nov. 8, 2026',
      id: '32362',
      rawScore: '1352 / 1365',
      url: 'https://minsu.codechum.com/certificates/32362'
    }
  };

  const modal = document.getElementById('certModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalDoneBtn = document.getElementById('modalDoneBtn');

  function openCertModal(key) {
    const data = certificates[key];
    if (!data || !modal) return;
    document.getElementById('modalBadge').textContent = data.badge;
    document.getElementById('modalScore').textContent = data.score;
    document.getElementById('modalSubtitle').textContent = data.subtitle;
    document.getElementById('modalDescription').textContent = data.description;
    document.getElementById('modalDate').textContent = data.date;
    document.getElementById('modalCertId').textContent = data.id;
    document.getElementById('modalRawScore').textContent = data.rawScore;
    document.getElementById('modalVerifyLink').href = data.url;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeCertModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.cert-card').forEach((card) => {
    card.addEventListener('click', () => openCertModal(card.dataset.cert));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCertModal(card.dataset.cert);
      }
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeCertModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeCertModal);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeCertModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCertModal(); });

  // 10. Copy Email Button
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
        const original = copyEmailBtn.textContent;
        copyEmailBtn.textContent = 'Copied!';
        setTimeout(() => { copyEmailBtn.textContent = original; }, 2000);
      } catch {
        copyEmailBtn.textContent = email;
      }
    });
  }

  // 11. Direct Email Sender
  const contactForm = document.getElementById('contactForm');
  const sendDirectBtn = document.getElementById('sendDirectBtn');
  const sendBtnText = document.getElementById('sendBtnText');
  const openMailAppBtn = document.getElementById('openMailAppBtn');
  const formFeedback = document.getElementById('formFeedback');

  function triggerMailto() {
    const name = document.getElementById('senderName').value.trim() || 'Portfolio Visitor';
    const senderEmail = document.getElementById('senderEmail').value.trim();
    const subjectInput = document.getElementById('senderSubject').value.trim() || `Portfolio Message from ${name}`;
    const message = document.getElementById('senderMessage').value.trim() || 'Hi MJ!';

    const subject = encodeURIComponent(subjectInput);
    const body = encodeURIComponent(
      `Hi Mark James (MJ),

${message}

---
From: ${name}${senderEmail ? ` (${senderEmail})` : ''}`
    );
    window.location.href = `mailto:gamboamarkjamesberon@gmail.com?subject=${subject}&body=${body}`;
  }

  if (openMailAppBtn) {
    openMailAppBtn.addEventListener('click', triggerMailto);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('senderSubject').value.trim();
      const message = document.getElementById('senderMessage').value.trim();

      if (sendDirectBtn) sendDirectBtn.disabled = true;
      if (sendBtnText) sendBtnText.textContent = 'Sending to MJ... ⏳';
      if (formFeedback) {
        formFeedback.className = 'form-feedback info';
        formFeedback.textContent = 'Dispatching message to gamboamarkjamesberon@gmail.com...';
      }

      try {
        const res = await fetch('https://formsubmit.co/ajax/gamboamarkjamesberon@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            _subject: `[Portfolio] ${subject}`,
            message
          })
        });

        if (res.ok) {
          if (formFeedback) {
            formFeedback.className = 'form-feedback success';
            formFeedback.textContent = '✓ Message sent directly to MJ! (First-time use: click the one-time activation link sent to gamboamarkjamesberon@gmail.com).';
          }
          contactForm.reset();
        } else {
          throw new Error('Fallback to mailto');
        }
      } catch {
        if (formFeedback) {
          formFeedback.className = 'form-feedback info';
          formFeedback.textContent = 'Opening your email app so you can send the message directly...';
        }
        triggerMailto();
      } finally {
        if (sendDirectBtn) sendDirectBtn.disabled = false;
        if (sendBtnText) sendBtnText.textContent = "Send Direct to MJ's Inbox 🚀";
      }
    });
  }
});
