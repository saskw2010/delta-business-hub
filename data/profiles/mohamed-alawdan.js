(() => {
  const data = window.DBH_MEETING_DATA;
  if (!data || !Array.isArray(data.people)) return;

  const index = data.people.findIndex(person => person.order === 2);
  const profile = {
    id: 'mohamed-alawdan', order: 2, status: 'verified', initials: 'MA',
    profileUrl: { ar: 'leaders/mohamed-alawdan.html', en: 'leaders/mohamed-alawdan.html' },
    name: { ar: 'محمد العوضان', en: 'Mohamed Alawdan' },
    title: { ar: 'مؤسس ورئيس تنفيذي — Awdan Consult', en: 'Founder & CEO — Awdan Consult' },
    bio: {
      ar: 'خبير تطوير أعمال وتشغيل واستشارات في قطاع الأغذية والمشروبات والضيافة، بخبرة تتجاوز 20 عامًا عبر 10 أسواق. شارك في تطوير وتشغيل وتوسيع أكثر من 150 مشروعًا، ويجمع بين تقييم الأعمال، رفع الربحية، بناء الأنظمة التشغيلية، التدريب، الجودة وسلامة الغذاء، وصناعة فرص النمو والاستثمار.',
      en: 'A food, beverage, hospitality, and business-development expert with 20+ years of experience across 10 markets. He has supported more than 150 projects, combining business evaluation, profitability improvement, operating systems, training, quality, food safety, growth, and investment generation.'
    },
    recommendation: {
      ar: 'نرشحه داخل Delta Business Hub لقيادة تقييم وتنمية المشروعات الغذائية، بناء نماذج الامتياز والتوسع، مراجعة التشغيل والتكاليف، تأهيل المنتجات والمطاعم للاستثمار، وتكوين مسارات نمو عابرة للأسواق في مصر والخليج وأوروبا.',
      en: 'Recommended to lead food-sector business evaluation and growth, franchise and scale models, operating and cost reviews, investment readiness, and cross-market expansion across Egypt, the GCC, and Europe.'
    },
    sectors: [
      { ar: 'الأغذية والمشروبات', en: 'Food & Beverage' },
      { ar: 'الضيافة', en: 'Hospitality' },
      { ar: 'تقييم الأعمال', en: 'Business Evaluation' },
      { ar: 'النمو والاستثمار', en: 'Growth & Investment' },
      { ar: 'التدريب', en: 'Training' },
      { ar: 'سلامة الغذاء والجودة', en: 'Food Safety & Quality' }
    ]
  };

  if (index >= 0) data.people[index] = profile;
  else data.people.push(profile);
})();
