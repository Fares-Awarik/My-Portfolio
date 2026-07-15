const { useState, useEffect, useRef, useCallback, useMemo } = React;
const TWEAK_DEFAULTS = window.TWEAK_DEFAULTS;

/* ─── Translations ─── */
const T = {
  en: {
    hello: "Hello, I'm Fares.", name: 'I build digital tools that help businesses work smarter.',
    heroDesc: 'I build business websites and custom Laravel systems that simplify operations, improve customer experience, and support growth.',
    viewProjects: 'Discuss Your Project', contactMe: 'View Selected Work',
    serviceTags: ['Business Websites','Admin Panels','Booking','CRM','WhatsApp'],
    trustLine: 'Based in Türkiye • Available worldwide • Arabic, English & Turkish',
    aboutLabel: 'ABOUT ME', aboutTitle: 'Practical solutions for real business needs',
    aboutP1: "I'm Fares Awarik, a Laravel developer based in Türkiye. I build business websites, admin panels, booking systems, and custom web applications for small and growing businesses.",
    aboutP2: 'My work spans education, pharmaceuticals, legal services, e-commerce, and service-based businesses. I focus on clear structure, practical workflows, and solutions that clients can actually use and manage.',
    servicesLabel: 'WHAT I BUILD', servicesTitle: 'Services built around real business needs',
    servicesDesc: 'Practical web solutions designed to improve your online presence, simplify operations, and support business growth.',
    serviceCards: [
      { title: 'Business Websites', desc: 'Professional, mobile-friendly websites that build trust, explain your services clearly, and turn visitors into inquiries.' },
      { title: 'Custom Laravel Systems', desc: 'Tailored web systems that organize workflows, data, users, and daily operations around how your business actually works.' },
      { title: 'Admin Panels', desc: 'Practical dashboards for managing content, customers, bookings, products, and internal business operations.' },
      { title: 'Booking & Appointment Systems', desc: 'Simple online booking flows that reduce manual messages and make scheduling easier for customers and staff.' },
      { title: 'WhatsApp Integrations', desc: 'Connect website inquiries, contact forms, and customer actions directly to WhatsApp for faster communication.' },
      { title: 'Website Maintenance & Improvements', desc: 'Bug fixes, responsive improvements, deployment support, feature additions, and ongoing maintenance for existing websites.' },
    ],
    projectsLabel: 'SELECTED PROJECTS', projectsTitle: 'Projects built around real business problems',
    projectsDesc: 'A selection of client projects and portfolio concepts across education, pharmaceuticals, legal services, and local businesses.',
    projects: [
      { title: 'Prego Education', subtitle: 'Client Project · Laravel Platform', description: 'A multilingual education platform helping students explore universities and study opportunities in Italy, with an admin panel for managing universities, articles, and website content.', tags: ['Laravel','PHP','Blade','MySQL','Bootstrap'], status: 'Live Project', liveUrl: 'https://eduprego.com/' },
      { title: 'Efektpharma App', subtitle: 'Client Project · Flutter Application', description: 'An offline-first mobile product catalog built for pharmaceutical sales representatives, providing fast access to structured product information without requiring an internet connection.', tags: ['Flutter','Dart','Offline App','Mobile UI'], status: 'In Use Privately' },
      { title: 'Al-Mustafa Legal Consultancy', subtitle: 'Client Project · Business Website', description: 'A professional legal consultancy website designed to present services clearly, build trust, and make it easy for potential clients to contact the business.', tags: ['Laravel','PHP','Blade','Bootstrap'], status: 'Live Project', liveUrl: 'https://almostafa.company/' },
      { title: 'Gümüşhane Yayla Bal', subtitle: 'Client Project · Product Website', description: 'A responsive product-focused website built to present a local honey brand professionally and guide customers toward direct contact and purchase inquiries.', tags: ['Responsive UI','Product Website','Local Business'], status: 'Client Project' },
      { title: 'Furniture Mora', subtitle: 'Portfolio Concept · Furniture Website', description: 'A premium Arabic furniture website concept designed for hotels, restaurants, homes, and commercial spaces, with product-focused sections and direct customer inquiry flows.', tags: ['Arabic UI','Product Website','Responsive UI'], status: 'Live Concept', liveUrl: 'https://fares-awarik.github.io/furniture-mora/' },
    ],
    projectLabels: { problem: 'Problem / goal', built: 'What I built', role: 'My role', result: 'Result / status', stack: 'Tech stack' },
    projectLiveLabel: 'Live Site', projectGithubLabel: 'GitHub',
    trustLabel: 'CLIENT FEEDBACK', trustTitle: 'Trusted through real projects and practical results',
    trustDesc: 'Feedback from clients who used the websites and applications I developed for their businesses.',
    testimonials: [
      { quote: 'The website contributed significantly to developing my work and increasing the number of clients. It strengthened my professional presence and clients’ trust in my services. Fares also provided exceptional responsiveness and support throughout the process.', name: 'Al-Mustafa Legal Consultancy', role: '' },
      { quote: 'The application Fares developed significantly simplified the workflow for both me and my colleagues. It is easy to use, fast, and practical, and whenever an issue occurred, he provided quick support and solutions.', name: 'Mehmet Beşir Daye', role: 'Project Manager — Efektpharma' },
      { quote: 'I was very satisfied with the work, and the website turned out comprehensive and well designed. Our continuous communication throughout the process allowed us to review and refine the necessary sections together.', name: 'Prego Education', role: '' },
    ],
    trustPoints: ['Real Client Projects','Used in Daily Business Operations','Arabic, English & Turkish','Support After Delivery'],
    contactLabel: 'Get in Touch', contactTitle: "Let's Work Together",
    contactDesc: 'If you need a business website, admin panel, booking system, or a practical web solution, feel free to get in touch.',
    contactLinkLabels: ['WhatsApp','Email','LinkedIn','GitHub','Instagram'],
    footer: '© 2026 Fares Awarik — Built with React · Deployed on GitHub Pages.',
    navItems: ['About','Services','Projects','Contact'],
  },
  ar: {
    hello: 'مرحباً، أنا فارس.', name: 'أبني أدوات رقمية تساعد الشركات على العمل بذكاء أكبر.',
    heroDesc: 'أبني مواقع أعمال وأنظمة Laravel مخصصة تبسّط العمليات، وتحسّن تجربة العملاء، وتدعم النمو.',
    viewProjects: 'ناقش مشروعك', contactMe: 'عرض الأعمال المختارة',
    serviceTags: ['مواقع الأعمال','لوحات التحكم','الحجز','CRM','واتساب'],
    trustLine: 'مقيم في تركيا • متاح حول العالم • العربية والإنجليزية والتركية',
    aboutLabel: 'عني', aboutTitle: 'حلول عملية مبنية على احتياجات حقيقية للأعمال',
    aboutP1: 'أنا فارس عواريك، مطور Laravel مقيم في تركيا. أبني مواقع أعمال، ولوحات إدارة، وأنظمة حجز، وتطبيقات ويب مخصصة للشركات الصغيرة والنامية.',
    aboutP2: 'عملت على مشاريع في التعليم، والأدوية، والاستشارات القانونية، والتجارة الإلكترونية، وقطاع الخدمات. أركز على البنية الواضحة، وسير العمل العملي، والحلول التي يستطيع العميل استخدامها وإدارتها فعليًا.',
    servicesLabel: 'ماذا أبني', servicesTitle: 'خدمات مبنية على احتياجات حقيقية للأعمال',
    servicesDesc: 'حلول ويب عملية تساعدك على تحسين حضورك الرقمي، وتبسيط العمل اليومي، ودعم نمو مشروعك.',
    serviceCards: [
      { title: 'مواقع الأعمال', desc: 'مواقع احترافية ومتوافقة مع الهاتف، تساعدك على بناء الثقة، وعرض خدماتك بوضوح، وتحويل الزوار إلى عملاء محتملين.' },
      { title: 'أنظمة Laravel مخصصة', desc: 'أنظمة ويب مصممة حسب طريقة عمل مشروعك لتنظيم البيانات، والمستخدمين، وسير العمل، والعمليات اليومية.' },
      { title: 'لوحات الإدارة', desc: 'لوحات تحكم عملية لإدارة المحتوى، والعملاء، والحجوزات، والمنتجات، والعمليات الداخلية.' },
      { title: 'أنظمة الحجز والمواعيد', desc: 'أنظمة حجز إلكترونية بسيطة تقلل الرسائل اليدوية وتجعل تنظيم المواعيد أسهل للعملاء والموظفين.' },
      { title: 'ربط واتساب', desc: 'ربط استفسارات الموقع، ونماذج التواصل، وإجراءات العملاء مباشرة بواتساب لتسريع التواصل.' },
      { title: 'صيانة وتحسين المواقع', desc: 'إصلاح الأخطاء، وتحسين عرض الهاتف، ودعم النشر والاستضافة، وإضافة الميزات، والصيانة المستمرة للمواقع الحالية.' },
    ],
    projectsLabel: 'مشاريع مختارة', projectsTitle: 'مشاريع مبنية على مشاكل واحتياجات حقيقية',
    projectsDesc: 'مجموعة من مشاريع العملاء ومفاهيم البورتفوليو في مجالات التعليم، والأدوية، والخدمات القانونية، والمشاريع المحلية.',
    projects: [
      { title: 'Prego Education', subtitle: 'مشروع عميل · منصة Laravel', description: 'منصة تعليمية متعددة اللغات تساعد الطلاب على استكشاف الجامعات وفرص الدراسة في إيطاليا، مع لوحة إدارة للجامعات والمقالات ومحتوى الموقع.', tags: ['Laravel','PHP','Blade','MySQL','Bootstrap'], status: 'مشروع منشور', liveUrl: 'https://eduprego.com/' },
      { title: 'Efektpharma App', subtitle: 'مشروع عميل · تطبيق Flutter', description: 'تطبيق كتالوج منتجات يعمل دون اتصال بالإنترنت، تم تطويره لمندوبي شركة أدوية للوصول السريع إلى معلومات المنتجات المنظمة حتى عند عدم توفر الإنترنت.', tags: ['Flutter','Dart','Offline App','Mobile UI'], status: 'قيد الاستخدام بشكل خاص' },
      { title: 'Al-Mustafa Legal Consultancy', subtitle: 'مشروع عميل · موقع أعمال', description: 'موقع احترافي للاستشارات القانونية، صُمم لعرض الخدمات بوضوح، وبناء الثقة، وتسهيل تواصل العملاء المحتملين مع الشركة.', tags: ['Laravel','PHP','Blade','Bootstrap'], status: 'مشروع منشور', liveUrl: 'https://almostafa.company/' },
      { title: 'Gümüşhane Yayla Bal', subtitle: 'مشروع عميل · موقع منتجات', description: 'موقع متجاوب يعرض علامة عسل محلية بصورة احترافية، ويوجه الزوار نحو التواصل المباشر والاستفسار عن المنتجات والشراء.', tags: ['Responsive UI','Product Website','Local Business'], status: 'مشروع عميل' },
      { title: 'Furniture Mora', subtitle: 'مشروع استعراضي · موقع أثاث', description: 'تصور لموقع أثاث عربي فاخر موجه للفنادق، والمطاعم، والمنازل، والمساحات التجارية، مع أقسام لعرض المنتجات ومسارات واضحة لتواصل العملاء.', tags: ['Arabic UI','Product Website','Responsive UI'], status: 'مفهوم منشور', liveUrl: 'https://fares-awarik.github.io/furniture-mora/' },
    ],
    projectLabels: { problem: 'المشكلة / الهدف', built: 'ما بنيته', role: 'دوري', result: 'النتيجة / الحالة', stack: 'التقنيات' },
    projectLiveLabel: 'زيارة الموقع', projectGithubLabel: 'GitHub',
    trustLabel: 'آراء العملاء', trustTitle: 'ثقة مبنية على مشاريع حقيقية ونتائج عملية',
    trustDesc: 'آراء عملاء استخدموا المواقع والتطبيقات التي طورتها في أعمالهم ومشاريعهم.',
    testimonials: [
      { quote: 'ساهم الموقع بشكل كبير في تطوير عملي وزيادة عدد عملائي، وكان له أثر واضح في تعزيز حضوري المهني وثقة العملاء بخدماتي. كما كانت سرعة الاستجابة والدعم استثنائية طوال فترة العمل.', name: 'شركة المصطفى للاستشارات القانونية', role: '' },
      { quote: 'ساهم التطبيق الذي طوّره فارس في تسهيل سير العمل لي ولزملائي بشكل ملحوظ. التطبيق سهل الاستخدام وسريع وعملي، وعند حدوث أي مشكلة كان يقدم الحل والدعم بسرعة.', name: 'محمد بشير ضايع', role: 'مدير المشاريع — Efektpharma' },
      { quote: 'كنت راضيًا جدًا عن العمل، وخرج الموقع بصورة شاملة وجميلة. وبفضل التواصل المستمر طوال فترة التنفيذ، استطعنا مراجعة وتعديل الأجزاء المطلوبة معًا.', name: 'Prego Education', role: '' },
    ],
    trustPoints: ['مشاريع عملاء حقيقية','مستخدمة في عمليات العمل اليومية','العربية والتركية والإنجليزية','دعم بعد التسليم'],
    contactLabel: 'تواصل', contactTitle: 'لنعمل معاً',
    contactDesc: 'إذا كنت تحتاج موقع أعمال، لوحة تحكم، نظام حجز، أو حل ويب عملي، لا تتردد في التواصل.',
    contactLinkLabels: ['واتساب','البريد الإلكتروني','LinkedIn','GitHub','Instagram'],
    footer: '© 2026 فارس عواريك — مبني بـ React · منشور على GitHub Pages.',
    navItems: ['عنّي','الخدمات','المشاريع','تواصل'],
  },
  tr: {
    hello: 'Merhaba, ben Fares.', name: 'İşletmelerin daha akıllı çalışmasına yardımcı olan dijital araçlar geliştiriyorum.',
    heroDesc: 'Operasyonları kolaylaştıran, müşteri deneyimini iyileştiren ve büyümeyi destekleyen iş web siteleri ve özel Laravel sistemleri geliştiriyorum.',
    viewProjects: 'Projenizi Görüşelim', contactMe: 'Seçili Çalışmaları Gör',
    serviceTags: ['İş Web Siteleri','Yönetim Panelleri','Randevu','CRM','WhatsApp'],
    trustLine: 'Türkiye merkezli • Dünya çapında müsait • Arapça, İngilizce ve Türkçe',
    aboutLabel: 'HAKKIMDA', aboutTitle: 'Gerçek iş ihtiyaçları için pratik çözümler',
    aboutP1: "Ben Fares Awarik, Türkiye'de yaşayan bir Laravel geliştiricisiyim. Küçük ve büyüyen işletmeler için kurumsal web siteleri, yönetim panelleri, rezervasyon sistemleri ve özel web uygulamaları geliştiriyorum.",
    aboutP2: 'Eğitim, ilaç, hukuk, e-ticaret ve hizmet sektörlerine yönelik projeler üzerinde çalıştım. Net yapı, pratik iş akışları ve müşterilerin gerçekten kullanıp yönetebileceği çözümler geliştirmeye odaklanıyorum.',
    servicesLabel: 'NELER GELİŞTİRİYORUM', servicesTitle: 'Gerçek iş ihtiyaçlarına göre geliştirilen hizmetler',
    servicesDesc: 'Dijital görünürlüğünüzü güçlendiren, günlük operasyonları kolaylaştıran ve işletmenizin büyümesini destekleyen pratik web çözümleri.',
    serviceCards: [
      { title: 'Kurumsal Web Siteleri', desc: 'Güven oluşturan, hizmetlerinizi açık şekilde anlatan ve ziyaretçileri potansiyel müşterilere dönüştüren mobil uyumlu web siteleri.' },
      { title: 'Özel Laravel Sistemleri', desc: 'İşletmenizin çalışma şekline göre süreçleri, verileri, kullanıcıları ve günlük operasyonları düzenleyen özel web sistemleri.' },
      { title: 'Yönetim Panelleri', desc: 'İçerikleri, müşterileri, rezervasyonları, ürünleri ve şirket içi işlemleri yönetmek için pratik kontrol panelleri.' },
      { title: 'Rezervasyon ve Randevu Sistemleri', desc: 'Manuel mesajlaşmayı azaltan, müşteriler ve çalışanlar için randevu planlamayı kolaylaştıran çevrim içi sistemler.' },
      { title: 'WhatsApp Entegrasyonları', desc: "Web sitesi taleplerini, iletişim formlarını ve müşteri işlemlerini daha hızlı iletişim için doğrudan WhatsApp'a bağlayan çözümler." },
      { title: 'Web Sitesi Bakım ve Geliştirme', desc: 'Hata düzeltmeleri, mobil uyumluluk iyileştirmeleri, yayınlama desteği, yeni özellikler ve mevcut siteler için sürekli bakım.' },
    ],
    projectsLabel: 'SEÇİLMİŞ PROJELER', projectsTitle: 'Gerçek iş problemlerine göre geliştirilen projeler',
    projectsDesc: 'Eğitim, ilaç, hukuk ve yerel işletmeler için geliştirilen müşteri projeleri ve portföy konseptlerinden seçilmiş çalışmalar.',
    projects: [
      { title: 'Prego Education', subtitle: 'Müşteri Projesi · Laravel Platformu', description: 'Öğrencilerin İtalya’daki üniversiteleri ve eğitim fırsatlarını keşfetmesine yardımcı olan çok dilli bir eğitim platformu. Üniversiteleri, makaleleri ve site içeriğini yönetmek için bir yönetim paneli içerir.', tags: ['Laravel','PHP','Blade','MySQL','Bootstrap'], status: 'Yayında', liveUrl: 'https://eduprego.com/' },
      { title: 'Efektpharma App', subtitle: 'Müşteri Projesi · Flutter Uygulaması', description: 'İlaç firması satış temsilcilerinin internet bağlantısı olmadan düzenli ürün bilgilerine hızlı şekilde ulaşabilmesi için geliştirilen çevrim dışı mobil ürün kataloğu.', tags: ['Flutter','Dart','Offline App','Mobile UI'], status: 'Özel Kullanımda' },
      { title: 'Al-Mustafa Legal Consultancy', subtitle: 'Müşteri Projesi · Kurumsal Web Sitesi', description: 'Hizmetleri açık şekilde sunmak, güven oluşturmak ve potansiyel müşterilerin firmayla kolayca iletişim kurmasını sağlamak için tasarlanan profesyonel hukuk danışmanlığı sitesi.', tags: ['Laravel','PHP','Blade','Bootstrap'], status: 'Yayında', liveUrl: 'https://almostafa.company/' },
      { title: 'Gümüşhane Yayla Bal', subtitle: 'Müşteri Projesi · Ürün Web Sitesi', description: 'Yerel bir bal markasını profesyonel şekilde tanıtmak ve ziyaretçileri doğrudan iletişim ile satın alma taleplerine yönlendirmek için geliştirilen mobil uyumlu ürün sitesi.', tags: ['Responsive UI','Product Website','Local Business'], status: 'Müşteri Projesi' },
      { title: 'Furniture Mora', subtitle: 'Portföy Konsepti · Mobilya Web Sitesi', description: 'Oteller, restoranlar, evler ve ticari alanlar için tasarlanan; ürün odaklı bölümler ve doğrudan müşteri iletişim akışları içeren premium Arapça mobilya sitesi konsepti.', tags: ['Arabic UI','Product Website','Responsive UI'], status: 'Canlı Konsept', liveUrl: 'https://fares-awarik.github.io/furniture-mora/' },
    ],
    projectLabels: { problem: 'Problem / hedef', built: 'Ne geliştirdim', role: 'Rolüm', result: 'Sonuç / durum', stack: 'Teknoloji' },
    projectLiveLabel: 'Canlı Site', projectGithubLabel: 'GitHub',
    trustLabel: 'MÜŞTERİ YORUMLARI', trustTitle: 'Gerçek projeler ve pratik sonuçlarla oluşan güven',
    trustDesc: 'Geliştirdiğim web sitelerini ve uygulamaları işletmelerinde kullanan müşterilerin yorumları.',
    testimonials: [
      { quote: 'Web sitesi işimin gelişmesine ve müşteri sayımın artmasına önemli ölçüde katkı sağladı. Profesyonel görünürlüğümü ve müşterilerin hizmetlerime olan güvenini güçlendirdi. Fares süreç boyunca hızlı iletişim ve destek sağladı.', name: 'Al-Mustafa Legal Consultancy', role: '' },
      { quote: 'Geliştirdiği uygulama, hem benim hem de çalışma arkadaşlarımın iş süreçlerini önemli ölçüde kolaylaştırdı. Kullanımı kolay, hızlı ve pratiktir. Herhangi bir sorun yaşandığında da hızlı şekilde çözüm ve destek sağladı.', name: 'Mehmet Beşir Daye', role: 'Project Manager — Efektpharma' },
      { quote: 'Çalışmadan çok memnun kaldım. Site kapsamlı ve güzel oldu. Süreç boyunca sürekli iletişimde kaldığımız için gerekli bölümleri birlikte revize etme fırsatımız da oldu.', name: 'Prego Education', role: '' },
    ],
    trustPoints: ['Gerçek Müşteri Projeleri','Günlük İş Süreçlerinde Kullanım','Arapça, İngilizce ve Türkçe','Teslimat Sonrası Destek'],
    contactLabel: 'İletişim', contactTitle: 'Birlikte Çalışalım',
    contactDesc: 'Bir iş web sitesi, yönetim paneli, randevu sistemi veya pratik bir web çözümüne ihtiyacınız varsa, iletişime geçmekten çekinmeyin.',
    contactLinkLabels: ['WhatsApp','Email','LinkedIn','GitHub','Instagram'],
    footer: '© 2026 Fares Awarik — React ile geliştirildi · GitHub Pages üzerinde yayında.',
    navItems: ['Hakkımda','Hizmetler','Projeler','İletişim'],
  }
};

