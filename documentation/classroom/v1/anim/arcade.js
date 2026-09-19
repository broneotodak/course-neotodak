/* One clock per cabinet: no independent timers to drift while paused. */
(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const cabinets = [];

  document.querySelectorAll('[data-arcade]').forEach((root) => {
    const captions = [...root.querySelectorAll('.arcade-caption')];
    const dots = [...root.querySelectorAll('.arcade-dot')];
    const visuals = [...root.querySelectorAll('[data-from], [data-only]')];
    const typed = [...root.querySelectorAll('[data-type]')];
    const dialog = root.querySelector('.arcade-dialog');
    const status = root.querySelector('.arcade-status');
    const toggle = root.querySelector('[data-action="toggle"]');
    const label = root.querySelector('[data-play-label]');
    const duration = Number(root.dataset.beatMs);
    const kind = root.dataset.arcade;
    const name = root.querySelector('figcaption').textContent.trim();
    const score = root.querySelector('[data-score]');
    const slider = root.querySelector('[data-slider]');
    const hero = root.querySelector('[data-hero]');
    let beat = reduced.matches ? captions.length - 1 : 0;
    let elapsed = 0;
    let manual = reduced.matches;
    let playing = !reduced.matches;
    let hovered = root.matches(':hover');
    let focused = root.contains(document.activeElement);
    let visible = false;
    let lastStatus = '';

    const running = () => playing && !hovered && !focused && visible && !document.hidden;
    const show = (element, yes) => { element.style.visibility = yes ? 'visible' : 'hidden'; };

    function render() {
      const still = manual || reduced.matches;
      const phase = still ? duration : elapsed;
      root.dataset.beat = String(beat + 1);
      visuals.forEach((element) => {
        const first = Number(element.dataset.from);
        const only = element.dataset.only;
        show(element, only !== undefined
          ? beat === Number(only)
          : beat > first || (beat === first && phase >= Number(element.dataset.delay || 0)));
      });
      captions.forEach((caption, index) => {
        show(caption, index === beat);
        caption.setAttribute('aria-hidden', String(index !== beat));
      });
      dots.forEach((dot, index) => {
        if (index === beat) dot.setAttribute('aria-current', 'step');
        else dot.removeAttribute('aria-current');
      });
      // Reveal whole characters, including a brief gap between the two prompt lines.
      let characters = beat === 0 && !still ? Math.floor(phase / 48) : Infinity;
      typed.forEach((line) => {
        const text = line.dataset.type;
        const value = text.slice(0, Math.max(0, characters));
        if (line.textContent !== value) line.textContent = value;
        characters -= text.length + 1;
      });
      const gameBeat = kind === 'tour' ? 3 : 2;
      const gamePhase = beat < gameBeat ? 0 : beat > gameBeat || still ? 2400 : phase / duration * 2400;
      root.style.setProperty('--arc-game-time', `${-gamePhase}ms`);
      if (score) score.textContent = beat > 3 || (beat === 3 && phase >= duration * .82) ? '1 : 0' : '0 : 0';
      if (slider && hero) {
        const amount = beat < 2 ? 0 : beat > 2 || still ? 1 : Math.floor(Math.min(1, phase / 1600) * 6) / 6;
        slider.setAttribute('x', String(114 + 66 * amount));
        hero.setAttribute('x', String(244 + 32 * amount));
        const hop = beat === 1 && !still ? Math.round(Math.sin(phase / duration * Math.PI) * 8 / 2) * 2 : 0;
        hero.setAttribute('y', String(134 - 18 * amount - hop));
      }
      updateStatus();
    }

    function updateStatus() {
      const active = running();
      root.dataset.running = String(active);
      root.dataset.playing = String(playing);
      label.textContent = playing ? 'Pause' : 'Play';
      toggle.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} ${name}`);
      const reason = !playing ? 'Paused' : focused ? 'Paused · focus' : hovered ? 'Paused · hover'
        : !visible || document.hidden ? 'Paused · offscreen' : 'Playing';
      const nextStatus = `${reason} · ${beat + 1}/${captions.length}`;
      if (nextStatus !== lastStatus) {
        status.textContent = nextStatus;
        lastStatus = nextStatus;
      }
    }

    root.querySelectorAll('[data-action]').forEach((button) => {
      button.setAttribute('aria-controls', dialog.id);
      if (button !== toggle) button.setAttribute('aria-label', `${button.textContent.trim()} beat: ${name}`);
      button.addEventListener('click', () => {
        if (button.dataset.action === 'toggle') {
          playing = !playing;
          if (playing && manual) {
            elapsed = 0;
            manual = false;
          }
          dialog.setAttribute('aria-live', 'off');
        } else {
          playing = false;
          manual = true;
          dialog.setAttribute('aria-live', 'polite');
          const direction = button.dataset.action === 'next' ? 1 : -1;
          beat = (beat + direction + captions.length) % captions.length;
          elapsed = 0;
        }
        render();
      });
    });
    root.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'mouse' || event.pointerType === 'pen') hovered = true;
      updateStatus();
    });
    root.addEventListener('pointerleave', () => { hovered = false; updateStatus(); });
    root.addEventListener('focusin', () => { focused = true; updateStatus(); });
    root.addEventListener('focusout', (event) => {
      focused = root.contains(event.relatedTarget);
      updateStatus();
    });
    reduced.addEventListener('change', () => {
      // Changing the OS preference never silently restarts a paused animation.
      playing = false;
      manual = true;
      beat = captions.length - 1;
      elapsed = 0;
      render();
    });
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateStatus();
    });
    observer.observe(root);
    root.dataset.ready = 'true';
    root.querySelector('.arcade-controls').hidden = false;
    render();
    cabinets.push({
      updateStatus,
      advance(delta) {
        if (!running()) return;
        elapsed += delta;
        if (elapsed >= duration) {
          elapsed %= duration;
          beat = (beat + 1) % captions.length;
        }
        render();
      }
    });
  });

  document.addEventListener('visibilitychange', () => cabinets.forEach((cabinet) => cabinet.updateStatus()));
  let previous = performance.now();
  function frame(now) {
    const delta = Math.min(now - previous, 100);
    previous = now;
    cabinets.forEach((cabinet) => cabinet.advance(delta));
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
