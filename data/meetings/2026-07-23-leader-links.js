(() => {
  const graph = window.DBH_MEETING_DATA?.graphs?.ecosystem;
  if (!graph) return;

  graph.nodes.push(
    {
      id: 'person-mohamed-alawdan', type: 'people', x: 845, y: 330,
      label: { ar: 'محمد العوضان', en: 'Mohamed Alawdan' },
      desc: { ar: 'قائد ضيافة وأغذية ومشروبات، ومقيّم أعمال وصانع نمو واستثمار غذائي.', en: 'Hospitality and F&B leader, business evaluator, and builder of food-sector growth and investment opportunities.' }
    },
    {
      id: 'person-mostafa-el-nagar', type: 'people', x: 685, y: 515,
      label: { ar: 'م. مصطفى النجار', en: 'Eng. Mostafa El Nagar' },
      desc: { ar: 'معماري برمجيات وذكاء اصطناعي يربط الخبرات بالمنصات والعمليات والتنفيذ.', en: 'Software and AI architect connecting expertise with platforms, processes, and execution.' }
    }
  );

  graph.edges.push(
    { from: 'people', to: 'person-mohamed-alawdan', relation: { ar: 'يضم', en: 'includes' } },
    { from: 'person-mohamed-alawdan', to: 'food', relation: { ar: 'يقود', en: 'leads' } },
    { from: 'person-mohamed-alawdan', to: 'evaluation', relation: { ar: 'يقيّم', en: 'evaluates' } },
    { from: 'person-mohamed-alawdan', to: 'consulting', relation: { ar: 'يقدم', en: 'delivers' } },
    { from: 'person-mohamed-alawdan', to: 'training', relation: { ar: 'يدرّب', en: 'trains' } },
    { from: 'person-mohamed-alawdan', to: 'growth', relation: { ar: 'يولد', en: 'generates' } },
    { from: 'person-mohamed-alawdan', to: 'export', relation: { ar: 'يفتح أسواقًا', en: 'opens markets' } },
    { from: 'people', to: 'person-mostafa-el-nagar', relation: { ar: 'يضم', en: 'includes' } },
    { from: 'person-mostafa-el-nagar', to: 'software', relation: { ar: 'يبني', en: 'builds' } },
    { from: 'person-mostafa-el-nagar', to: 'process', relation: { ar: 'يصمم', en: 'designs' } },
    { from: 'person-mostafa-el-nagar', to: 'hub', relation: { ar: 'يعمر المنصة', en: 'architects' } }
  );
})();