const LangContext = React.createContext('en');
function useT() { return T[React.useContext(LangContext)]; }

/* ─── Mouse tracker ─── */
function useMousePosition() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const h = (e) => setPos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', h, { passive: true });
    return () => window.removeEventListener('mousemove', h);
  }, []);
  return pos;
}

/* ─── Scroll reveal ─── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {}, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      ...style
    }} className={className}>{children}</div>
  );
}

/* ─── 3D Tilt Card ─── */
function TiltCard({ children, style = {}, className = '' }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('perspective(800px) rotateX(0) rotateY(0)');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const handleMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width, y = (e.clientY - rect.top) / rect.height;
    setTransform(`perspective(800px) rotateX(${(0.5-y)*12}deg) rotateY(${(x-0.5)*12}deg) scale3d(1.02,1.02,1.02)`);
    setGlare({ x: x*100, y: y*100, opacity: 0.12 });
  }, []);
  const handleLeave = useCallback(() => {
    setTransform('perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)');
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, []);
  return (
    <div ref={cardRef} onMouseMove={handleMove} onMouseLeave={handleLeave} className={className}
      style={{ transform, transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)', transformStyle: 'preserve-3d', position: 'relative', overflow: 'hidden', ...style }}>
      {children}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit',
        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`, transition: 'opacity 0.3s' }}></div>
    </div>
  );
}

/* ─── Floating Particles ─── */
function Particles({ count = 30 }) {
  const particles = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i, x: Math.random()*100, y: Math.random()*100, size: 2+Math.random()*3,
    dur: 15+Math.random()*25, delay: Math.random()*-20, opacity: 0.15+Math.random()*0.25
  })), [count]);
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
      {particles.map(p => (
        <div key={p.id} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: '50%',
          background: 'var(--accent)', opacity: p.opacity, animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite` }}></div>
      ))}
    </div>
  );
}

