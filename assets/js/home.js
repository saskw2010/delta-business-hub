const escapeHome = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

fetch('data/ideas.json')
  .then(response => {
    if (!response.ok) throw new Error('Unable to load ideas');
    return response.json();
  })
  .then(ideas => {
    document.querySelector('[data-stat="ideas"]').textContent = ideas.length;
    document.querySelector('[data-stat="categories"]').textContent = new Set(ideas.map(item => item.category)).size;
    document.querySelector('[data-stat="open"]').textContent = ideas.filter(item => item.openToPartners).length;
    const target = document.querySelector('[data-featured-ideas]');
    target.innerHTML = ideas.filter(item => item.featured).slice(0, 3).map(item => `
      <article class="idea-card">
        <div class="idea-top"><span class="tag">${escapeHome(item.category)}</span><span class="stage-pill">${escapeHome(item.stage)}</span></div>
        <h3>${escapeHome(item.title)}</h3>
        <p>${escapeHome(item.summary)}</p>
        <div class="looking-for"><small>Looking for</small><strong>${escapeHome(item.lookingFor)}</strong></div>
        <a class="text-link" href="ideas.html?idea=${encodeURIComponent(item.id)}">View opportunity <span>→</span></a>
      </article>`).join('');
  })
  .catch(() => {
    const target = document.querySelector('[data-featured-ideas]');
    if (target) target.innerHTML = '<div class="loading-card">Ideas are temporarily unavailable. Please try again later.</div>';
  });
