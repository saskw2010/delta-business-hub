(() => {
  const data = window.DBH_MEETING_DATA;
  if (!data) return;

  data.people = [
    {
      id: 'leader-construction', order: 1, status: 'pending', initials: 'C',
      name: { ar: 'قائد التشييد والفحص', en: 'Construction & Inspection Leader' },
      title: { ar: 'الملف قيد الاستلام', en: 'Profile pending' },
      bio: { ar: 'مساحة مخصصة لقائد يجمع خبرة التنفيذ وضبط المشروعات والكميات والتفتيش والاعتمادات.', en: 'Reserved for a leader combining delivery, project controls, quantities, inspection, and approvals.' },
      sectors: [{ ar: 'التشييد', en: 'Construction' }, { ar: 'الفحص', en: 'Inspection' }, { ar: 'الكميات', en: 'Quantities' }]
    },
    {
      id: 'mohamed-alawdan', order: 2, status: 'verified', initials: 'MA',
      name: { ar: 'محمد العوضان', en: 'Mohamed Alawdan' },
      title: { ar: 'مؤسس ومدير تنفيذي - Awdan Consult', en: 'Founder & CEO - Awdan Consult' },
      organization: { ar: 'استشارات وتدريب الضيافة والأغذية والمشروبات', en: 'Hospitality and Food & Beverage Consulting & Training' },
      evidence: { ar: 'أكثر من 20 عامًا - أكثر من 150 مشروعًا - 10 دول', en: '20+ years - 150+ projects - 10 countries' },
      profileUrl: { ar: 'leaders/mohamed-alawdan.html', en: 'leaders/mohamed-alawdan.html' },
      facebookUrl: 'https://www.facebook.com/profile.php?id=61569028362064',
      bio: { ar: 'خبير تطوير أعمال وتشغيل أغذية ومشروبات يقود Awdan Consult منذ 2001. يجمع بين تقييم البيزنس، والاستشارات الاستراتيجية، والتدريب العملي، وتطوير المفاهيم، وأنظمة التشغيل والجودة وسلامة الغذاء، مع خبرة واسعة في المطاعم والفنادق والمطابخ المركزية والتموين الطبي والجوي والصناعي والامتياز التجاري.', en: 'Food, beverage, and business-development professional leading Awdan Consult since 2001. He combines business evaluation, strategic consulting, practical training, concept development, operating systems, quality, and food safety across restaurants, hotels, central kitchens, healthcare, aviation, industrial catering, and franchising.' },
      sectors: [{ ar: 'الضيافة', en: 'Hospitality' }, { ar: 'الأغذية والمشروبات', en: 'Food & Beverage' }, { ar: 'تقييم الأعمال', en: 'Business Evaluation' }, { ar: 'الاستشارات', en: 'Consulting' }, { ar: 'التدريب', en: 'Training' }, { ar: 'النمو والامتياز', en: 'Growth & Franchising' }]
    },
    {
      id: 'mostafa-el-nagar', order: 3, status: 'verified', initials: 'ME',
      name: { ar: 'المهندس مصطفى النجار', en: 'Eng. Mostafa El Nagar' },
      title: { ar: 'معماري حلول الذكاء الاصطناعي والبرمجيات المؤسسية', en: 'Enterprise AI & Software Solutions Architect' },
      organization: { ar: 'WytSky / SKY365', en: 'WytSky / SKY365' },
      evidence: { ar: 'أكثر من 20 عامًا في البرمجيات المؤسسية والمنصات', en: '20+ years in enterprise software and platforms' },
      profileUrl: { ar: 'leaders/mostafa-el-nagar.html', en: 'leaders/mostafa-el-nagar.html' },
      bio: { ar: 'مهندس برمجيات ومعماري منصات بخبرة تتجاوز 20 عامًا في .NET وERP والحوسبة السحابية والذكاء الاصطناعي ووكلاء الأعمال. يركز على تحويل احتياجات الشركات والمجتمعات إلى منصات عملية ومسارات تنفيذ قابلة للقياس.', en: 'Software and platform architect with 20+ years of experience across .NET, ERP, cloud, AI, and business agents. He focuses on turning organizational and community needs into practical platforms and measurable execution workflows.' },
      sectors: [{ ar: 'البرمجيات', en: 'Software' }, { ar: 'ERP', en: 'ERP' }, { ar: 'الذكاء الاصطناعي', en: 'AI' }, { ar: 'تصميم العمليات', en: 'Process Design' }]
    },
    {
      id: 'leader-investment', order: 4, status: 'pending', initials: 'I',
      name: { ar: 'قائد الاستثمار وتقييم الأعمال', en: 'Investment & Business Evaluation Leader' },
      title: { ar: 'الملف قيد الاستلام', en: 'Profile pending' },
      bio: { ar: 'مساحة مخصصة لتقييم الفرص ونماذج الأعمال والتمويل والاستثمار وبناء حالات القرار.', en: 'Reserved for opportunity assessment, business models, finance, investment, and decision cases.' },
      sectors: [{ ar: 'الاستثمار', en: 'Investment' }, { ar: 'تقييم الأعمال', en: 'Business Evaluation' }, { ar: 'التمويل', en: 'Funding' }]
    },
    {
      id: 'leader-real-estate', order: 5, status: 'pending', initials: 'R',
      name: { ar: 'قائد العقارات والوساطة', en: 'Real Estate & Brokerage Leader' },
      title: { ar: 'الملف قيد الاستلام', en: 'Profile pending' },
      bio: { ar: 'مساحة مخصصة لخبرات التطوير العقاري والوساطة والتسويق والتقييم وربط الفرص بالمشترين والمستثمرين.', en: 'Reserved for real-estate development, brokerage, marketing, valuation, and investor connections.' },
      sectors: [{ ar: 'العقارات', en: 'Real Estate' }, { ar: 'الوساطة', en: 'Brokerage' }, { ar: 'التقييم', en: 'Valuation' }]
    },
    {
      id: 'leader-consulting-growth', order: 6, status: 'pending', initials: 'G',
      name: { ar: 'قائد الاستشارات والنمو', en: 'Consulting & Growth Leader' },
      title: { ar: 'الملف قيد الاستلام', en: 'Profile pending' },
      bio: { ar: 'مساحة مخصصة للاستراتيجية والنمو والتوسع وتحويل الخبرة إلى عروض استشارية قابلة للبيع.', en: 'Reserved for strategy, growth, expansion, and converting expertise into sellable advisory offers.' },
      sectors: [{ ar: 'الاستشارات', en: 'Consulting' }, { ar: 'النمو', en: 'Growth' }, { ar: 'الاستراتيجية', en: 'Strategy' }]
    },
    {
      id: 'leader-training-culture', order: 7, status: 'pending', initials: 'T',
      name: { ar: 'قائد التدريب والثقافة والمعرفة', en: 'Training, Culture & Knowledge Leader' },
      title: { ar: 'الملف قيد الاستلام', en: 'Profile pending' },
      bio: { ar: 'مساحة مخصصة للتدريب والكتب والثقافة العامة وتحويل المعرفة المتنوعة إلى قدرات وفرص جديدة.', en: 'Reserved for training, books, general culture, and turning broad knowledge into capabilities and opportunities.' },
      sectors: [{ ar: 'التدريب', en: 'Training' }, { ar: 'الثقافة العامة', en: 'General Culture' }, { ar: 'الكتب', en: 'Books' }]
    },
    {
      id: 'leader-process', order: 8, status: 'pending', initials: 'P',
      name: { ar: 'قائد العمليات وخطوط العمل', en: 'Operations & Process Pipeline Leader' },
      title: { ar: 'الملف قيد الاستلام', en: 'Profile pending' },
      bio: { ar: 'مساحة مخصصة لتصميم العمليات وسلاسل القيمة وخطوط العمل والحوكمة والتحسين المستمر.', en: 'Reserved for process design, value chains, workflow pipelines, governance, and continuous improvement.' },
      sectors: [{ ar: 'العمليات', en: 'Operations' }, { ar: 'Pipeline Process', en: 'Pipeline Process' }, { ar: 'الحوكمة', en: 'Governance' }]
    }
  ];

  data.graphs.ecosystem = {
    animated: true,
    title: { ar: 'كونسبت جراف القطاعات والقادة', en: 'Animated Sectors & Leaders Concept Graph' },
    description: { ar: 'منظومة حية تربط قطاعات الأعمال بالقدرات والقادة والفرص، وتكبر كلما أرسل عضو جديد بروفايله.', en: 'A living ecosystem connecting business sectors to capabilities, leaders, and opportunities, expanding as each new member submits a profile.' },
    nodes: [
      { id: 'hub', type: 'core', x: 600, y: 340, label: { ar: 'Delta Business Hub', en: 'Delta Business Hub' }, desc: { ar: 'مركز الربط بين الأشخاص والقطاعات والمعرفة والمشروعات والأسواق.', en: 'The connection center for people, sectors, knowledge, projects, and markets.' } },
      { id: 'construction', type: 'construction', x: 600, y: 65, label: { ar: 'التشييد', en: 'Construction' }, desc: { ar: 'التنفيذ والتكلفة والكميات والمراحل وإدارة المشروعات.', en: 'Delivery, cost, quantities, stages, and project management.' } },
      { id: 'inspection', type: 'inspection', x: 825, y: 95, label: { ar: 'الفحص والاعتماد', en: 'Inspection & Approval' }, desc: { ar: 'التفتيش والمسؤولية والاعتمادات وشهادات الدفع.', en: 'Inspection, accountability, approvals, and payment certificates.' } },
      { id: 'realestate', type: 'realestate', x: 1030, y: 205, label: { ar: 'العقارات', en: 'Real Estate' }, desc: { ar: 'التطوير والتسويق والتقييم وإدارة الأصول.', en: 'Development, marketing, valuation, and asset management.' } },
      { id: 'brokerage', type: 'broker', x: 1080, y: 390, label: { ar: 'الوساطة', en: 'Brokerage' }, desc: { ar: 'ربط الفرص بالعملاء والمستثمرين والشركاء.', en: 'Connect opportunities with customers, investors, and partners.' } },
      { id: 'investment', type: 'investment', x: 955, y: 565, label: { ar: 'الاستثمار والتمويل', en: 'Investment & Funding' }, desc: { ar: 'تقييم الجاهزية وربط المشاريع بالتمويل بعد ظهور الدليل.', en: 'Assess readiness and connect projects to funding after evidence appears.' } },
      { id: 'evaluation', type: 'evaluation', x: 740, y: 635, label: { ar: 'تقييم الأعمال', en: 'Business Evaluation' }, desc: { ar: 'نماذج الأعمال والجدوى والمخاطر وحالات القرار.', en: 'Business models, feasibility, risk, and decision cases.' } },
      { id: 'consulting', type: 'consulting', x: 505, y: 635, label: { ar: 'الاستشارات', en: 'Consulting' }, desc: { ar: 'تحويل الخبرات إلى حلول وعروض وخطط تدخل.', en: 'Turn expertise into solutions, offers, and intervention plans.' } },
      { id: 'growth', type: 'growth', x: 285, y: 565, label: { ar: 'النمو والتوسع', en: 'Growth & Expansion' }, desc: { ar: 'توسيع القنوات والأسواق والمنتجات والشراكات.', en: 'Scale channels, markets, products, and partnerships.' } },
      { id: 'export', type: 'export', x: 135, y: 400, label: { ar: 'التصدير والإفراج', en: 'Export & Clearance' }, desc: { ar: 'الجاهزية التصديرية والمستندات والجمارك والإفراج والقنوات الدولية.', en: 'Export readiness, documentation, customs, clearance, and international channels.' } },
      { id: 'food', type: 'food', x: 175, y: 205, label: { ar: 'المنتجات الغذائية', en: 'Food Products' }, desc: { ar: 'التطوير والجودة والتصنيع والصلاحية والعلامات التجارية.', en: 'Development, quality, manufacturing, shelf life, and brands.' } },
      { id: 'training', type: 'training', x: 375, y: 95, label: { ar: 'التدريب', en: 'Training' }, desc: { ar: 'نقل الخبرات وبناء المهارات وتحويل المعرفة إلى ممارسة.', en: 'Transfer experience, build skills, and turn knowledge into practice.' } },
      { id: 'culture', type: 'culture', x: 490, y: 205, label: { ar: 'الثقافة والكتب', en: 'Culture & Books' }, desc: { ar: 'الثقافة العامة والقراءة والتعلم عبر المجالات كوقود للابتكار.', en: 'General culture, reading, and cross-domain learning as fuel for innovation.' } },
      { id: 'software', type: 'software', x: 710, y: 205, label: { ar: 'البرمجيات والذكاء الاصطناعي', en: 'Software & AI' }, desc: { ar: 'ERP والمنصات والتطبيقات والذكاء الاصطناعي والوكلاء.', en: 'ERP, platforms, applications, AI, and agents.' } },
      { id: 'process', type: 'process', x: 475, y: 410, label: { ar: 'Pipeline Process', en: 'Pipeline Process' }, desc: { ar: 'تحويل الفكرة إلى مسار: استقبال، تحقق، تصميم، تجربة، تنفيذ، قياس.', en: 'Turn an idea into a pipeline: intake, validation, design, pilot, execution, measurement.' } },
      { id: 'people', type: 'people', x: 725, y: 410, label: { ar: 'القادة والخبراء', en: 'Leaders & Experts' }, desc: { ar: 'ملفات الشخصيات وخبراتهم وأصولهم وأسواقهم وما يمكنهم تقديمه.', en: 'Profiles, expertise, assets, markets, and what each person can contribute.' } }
    ],
    edges: [
      { from: 'hub', to: 'process', relation: { ar: 'ينظم', en: 'orchestrates' } },
      { from: 'hub', to: 'people', relation: { ar: 'يجمع', en: 'connects' } },
      { from: 'hub', to: 'construction', relation: { ar: 'يحتضن قطاع', en: 'hosts sector' } },
      { from: 'construction', to: 'inspection', relation: { ar: 'يتحقق عبر', en: 'validated by' } },
      { from: 'construction', to: 'realestate', relation: { ar: 'ينشئ أصول', en: 'creates assets' } },
      { from: 'realestate', to: 'brokerage', relation: { ar: 'يصل للسوق عبر', en: 'reaches market via' } },
      { from: 'brokerage', to: 'investment', relation: { ar: 'يربط بـ', en: 'connects to' } },
      { from: 'investment', to: 'evaluation', relation: { ar: 'يعتمد على', en: 'depends on' } },
      { from: 'evaluation', to: 'consulting', relation: { ar: 'ينتج خطة', en: 'produces plan' } },
      { from: 'consulting', to: 'growth', relation: { ar: 'يدعم', en: 'supports' } },
      { from: 'growth', to: 'export', relation: { ar: 'يتوسع عبر', en: 'scales through' } },
      { from: 'food', to: 'export', relation: { ar: 'يصل للأسواق عبر', en: 'reaches markets via' } },
      { from: 'training', to: 'culture', relation: { ar: 'يتغذى من', en: 'is enriched by' } },
      { from: 'culture', to: 'software', relation: { ar: 'يلهم', en: 'inspires' } },
      { from: 'software', to: 'process', relation: { ar: 'يؤتمت', en: 'automates' } },
      { from: 'people', to: 'construction', relation: { ar: 'يقود', en: 'leads' } },
      { from: 'people', to: 'food', relation: { ar: 'يطور', en: 'develops' } },
      { from: 'people', to: 'software', relation: { ar: 'يبني', en: 'builds' } },
      { from: 'people', to: 'consulting', relation: { ar: 'يقدم', en: 'delivers' } },
      { from: 'process', to: 'evaluation', relation: { ar: 'يمر ببوابة', en: 'passes through' } },
      { from: 'process', to: 'growth', relation: { ar: 'يقيس', en: 'measures' } }
    ]
  };
})();
