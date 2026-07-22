(() => {
  const data = window.DBH_MEETING_DATA;
  if (!data) return;

  const lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
  const pick = value => typeof value === 'object' && value !== null && (value.ar || value.en) ? (value[lang] || value.en || value.ar) : value;
  const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

  const graph = data.graphs?.ecosystem;
  const shell = document.querySelector('[data-sector-network]');
  const details = document.querySelector('[data-sector-details]');

  if (graph && shell) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('sector-network-canvas');
    svg.setAttribute('viewBox', '0 0 1200 700');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');

    graph.edges.forEach(edge => {
      const from = graph.nodes.find(node => node.id === edge.from);
      const to = graph.nodes.find(node => node.id === edge.to);
      if (!from || !to) return;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', from.x);
      line.setAttribute('y1', from.y);
      line.setAttribute('x2', to.x);
      line.setAttribute('y2', to.y);
      line.setAttribute('class', 'sector-edge');
      svg.appendChild(line);
    });

    shell.appendChild(svg);

    const showDetails = node => {
      if (!details) return;
      const relations = graph.edges.filter(edge => edge.from === node.id || edge.to === node.id).length;
      details.innerHTML = `<strong>${escapeHtml(pick(node.label))}</strong><p>${escapeHtml(pick(node.desc))}</p><small>${lang === 'ar' ? `${relations} علاقات مباشرة` : `${relations} direct relationships`}</small>`;
      shell.querySelectorAll('.sector-node').forEach(item => item.classList.toggle('active', item.dataset.nodeId === node.id));
    };

    graph.nodes.forEach(node => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `sector-node sector-node-${node.type}`;
      button.dataset.nodeId = node.id;
      button.style.left = `${(node.x / 1200) * 100}%`;
      button.style.top = `${(node.y / 700) * 100}%`;
      button.textContent = pick(node.label);
      button.setAttribute('aria-label', `${pick(node.label)}: ${pick(node.desc)}`);
      button.addEventListener('click', () => showDetails(node));
      button.addEventListener('mouseenter', () => showDetails(node));
      shell.appendChild(button);
    });

    const first = graph.nodes.find(node => node.id === 'hub') || graph.nodes[0];
    if (first) showDetails(first);
  }

  const grid = document.querySelector('[data-leader-grid]');
  const count = document.querySelector('[data-leader-count]');
  if (grid && Array.isArray(data.people)) {
    const people = [...data.people].sort((a, b) => a.order - b.order);
    if (count) count.textContent = String(people.filter(person => person.status === 'verified').length);
    grid.innerHTML = people.map(person => {
      const pending = person.status !== 'verified';
      const tags = (person.sectors || []).map(tag => `<span>${escapeHtml(pick(tag))}</span>`).join('');
      const organization = person.organization ? `<div class="leader-organization">${escapeHtml(pick(person.organization))}</div>` : '';
      const evidence = person.evidence ? `<div class="leader-evidence">${escapeHtml(pick(person.evidence))}</div>` : '';
      const profileUrl = person.profileUrl ? pick(person.profileUrl) : '';
      const action = !pending && profileUrl ? `<a class="leader-profile-link" href="${escapeHtml(profileUrl)}">${lang === 'ar' ? 'افتح صفحة القائد' : 'Open leader profile'}</a>` : '';
      return `<article class="leader-card ${pending ? 'pending' : ''}">
        <span class="leader-rank">#${escapeHtml(person.order)}</span>
        <div class="leader-avatar">${escapeHtml(person.initials)}</div>
        <span class="leader-status">${pending ? (lang === 'ar' ? 'بانتظار البروفايل' : 'Profile pending') : (lang === 'ar' ? 'ملف قائد موثق' : 'Verified leader profile')}</span>
        <h3>${escapeHtml(pick(person.name))}</h3>
        <div class="leader-title">${escapeHtml(pick(person.title))}</div>
        ${organization}${evidence}
        <p>${escapeHtml(pick(person.bio))}</p>
        <div class="leader-tags">${tags}</div>
        ${action}
      </article>`;
    }).join('');
  }
})();
