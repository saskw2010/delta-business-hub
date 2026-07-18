(() => {
  const LOCAL_KEY = 'dbh-local-ideas';
  const ar = document.documentElement.lang === 'ar';
  const t = ar ? {
    required:'هذا الحقل مطلوب.', min:n=>`يرجى إدخال ${n} أحرف على الأقل.`, max:n=>`يرجى عدم تجاوز ${n} حرفًا.`, check:'يرجى مراجعة هذه القيمة.', owner:'مساهم محلي', clear:'هل تريد مسح جميع الحقول في هذا النموذج؟'
  } : {
    required:'This field is required.', min:n=>`Please enter at least ${n} characters.`, max:n=>`Please use no more than ${n} characters.`, check:'Please check this value.', owner:'Local contributor', clear:'Clear all fields in this form?'
  };
  const form = document.querySelector('[data-idea-form]');
  const fields = [...form.querySelectorAll('input, select, textarea')].filter(field => field.type !== 'button' && field.type !== 'submit');
  const summary = form.elements.summary;
  const success = document.querySelector('[data-form-success]');
  const progressValue = document.querySelector('[data-progress-value]');
  const progressBar = document.querySelector('[data-progress-bar]');
  const errorFor = field => document.querySelector(`[data-error-for="${field.name}"]`);
  const messageFor = field => { if(field.validity.valueMissing)return t.required;if(field.validity.tooShort)return t.min(field.minLength);if(field.validity.tooLong)return t.max(field.maxLength);return t.check; };
  const validate = field => { const target=errorFor(field); if(!target)return field.checkValidity(); target.textContent=field.checkValidity()?'':messageFor(field); field.setAttribute('aria-invalid',String(!field.checkValidity())); return field.checkValidity(); };
  const updateProgress = () => { const required=fields.filter(field=>field.required); const complete=required.filter(field=>field.type==='checkbox'?field.checked:field.value.trim()&&field.checkValidity()).length; const percent=Math.round((complete/required.length)*100); progressValue.textContent=percent; progressBar.style.width=`${percent}%`; document.querySelector('[data-summary-count]').textContent=summary.value.length; };
  const getLocal=()=>{try{return JSON.parse(localStorage.getItem(LOCAL_KEY)||'[]')}catch{return[]}};
  const createId=()=>{const date=new Date().toISOString().slice(0,10).replaceAll('-','');const token=Math.random().toString(36).slice(2,7).toUpperCase();return`DBH-LOCAL-${date}-${token}`};
  fields.forEach(field=>{field.addEventListener(field.type==='checkbox'||field.tagName==='SELECT'?'change':'input',()=>{if(field.getAttribute('aria-invalid')==='true')validate(field);updateProgress();});field.addEventListener('blur',()=>{if(field.required||field.value)validate(field);});});
  form.addEventListener('submit',event=>{event.preventDefault();const valid=fields.filter(field=>field.required||field.value).map(validate).every(Boolean);if(!valid){form.querySelector('[aria-invalid="true"]')?.focus();return;}const data=new FormData(form);const item={id:createId(),title:data.get('title').trim(),summary:data.get('summary').trim(),category:data.get('category'),stage:data.get('stage'),lookingFor:data.get('lookingFor').trim(),skills:data.get('skills').split(',').map(value=>value.trim()).filter(Boolean),location:data.get('location').trim(),owner:data.get('owner').trim()||t.owner,createdAt:new Date().toISOString(),openToPartners:true,featured:false};const local=getLocal();local.unshift(item);localStorage.setItem(LOCAL_KEY,JSON.stringify(local.slice(0,50)));success.hidden=false;success.scrollIntoView({behavior:'smooth',block:'center'});form.reset();updateProgress();});
  document.querySelector('[data-reset-form]').addEventListener('click',()=>{if(confirm(t.clear)){form.reset();fields.forEach(field=>{const target=errorFor(field);if(target)target.textContent='';field.removeAttribute('aria-invalid');});success.hidden=true;updateProgress();}});
  updateProgress();
})();
