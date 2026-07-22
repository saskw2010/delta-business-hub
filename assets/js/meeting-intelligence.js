(() => {
  const data = window.DBH_MEETING_DATA;
  if (!data) return;

  const lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
  const pick = value => typeof value === 'object' && value !== null && (value.ar || value.en) ? (value[lang] || value.en || value.ar) : value;
  const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

  document.querySelectorAll('[data-meeting-id]').forEach(node => node.textContent = data.id);
  document.querySelectorAll('[data-meeting-date]').forEach(node => node.textContent = data.date);
  document.querySelectorAll('[data-source-quality]').forEach(node => node.textContent = pick(data.sourceQuality));
  document.querySelectorAll('[data-meeting-summary]').forEach(node => node.textContent = pick(data.summary));

  const quoteTarget = document.querySelector('[data-meeting-expressions]');
  if (quoteTarget) {
    quoteTarget.innerHTML = data.expressions.map(item => `<article class="meeting-quote"><p>${escapeHtml(pick(item))}</p></article>`).join('');
  }

  const opportunityTarget = document.querySelector('[data-opportunity-grid]');
  const opportunityCount = document.querySelector('[data-opportunity-count]');
  const opportunitySearch = document.querySelector('[data-opportunity-search]');

  const renderOpportunities = term => {
    if (!opportunityTarget) return;
    const normalized = String(term || '').trim().toLowerCase();
    let visible = 0;
    opportunityTarget.innerHTML = data.opportunities.map(item => {
      const haystack = [item.id, pick(item.title), pick(item.stage), pick(item.fit), pick(item.description), pick(item.next)].join(' ').toLowerCase();
      const hidden = normalized && !haystack.includes(normalized);
      if (!hidden) visible += 1;
      return `<article class="opportunity-card" ${hidden ? 'hidden' : ''}>
        <div class="opportunity-head"><div><span class="opportunity-id">${escapeHtml(item.id)}</span><h3>${escapeHtml(pick(item.title))}</h3></div><span class="opportunity-priority" title="Priority">${escapeHtml(item.priority)}</span></div>
        <div class="opportunity-meta"><span>${escapeHtml(pick(item.stage))}</span><span>${escapeHtml(pick(item.fit))}</span></div>
        <p>${escapeHtml(pick(item.description))}</p>
        <div class="opportunity-next"><small>${lang === 'ar' ? 'الخطوة التالية' : 'Next move'}</small><strong>${escapeHtml(pick(item.next))}</strong></div>
      </article>`;
    }).join('');
    if (opportunityCount) opportunityCount.textContent = String(visible);
  };

  renderOpportunities('');
  opportunitySearch?.addEventListener('input', event => renderOpportunities(event.target.value));

  const svg = document.querySelector('[data-concept-graph]');
  const tabs = [...document.querySelectorAll('[data-graph-tab]')];
  const search = document.querySelector('[data-graph-search]');
  const title = document.querySelector('[data-graph-title]');
  const description = document.querySelector('[data-graph-description]');
  const counts = document.querySelector('[data-graph-counts]');
  const details = document.querySelector('[data-graph-details]');
  let activeKey = tabs[0]?.dataset.graphTab || 'relationships';
  let selectedNodeId = null;
  let searchTerm = '';

  const graphLabel = node => pick(node.label);
  const graphDesc = node => pick(node.desc);
  const typeLabel = type => {
    const labels = {
      ar: {core:'محور',principle:'مبدأ',evidence:'دليل',asset:'أصل',workflow:'مسار',channel:'قناة',platform:'منصة',construction:'تشييد',technology:'تقنية',health:'صحة',food:'غذاء',market:'سوق',service:'خدمة',role:'دور',expertise:'خبرة',place:'مكان',knowledge:'معرفة'},
      en: {core:'Core',principle:'Principle',evidence:'Evidence',asset:'Asset',workflow:'Workflow',channel:'Channel',platform:'Platform',construction:'Construction',technology:'Technology',health:'Health',food:'Food',market:'Market',service:'Service',role:'Role',expertise:'Expertise',place:'Place',knowledge:'Knowledge'}
    };
    return labels[lang][type] || type;
  };

  const createSvg = (name, attrs = {}) => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', name);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
  };

  const connectedEdge = (edge, id) => edge.from === id || edge.to === id;

  const showDetails = (graph, node) => {
    if (!details) return;
    if (!node) {
      details.innerHTML = `<span class="node-type">${lang === 'ar' ? 'الكونسبت جراف' : 'Concept graph'}</span><h3>${escapeHtml(pick(graph.title))}</h3><p>${escapeHtml(pick(graph.description))}</p><p>${lang === 'ar' ? 'اختر عقدة لاستعراض معناها وعلاقاتها المباشرة.' : 'Select a node to inspect its meaning and direct relationships.'}</p>`;
      return;
    }
    const relations = graph.edges.filter(edge => connectedEdge(edge, node.id)).map(edge => {
      const otherId = edge.from === node.id ? edge.to : edge.from;
      const other = graph.nodes.find(candidate => candidate.id === otherId);
      const direction = edge.from === node.id ? (lang === 'ar' ? 'إلى' : 'to') : (lang === 'ar' ? 'من' : 'from');
      return `<li><strong>${escapeHtml(pick(edge.relation))}</strong> ${direction} ${escapeHtml(graphLabel(other))}</li>`;
    }).join('');
    details.innerHTML = `<span class="node-type">${escapeHtml(typeLabel(node.type))}</span><h3>${escapeHtml(graphLabel(node))}</h3><p>${escapeHtml(graphDesc(node))}</p><ul>${relations}</ul>`;
  };

  const renderGraph = () => {
    if (!svg) return;
    const graph = data.graphs[activeKey];
    selectedNodeId = null;
    if (title) title.textContent = pick(graph.title);
    if (description) description.textContent = pick(graph.description);
    if (counts) counts.textContent = lang === 'ar' ? `${graph.nodes.length} عقد · ${graph.edges.length} علاقة` : `${graph.nodes.length} nodes · ${graph.edges.length} relationships`;
    showDetails(graph, null);
    svg.innerHTML = '';
    svg.setAttribute('viewBox', '0 0 1200 680');

    const defs = createSvg('defs');
    const marker = createSvg('marker', {id:'graph-arrow',viewBox:'0 0 10 10',refX:'9',refY:'5',markerWidth:'6',markerHeight:'6',orient:'auto-start-reverse'});
    marker.appendChild(createSvg('path', {d:'M 0 0 L 10 5 L 0 10 z',fill:'currentColor'}));
    defs.appendChild(marker);
    svg.appendChild(defs);

    const edgeLayer = createSvg('g', {'data-edge-layer':''});
    const nodeLayer = createSvg('g', {'data-node-layer':''});
    svg.append(edgeLayer, nodeLayer);

    graph.edges.forEach(edge => {
      const from = graph.nodes.find(node => node.id === edge.from);
      const to = graph.nodes.find(node => node.id === edge.to);
      if (!from || !to) return;
      const line = createSvg('line', {x1:from.x,y1:from.y,x2:to.x,y2:to.y,class:'graph-edge','data-from':edge.from,'data-to':edge.to,'marker-end':'url(#graph-arrow)'});
      edgeLayer.appendChild(line);
    });

    graph.nodes.forEach(node => {
      const width = node.type === 'core' ? 190 : 160;
      const height = node.type === 'core' ? 72 : 62;
      const group = createSvg('g', {class:'graph-node','data-node-id':node.id,'data-type':node.type,transform:`translate(${node.x - width / 2} ${node.y - height / 2})`,tabindex:'0',role:'button','aria-label':graphLabel(node)});
      group.appendChild(createSvg('rect', {width,height,rx:'18',ry:'18'}));
      const foreignObject = createSvg('foreignObject', {x:'0',y:'0',width,height});
      const div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
      div.className = 'graph-node-label';
      div.textContent = graphLabel(node);
      foreignObject.appendChild(div);
      group.appendChild(foreignObject);
      const select = () => {
        selectedNodeId = node.id;
        nodeLayer.querySelectorAll('.graph-node').forEach(item => item.classList.toggle('selected', item.dataset.nodeId === node.id));
        edgeLayer.querySelectorAll('.graph-edge').forEach(item => item.classList.toggle('dimmed', item.dataset.from !== node.id && item.dataset.to !== node.id));
        showDetails(graph, node);
      };
      group.addEventListener('click', select);
      group.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(); } });
      nodeLayer.appendChild(group);
    });

    applyGraphSearch();
  };

  const applyGraphSearch = () => {
    if (!svg) return;
    const graph = data.graphs[activeKey];
    const term = searchTerm.trim().toLowerCase();
    svg.querySelectorAll('.graph-node').forEach(group => {
      const node = graph.nodes.find(item => item.id === group.dataset.nodeId);
      const matched = !term || [graphLabel(node), graphDesc(node), typeLabel(node.type)].join(' ').toLowerCase().includes(term);
      group.classList.toggle('dimmed', Boolean(term) && !matched);
      group.classList.toggle('match', Boolean(term) && matched);
    });
  };

  tabs.forEach(tab => tab.addEventListener('click', () => {
    activeKey = tab.dataset.graphTab;
    tabs.forEach(item => item.classList.toggle('active', item === tab));
    searchTerm = '';
    if (search) search.value = '';
    renderGraph();
  }));

  search?.addEventListener('input', event => {
    searchTerm = event.target.value;
    applyGraphSearch();
  });

  renderGraph();
})();
