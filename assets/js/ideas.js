(() => {
  const LOCAL_KEY = 'dbh-local-ideas';
  const base = document.body.dataset.base || '';
  const ar = document.documentElement.lang === 'ar';
  const t = ar ? {
    saved:'محفوظ في هذا المتصفح', looking:'نبحث عن', details:'عرض التفاصيل ←', browser:'محلي على المتصفح', market:'السوق', ideaId:'رقم الفكرة', submitted:'مقدم الفكرة', skills:'مهارات مفيدة', remote:'مفتوح / عن بُعد', member:'عضو في المجتمع', confirm:'هل تريد حذف جميع الأفكار المحفوظة محليًا في هذا المتصفح؟', unavailable:'تعذر تحميل دليل الأفكار.'
  } : {
    saved:'Saved in this browser', looking:'Looking for', details:'View details →', browser:'Browser-local', market:'Market', ideaId:'Idea ID', submitted:'Submitted by', skills:'Useful skills', remote:'Open / remote', member:'Community member', confirm:'Remove all ideas saved locally in this browser?', unavailable:'The idea directory could not be loaded.'
  };
  const grid = document.querySelector('[data-ideas-grid]');
  const count = document.querySelector('[data-results-count]');
  const empty = document.querySelector('[data-empty-state]');
  const search = document.querySelector('[data-idea-search]');
  const category = document.querySelector('[data-category-filter]');
  const stage = document.querySelector('[data-stage-filter]');
  const sort = document.querySelector('[data-sort-filter]');
  const dialog = document.querySelector('[data-idea-dialog]');
  const dialogContent = document.querySelector('[data-dialog-content]');
  let ideas = [];

  const escape = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const getLocal = () => { try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]'); } catch { return []; } };
  const card = item => `<article class="idea-card"><div class="idea-top"><span class="tag">${escape(item.category)}</span><span class="stage-pill">${escape(item.stage)}</span></div>${item.local ? `<span class="local-pill">${t.saved}</span>` : ''}<h3>${escape(item.title)}</h3><p>${escape(item.summary)}</p><div class="looking-for"><small>${t.looking}</small><strong>${escape(item.lookingFor)}</strong></div><button class="text-button" type="button" data-open-idea="${escape(item.id)}">${t.details}</button></article>`;
  const render = () => {
    const term = search.value.trim().toLowerCase();
    let filtered = ideas.filter(item => {
      const haystack = [item.title,item.summary,item.lookingFor,...(item.skills || [])].join(' ').toLowerCase();
      return (!term || haystack.includes(term)) && (category.value === 'all' || item.category === category.value) && (stage.value === 'all' || item.stage === stage.value);
    });
    filtered.sort((a,b) => sort.value === 'title' ? a.title.localeCompare(b.title) : sort.value === 'stage' ? a.stage.localeCompare(b.stage) : new Date(b.createdAt)-new Date(a.createdAt));
    grid.innerHTML = filtered.map(card).join(''); count.textContent = filtered.length; empty.hidden = filtered.length !== 0; grid.hidden = filtered.length === 0;
  };
  const openIdea = id => {
    const item = ideas.find(candidate => candidate.id === id); if (!item) return;
    const skills = (item.skills || []).map(skill => `<span>${escape(skill)}</span>`).join('');
    dialogContent.innerHTML = `<article class="dialog-details"><div class="dialog-meta"><span class="tag">${escape(item.category)}</span><span class="stage-pill">${escape(item.stage)}</span>${item.local ? `<span class="local-pill">${t.browser}</span>` : ''}</div><h2>${escape(item.title)}</h2><p>${escape(item.summary)}</p><div class="detail-grid"><div><small>${t.looking}</small><strong>${escape(item.lookingFor)}</strong></div><div><small>${t.market}</small><strong>${escape(item.location || t.remote)}</strong></div><div><small>${t.ideaId}</small><strong>${escape(item.id)}</strong></div><div><small>${t.submitted}</small><strong>${escape(item.owner || t.member)}</strong></div></div>${skills ? `<h3>${t.skills}</h3><div class="skill-list">${skills}</div>` : ''}</article>`;
    dialog.showModal();
  };
  grid.addEventListener('click', event => { const button=event.target.closest('[data-open-idea]'); if(button) openIdea(button.dataset.openIdea); });
  document.querySelector('[data-dialog-close]').addEventListener('click',()=>dialog.close()); dialog.addEventListener('click',event=>{if(event.target===dialog) dialog.close();});
  [search,category,stage,sort].forEach(control=>control.addEventListener(control===search?'input':'change',render));
  document.querySelector('[data-reset-filters]').addEventListener('click',()=>{search.value='';category.value='all';stage.value='all';sort.value='newest';render();});
  document.querySelector('[data-clear-local]').addEventListener('click',()=>{if(!getLocal().length)return;if(confirm(t.confirm)){localStorage.removeItem(LOCAL_KEY);ideas=ideas.filter(item=>!item.local);render();}});
  Promise.all([fetch(`${base}data/ideas.json`).then(r=>{if(!r.ok)throw new Error();return r.json();}),fetch(`${base}data/categories.json`).then(r=>{if(!r.ok)throw new Error();return r.json();})]).then(([showcase,categories])=>{category.insertAdjacentHTML('beforeend',categories.map(name=>`<option>${escape(name)}</option>`).join(''));ideas=[...getLocal().map(item=>({...item,local:true})),...showcase];render();const requested=new URLSearchParams(location.search).get('idea');if(requested)openIdea(requested);}).catch(()=>{ideas=getLocal().map(item=>({...item,local:true}));if(ideas.length)render();else grid.innerHTML=`<div class="loading-card">${t.unavailable}</div>`;});
})();
