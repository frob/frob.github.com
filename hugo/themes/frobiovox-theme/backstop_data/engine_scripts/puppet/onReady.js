module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./clickAndHoverHelper')(page, scenario);

  await page.evaluate(() => {
    const el = document.querySelector('.site-description-rotating');
    if (!el) return;
    const maxId = setInterval(() => {}, 1 << 30);
    for (let i = 1; i <= maxId; i++) clearInterval(i);
    let text = '';
    try {
      const list = JSON.parse(el.getAttribute('data-rotate') || '[]');
      if (Array.isArray(list) && list.length) text = list[0];
    } catch (_) {}
    if (!text) {
      const sr = document.querySelector('.site-description.sr-only');
      if (sr) text = sr.textContent.trim();
    }
    el.textContent = text;
  });
};