/* ─── 3D Wireframe Geometry ─── */
function WireframeShape({ mouse }) {
  const rx = (mouse.y - 0.5) * 30, ry = (mouse.x - 0.5) * 30;
  return (
    <div style={{ width: 320, height: 320, position: 'relative', transform: `rotateX(${rx}deg) rotateY(${ry}deg)`, transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}>
      {[{ rX:0,rY:0,tZ:100 },{ rX:0,rY:180,tZ:100 },{ rX:0,rY:90,tZ:100 },{ rX:0,rY:-90,tZ:100 },{ rX:90,rY:0,tZ:100 },{ rX:-90,rY:0,tZ:100 }].map((f,i) => (
        <div key={i} style={{ position:'absolute',width:200,height:200,left:60,top:60,border:'1px solid oklch(0.75 0.15 70 / 0.2)',borderRadius:4,
          transform:`rotateX(${f.rX}deg) rotateY(${f.rY}deg) translateZ(${f.tZ}px)`, transformStyle:'preserve-3d', backfaceVisibility:'visible' }}></div>
      ))}
      <div style={{ position:'absolute',width:80,height:80,left:120,top:120, animation:'spin-slow 20s linear infinite', transformStyle:'preserve-3d' }}>
        {[0,60,120,180,240,300].map((rot,i) => (
          <div key={i} style={{ position:'absolute',width:80,height:80,left:0,top:0, border:'1px solid var(--accent)', borderRadius:2, opacity:0.5,
            transform:`rotateY(${rot}deg) rotateX(45deg)`, transformStyle:'preserve-3d' }}></div>
        ))}
      </div>
      {[[-1,-1,-1],[1,-1,-1],[-1,1,-1],[1,1,-1],[-1,-1,1],[1,-1,1],[-1,1,1],[1,1,1]].map((c,i) => (
        <div key={`d${i}`} style={{ position:'absolute',width:6,height:6,borderRadius:'50%', background:'var(--accent)',
          left:157+c[0]*100, top:157+c[1]*100, transform:`translateZ(${c[2]*100}px)`, animation:`pulse-glow 3s ease-in-out ${i*0.3}s infinite` }}></div>
      ))}
    </div>
  );
}

/* ─── Lang Switcher ─── */
function LangSwitcher({ lang, setLang }) {
  const langs = ['en','ar','tr'];
  const labels = { en: 'EN', ar: 'ع', tr: 'TR' };
  return (
    <div style={{ display:'flex', gap:3, background:'var(--bg-elevated)', borderRadius:8, padding:3, border:'1px solid var(--border)' }}>
      {langs.map(l => (
        <button key={l} onClick={() => setLang(l)} style={{
          background: lang===l ? 'var(--accent)' : 'transparent', color: lang===l ? '#08080a' : 'var(--text-secondary)',
          border:'none', borderRadius:6, padding:'4px 10px', cursor:'pointer',
          fontFamily: l==='ar' ? 'var(--body)' : 'var(--mono)', fontSize:12, fontWeight:600, transition:'all 0.2s'
        }}>{labels[l]}</button>
      ))}
    </div>
  );
}

/* ─── NAV ─── */
function Nav({ lang, setLang }) {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const navIds = ['about','services','projects','contact'];
  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 40);
      for (let i = navIds.length-1; i >= 0; i--) {
        const el = document.getElementById(navIds[i]);
        if (el && el.getBoundingClientRect().top <= 200) { setActive(navIds[i]); break; }
      }
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav style={{ position:'fixed',top:0,left:0,right:0,zIndex:100,
      background: scrolled ? 'rgba(8,8,10,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px) saturate(1.5)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      transition:'all 0.4s cubic-bezier(0.16,1,0.3,1)', padding:'0 24px' }}>
      <div style={{ maxWidth:1120,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',height:64 }}>
        <a href="#hero" style={{ fontFamily:'var(--heading)',fontWeight:700,fontSize:18 }}>
          fares<span style={{ color:'var(--accent)' }}>.</span>awarik
        </a>
        <div style={{ display:'flex',gap:24,fontSize:14,fontWeight:500,fontFamily:'var(--body)',alignItems:'center' }}>
          {navIds.map((id,i) => (
            <a key={id} href={`#${id}`} style={{ color: active===id ? 'var(--accent)' : 'var(--text-secondary)', transition:'color 0.3s', position:'relative', padding:'4px 0' }}>
              {t.navItems[i]}
              {active===id && <span style={{ position:'absolute',bottom:-2,left:0,right:0,height:2,background:'var(--accent)',borderRadius:1, animation:'text-reveal 0.3s ease forwards' }}></span>}
            </a>
          ))}
          <LangSwitcher lang={lang} setLang={setLang} />
        </div>
      </div>
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  const mouse = useMousePosition();
  const t = useT();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const anim = (d) => ({ opacity: loaded?1:0, transform: loaded?'translateY(0)':`translateY(30px)`, transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s` });
  return (
    <section id="hero" style={{ minHeight:'100vh',display:'flex',alignItems:'center',paddingTop:80,overflow:'hidden' }}>
      <div className="container" style={{ display:'grid',gridTemplateColumns:'1fr auto',alignItems:'center',gap:40 }}>
        <div>
          <div style={anim(0.1)}>
            <p style={{ fontFamily:'var(--mono)',fontSize:14,color:'var(--accent)',marginBottom:20,letterSpacing:'0.06em' }}>
              <span style={{ display:'inline-block',width:32,height:1,background:'var(--accent)',verticalAlign:'middle',marginRight:12 }}></span>
              {t.hello}
            </p>
          </div>
          <div style={anim(0.2)}>
            <h1 style={{ maxWidth:700,fontFamily:'var(--heading)',fontSize:'clamp(40px,6.5vw,64px)',fontWeight:700,lineHeight:1.05,marginBottom:12,
              background:'linear-gradient(135deg, var(--text) 0%, var(--accent) 100%)',
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>{t.name}</h1>
          </div>
          <div style={anim(0.5)}>
            <p style={{ maxWidth:500,color:'var(--text)',opacity:0.82,fontSize:17,fontWeight:300,lineHeight:1.75,marginBottom:40 }}>{t.heroDesc}</p>
          </div>
          <div style={{ display:'flex',gap:16,flexWrap:'wrap',marginBottom:48,...anim(0.6) }}>
            <a href="#contact" className="hero-btn-primary" style={{
              background:'var(--accent)',color:'#08080a',padding:'14px 32px',borderRadius:10,fontWeight:600,fontSize:15,fontFamily:'var(--heading)',
              boxShadow:'0 0 30px var(--accent-glow), 0 4px 12px rgba(0,0,0,0.3)',transition:'all 0.3s ease',position:'relative',overflow:'hidden'
            }}>{t.viewProjects}</a>
            <a href="#projects" style={{ border:'1px solid var(--border)',color:'var(--text)',padding:'14px 32px',borderRadius:10,fontWeight:500,fontSize:15,
              fontFamily:'var(--heading)',transition:'all 0.3s ease',background:'rgba(255,255,255,0.02)' }}
              onMouseEnter={e=>{e.target.style.borderColor='var(--accent)';e.target.style.boxShadow='0 0 20px var(--accent-glow)'}}
              onMouseLeave={e=>{e.target.style.borderColor='var(--border)';e.target.style.boxShadow='none'}}
            >{t.contactMe}</a>
          </div>
          <div style={{ display:'flex',flexWrap:'wrap',gap:'8px 20px',fontFamily:'var(--mono)',fontSize:13,color:'var(--text)',opacity:0.82, ...anim(0.75) }}>
            {t.serviceTags.map((s,i) => (
              <span key={i} style={{ display:'flex',alignItems:'center',gap:8 }}>
                {i>0 && <span style={{ color:'var(--accent)',opacity:0.4 }}>•</span>}{s}
              </span>
            ))}
          </div>
          <div style={{ fontFamily:'var(--mono)',fontSize:13,color:'var(--text)',opacity:0.72,marginTop:12,...anim(0.8) }}>
            {t.trustLine}
          </div>
        </div>
        <div style={{ perspective:800,display:'flex',alignItems:'center',justifyContent:'center' }} className="hero-3d">
          <WireframeShape mouse={mouse} />
        </div>
      </div>
      <style>{`@media(max-width:900px){.hero-3d{display:none!important}}.hero-btn-primary:hover{transform:translateY(-2px);box-shadow:0 0 40px var(--accent-glow),0 8px 24px rgba(0,0,0,0.4)!important}`}</style>
    </section>
  );
}

/* ─── ABOUT ─── */
function About() {
  const t = useT();
  return (
    <section id="about" style={{ background:'linear-gradient(180deg, var(--bg-card) 0%, var(--bg) 100%)' }}>
      <div className="container">
        <Reveal><p className="section-label">{t.aboutLabel}</p></Reveal>
        <Reveal delay={80}><h2 className="section-title">{t.aboutTitle.split('\n').map((l,i)=><React.Fragment key={i}>{i>0&&<br/>}{l}</React.Fragment>)}</h2></Reveal>
        <Reveal delay={160}>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:32,marginTop:32 }}>
            <div style={{ padding:28,borderRadius:12,border:'1px solid var(--border)',background:'rgba(255,255,255,0.02)',backdropFilter:'blur(8px)' }}>
              <p style={{ color:'#aaa79d',fontSize:15,fontWeight:300,lineHeight:1.8 }}>{t.aboutP1}</p>
            </div>
            <div style={{ padding:28,borderRadius:12,border:'1px solid var(--border)',background:'rgba(255,255,255,0.02)',backdropFilter:'blur(8px)' }}>
              <p style={{ color:'#aaa79d',fontSize:15,fontWeight:300,lineHeight:1.8 }}>{t.aboutP2}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── SERVICES ─── */
function ServiceCard({ title, desc, index }) {
  return (
    <Reveal delay={index*80}>
      <TiltCard style={{ background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:16,padding:32,height:'100%',cursor:'default' }}>
        <div style={{ width:48,height:48,borderRadius:12,background:'linear-gradient(135deg, var(--accent-glow), transparent)',
          border:'1px solid oklch(0.75 0.15 70 / 0.2)',display:'flex',alignItems:'center',justifyContent:'center',
          marginBottom:20,fontFamily:'var(--mono)',fontSize:16,color:'var(--accent)',fontWeight:500 }}>
          {String(index+1).padStart(2,'0')}
        </div>
        <h3 style={{ fontFamily:'var(--heading)',fontWeight:600,fontSize:18,marginBottom:10 }}>{title}</h3>
        <p style={{ color:'#aaa79d',fontSize:14,fontWeight:300,lineHeight:1.7 }}>{desc}</p>
      </TiltCard>
    </Reveal>
  );
}

function Services() {
  const t = useT();
  return (
    <section id="services">
      <div className="container">
        <Reveal><p className="section-label">{t.servicesLabel}</p></Reveal>
        <Reveal delay={80}><h2 className="section-title">{t.servicesTitle}</h2></Reveal>
        <Reveal delay={120}><p style={{ color:'#aaa79d',maxWidth:560,fontSize:15,fontWeight:300,lineHeight:1.7,marginBottom:48 }}>{t.servicesDesc}</p></Reveal>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))',gap:20 }}>
          {t.serviceCards.map((s,i) => <ServiceCard key={i} {...s} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ─── */
function ProjectCard({ title, subtitle, description, tags, status, liveUrl, githubUrl, index }) {
  const t = useT();
  const labels = t.projectLabels || {};
  return (
    <Reveal delay={index*100} style={{ height:'100%' }} className="reveal-wrap">
      <TiltCard style={{ height:'100%',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden' }}>
        <div style={{ height:3,background:'linear-gradient(90deg,var(--accent),transparent)' }}></div>
        <div style={{ padding:'24px 28px 28px',height:'100%',display:'flex',flexDirection:'column',gap:12 }}>
          <span style={{ fontFamily:'var(--mono)',fontSize:11,color:'var(--accent)',opacity:0.6,letterSpacing:'0.1em' }}>// {String(index+1).padStart(2,'0')}</span>
          <h3 style={{ fontFamily:'var(--heading)',fontWeight:600,fontSize:18,lineHeight:1.3 }}>{title}</h3>
          {subtitle && <p style={{ color:'var(--accent)',fontFamily:'var(--mono)',fontSize:11,lineHeight:1.5 }}>{subtitle}</p>}
          <p style={{ color:'#aaa79d',fontSize:13,fontWeight:300,lineHeight:1.65,flex:1 }}>{description}</p>
          <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8 }}>
            <span style={{ fontFamily:'var(--mono)',fontSize:10,color:'var(--text-secondary)',textTransform:'uppercase',letterSpacing:'0.08em' }}>{labels.stack || 'Tech stack'}</span>
            <div style={{ display:'flex',flexWrap:'wrap',gap:8 }}>
              {tags.map(tag => (
                <span key={tag} style={{ fontFamily:'var(--mono)',fontSize:11,color:'var(--accent)',background:'var(--accent-glow)',
                  padding:'5px 12px',borderRadius:6,border:'1px solid oklch(0.75 0.15 70 / 0.1)',letterSpacing:'0.02em' }}>{tag}</span>
              ))}
            </div>
            {status && <span style={{ display:'inline-flex',flex:'0 1 auto',alignItems:'center',maxWidth:'100%',background:'var(--accent)',color:'#08080a',fontFamily:'var(--mono)',fontSize:10,fontWeight:600,
              padding:'4px 10px',borderRadius:6,whiteSpace:'normal',overflowWrap:'anywhere' }}>{status}</span>}
          </div>
          <div style={{ display:'flex',alignItems:'center',gap:8,flexWrap:'wrap' }}>
            {liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily:'var(--mono)',fontSize:11,fontWeight:500,color:'var(--accent)',
              border:'1px solid oklch(0.75 0.15 70 / 0.25)',padding:'5px 12px',borderRadius:6 }}>{t.projectLiveLabel}</a>}
            {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily:'var(--mono)',fontSize:11,fontWeight:500,color:'var(--accent)',
              border:'1px solid oklch(0.75 0.15 70 / 0.25)',padding:'5px 12px',borderRadius:6 }}>{t.projectGithubLabel}</a>}
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

function Projects() {
  const t = useT();
  return (
    <section id="projects" style={{ background:'linear-gradient(180deg, var(--bg-card) 0%, var(--bg) 100%)' }}>
      <div className="container">
        <Reveal><p className="section-label">{t.projectsLabel}</p></Reveal>
        <Reveal delay={80}><h2 className="section-title">{t.projectsTitle}</h2></Reveal>
        <Reveal delay={120}><p style={{ color:'var(--text-secondary)',maxWidth:560,fontSize:15,fontWeight:300,lineHeight:1.7,marginBottom:48 }}>{t.projectsDesc}</p></Reveal>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))',gap:24,alignItems:'stretch' }}>
          {t.projects.map((p,i) => <ProjectCard key={i} {...p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── TRUST & TESTIMONIALS ─── */
function TrustTestimonials() {
  const t = useT();
  return (
    <section id="trust">
      <div className="container">
        <Reveal><p className="section-label">{t.trustLabel}</p></Reveal>
        <Reveal delay={80}><h2 className="section-title">{t.trustTitle}</h2></Reveal>
        <Reveal delay={120}><p style={{ color:'#aaa79d',maxWidth:560,fontSize:15,fontWeight:300,lineHeight:1.7 }}>{t.trustDesc}</p></Reveal>
        <Reveal delay={160}>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:20,marginTop:36,alignItems:'stretch' }}>
            {t.testimonials.map((item,i) => (
              <Reveal key={item.name} delay={180+i*80} style={{ height:'100%' }}>
                <TiltCard style={{ height:'100%',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:12,padding:'24px 26px',display:'flex',flexDirection:'column',gap:18 }}>
                  <p style={{ color:'#aaa79d',fontSize:14,fontWeight:300,lineHeight:1.75,flex:1 }}>{item.quote}</p>
                  <div style={{ borderTop:'1px solid var(--border)',paddingTop:14 }}>
                    <p style={{ color:'var(--text)',fontSize:14,fontWeight:500 }}>{item.name}</p>
                    {item.role && <p style={{ color:'var(--text-secondary)',fontSize:12,fontWeight:300,lineHeight:1.5,marginTop:4 }}>{item.role}</p>}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Reveal>
        <Reveal delay={460}>
          <div style={{ display:'flex',flexWrap:'wrap',justifyContent:'center',gap:10,marginTop:28 }}>
            {t.trustPoints.map(point => <span key={point} style={{ fontFamily:'var(--mono)',fontSize:11,color:'var(--text-secondary)',border:'1px solid var(--border)',padding:'6px 12px',borderRadius:6 }}>{point}</span>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── CONTACT ─── */
const contactLinks = [
  { label:'WhatsApp', href:'https://wa.me/+905538604023', mono:'WA' },
  { label:'Email', href:'mailto:fares119.fh@gmail.com', mono:'✉' },
  { label:'LinkedIn', href:'https://www.linkedin.com/in/fares-awarik/?locale=en-US', mono:'in' },
  { label:'GitHub', href:'https://github.com/Fares-Awarik', mono:'GH' },
  { label:'Instagram', href:'https://www.instagram.com/fares.awarik/', mono:'IG' },
];

function Contact() {
  const t = useT();
  return (
    <section id="contact" style={{ background:'linear-gradient(180deg, var(--bg-card) 0%, var(--bg) 100%)' }}>
      <div className="container" style={{ textAlign:'center',maxWidth:640 }}>
        <Reveal><p className="section-label" style={{ justifyContent:'center' }}>{t.contactLabel}</p></Reveal>
        <Reveal delay={80}><h2 className="section-title" style={{ textAlign:'center' }}>{t.contactTitle}</h2></Reveal>
        <Reveal delay={160}><p style={{ color:'var(--text-secondary)',fontSize:15,fontWeight:300,lineHeight:1.8,marginBottom:44 }}>{t.contactDesc}</p></Reveal>
        <Reveal delay={240}>
          <div style={{ display:'flex',justifyContent:'center',gap:14,flexWrap:'wrap' }}>
            {contactLinks.map((l,i) => (
              <TiltCard key={l.label} style={{ background:'var(--bg-elevated)',border:'1px solid var(--border)',borderRadius:12,overflow:'hidden' }}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" style={{ display:'flex',alignItems:'center',gap:10,padding:'14px 24px',fontFamily:'var(--heading)',fontSize:14,fontWeight:500 }}>
                  <span style={{ fontFamily:'var(--mono)',fontSize:12,color:'var(--accent)',width:24,textAlign:'center' }}>{l.mono}</span>
                  {t.contactLinkLabels?.[i] || l.label}
                </a>
              </TiltCard>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  const t = useT();
  return (
    <footer style={{ padding:'40px 24px',borderTop:'1px solid var(--border)',textAlign:'center' }}>
      <p style={{ fontFamily:'var(--mono)',fontSize:12,color:'var(--text-secondary)' }}>{t.footer}</p>
    </footer>
  );
}

/* ─── APP ─── */
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const lang = tweaks.lang || 'en';
  const isRtl = lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [lang, isRtl]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', `oklch(0.75 0.15 ${tweaks.accentHue})`);
    document.documentElement.style.setProperty('--accent-dim', `oklch(0.55 0.10 ${tweaks.accentHue})`);
    document.documentElement.style.setProperty('--accent-glow', `oklch(0.75 0.15 ${tweaks.accentHue} / 0.15)`);
  }, [tweaks.accentHue]);

  return (
    <LangContext.Provider value={lang}>
      {tweaks.showParticles && <Particles count={25} />}
      <Nav lang={lang} setLang={v => setTweak('lang', v)} />
      <Hero />
      <About />
      <Services />
      <Projects />
      <TrustTestimonials />
      <Contact />
      <Footer />
      <TweaksPanel title="Tweaks">
        <TweakSection title="Theme">
          <TweakSlider label="Accent Hue" value={tweaks.accentHue} onChange={v => setTweak('accentHue', v)} min={0} max={360} step={1} />
          <TweakToggle label="Particles" value={tweaks.showParticles} onChange={v => setTweak('showParticles', v)} />
        </TweakSection>
        <TweakSection title="Language">
          <TweakRadio label="Language" value={lang} onChange={v => setTweak('lang', v)} options={['en','ar','tr']} />
        </TweakSection>
      </TweaksPanel>
    </LangContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
