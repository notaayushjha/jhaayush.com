/* TEKTONIC legal pages: gentle entrances, the contents rail follows your place, animations rest on hidden tabs. */
(() => {
  document.documentElement.classList.remove('no-js');
  const rv = [...document.querySelectorAll('.rv')];
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .08, rootMargin: '0px 0px -4% 0px' });
    rv.forEach(el => io.observe(el));
  } else rv.forEach(el => el.classList.add('in'));

  const links = [...document.querySelectorAll('.toc a')];
  if (links.length) {
    const targets = links.map(a => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
    let current = null;
    const pick = () => {
      const line = innerHeight * .3;
      let best = targets[0];
      targets.forEach(t => { if (t.getBoundingClientRect().top <= line) best = t; });
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) best = targets[targets.length - 1];
      if (best !== current) {
        current = best;
        links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + best.id));
      }
    };
    let raf = null;
    addEventListener('scroll', () => { if (raf === null) raf = requestAnimationFrame(() => { raf = null; pick(); }); }, { passive: true });
    pick();
  }
  document.addEventListener('visibilitychange', () => document.body.classList.toggle('paused', document.hidden));
})();
