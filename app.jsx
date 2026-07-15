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
    aboutLabel: 'About Me', aboutTitle: 'Building practical solutions\nfor real business needs',
    aboutP1: 'I am a Laravel developer focused on practical digital solutions: business websites, admin panels, REST APIs, booking systems, and simple web applications that are clear and easy to manage. I am currently learning React basics to improve my frontend work.',
    aboutP2: 'I care about structure, usability, and building projects that solve real business problems. Every part of the project should serve a clear purpose and be easy for the end user to understand.',
    servicesLabel: 'What I Build', servicesTitle: 'Services',
    servicesDesc: 'Laravel web solutions designed to work for your business from day one.',
    serviceCards: [
      { title: 'Business Websites', desc: 'Professional websites that present your business clearly and build trust with potential clients.' },
      { title: 'Web Applications', desc: 'Custom web apps tailored to your workflow — from internal tools to client-facing platforms.' },
      { title: 'Admin Panels', desc: 'Clean, intuitive dashboards to manage your content, users, and business operations.' },
      { title: 'Booking & Clinic Systems', desc: 'Appointment scheduling and patient management systems built for daily workflow.' },
      { title: 'WhatsApp-Based Solutions', desc: 'Integrations that connect your website to WhatsApp for direct customer communication.' },
      { title: 'Custom Business Systems', desc: 'Tailored systems designed around your specific business logic and processes.' },
    ],
    projectsLabel: 'Featured Projects', projectsTitle: 'Recent Work',
    projectsDesc: 'Case-study notes for selected real projects and portfolio work, focused on the goal, my role, status, and available links.',
    projects: [
      { title: 'PREGO Education', subtitle: 'Laravel platform / admin panel for education services', problem: 'Education services needed a clear public website and an admin-friendly way to manage service, university, and student journey content.', built: 'Laravel website/platform with structured public pages, database-backed content, and an admin panel for managing education service information.', role: 'Laravel development, Blade UI, MySQL structure, admin panel work, and responsive frontend implementation.', result: 'Live website. Source code remains private as a client project.', tags: ['Laravel','PHP','Blade','MySQL','Bootstrap'], status: 'Live', liveUrl: 'https://eduprego.com/', sourceLabel: 'Private client project' },
      { title: 'Efektpharma App', subtitle: 'Flutter offline product gallery app for pharma reps', problem: 'Pharma representatives needed a product gallery they could use during visits, including situations without a stable internet connection.', built: 'Offline-first Flutter app for browsing product information and visuals from local app data/assets.', role: 'Flutter app development, offline product browsing flow, and presentation-friendly mobile UI.', result: 'Built as an offline mobile app. No public live link is available.', tags: ['Flutter','Dart','Offline App','Mobile UI'], status: 'Built', sourceLabel: 'Private project' },
      { title: 'Al-Mustafa Law', subtitle: 'Business/legal consultancy website', problem: 'The business needed a simple website that explains services clearly and builds trust before a visitor makes contact.', built: 'Structured service website with professional content sections, responsive pages, and clear contact paths.', role: 'Website implementation, service-page structure, responsive UI, and deployment support.', result: 'Live website. Source code remains private as client/business work.', tags: ['Laravel','PHP','Blade','Bootstrap'], status: 'Live', liveUrl: 'https://almostafa.company/', sourceLabel: 'Private client project' },
      { title: 'OliveCap Studio', subtitle: 'Team / brand website', problem: 'A small team/brand website needed a clear structure for identity, services, work, and contact information.', built: 'Brand website structure with sections that can support services, team details, work samples, and future screenshots/assets.', role: 'Frontend structure, content layout, responsive implementation, and project presentation.', result: 'In progress. Final live link and brand assets still need to be added.', tags: ['JavaScript','React basics','Responsive UI','Brand Website'], status: 'In Progress' },
      { title: 'Teknobox', subtitle: 'Shopify portfolio / ecommerce project', problem: 'A portfolio ecommerce project was needed to show Shopify-style product presentation without presenting it as a client result.', built: 'Ecommerce storefront concept with product/category presentation and commerce-style page structure.', role: 'Portfolio project setup, storefront structure, product presentation, and theme/customization practice.', result: 'Portfolio project. Live or GitHub link can be added when ready.', tags: ['Shopify','Ecommerce','Theme Customization','Portfolio Project'], status: 'Portfolio Project', sourceLabel: 'Portfolio project' },
    ],
    projectLabels: { problem: 'Problem / goal', built: 'What I built', role: 'My role', result: 'Result / status', stack: 'Tech stack' },
    projectLiveLabel: 'Live Site', projectGithubLabel: 'GitHub',
    stackLabel: 'Tech Stack', stackTitle: 'Tools I Work With',
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
    aboutLabel: 'عنّي', aboutTitle: 'بناء حلول عملية\nلاحتياجات الأعمال الحقيقية',
    aboutP1: 'أنا مطوّر Laravel أركّز على حلول رقمية عملية: مواقع أعمال، لوحات تحكم، واجهات REST API، أنظمة حجز، وتطبيقات ويب بسيطة وواضحة وسهلة الإدارة. أتعلم حالياً أساسيات React لتحسين عملي في الواجهات.',
    aboutP2: 'أهتم بالهيكلة وسهولة الاستخدام وبناء مشاريع تحل مشاكل أعمال حقيقية. كل جزء من المشروع يجب أن يخدم هدفاً واضحاً وأن يكون مفهوماً للمستخدم النهائي.',
    servicesLabel: 'ما أبنيه', servicesTitle: 'الخدمات',
    servicesDesc: 'حلول ويب عملية باستخدام Laravel، مصممة لتعمل لصالح عملك من اليوم الأول.',
    serviceCards: [
      { title: 'مواقع الأعمال', desc: 'مواقع احترافية تعرض عملك بوضوح وتبني الثقة مع العملاء المحتملين.' },
      { title: 'تطبيقات الويب', desc: 'تطبيقات ويب مخصصة لسير عملك — من الأدوات الداخلية إلى المنصات الموجهة للعملاء.' },
      { title: 'لوحات التحكم', desc: 'لوحات تحكم نظيفة وبديهية لإدارة المحتوى والمستخدمين وعمليات الأعمال.' },
      { title: 'أنظمة الحجز والعيادات', desc: 'أنظمة جدولة المواعيد وإدارة المرضى مبنية لسير العمل اليومي.' },
      { title: 'حلول واتساب', desc: 'تكاملات تربط موقعك بواتساب للتواصل المباشر مع العملاء.' },
      { title: 'أنظمة أعمال مخصصة', desc: 'أنظمة مصممة حول منطق وعمليات عملك المحددة.' },
    ],
    projectsLabel: 'مشاريع مميزة', projectsTitle: 'أعمال حديثة',
    projectsDesc: 'ملاحظات مختصرة عن مشاريع حقيقية وأعمال بورتفوليو، مع الهدف، دوري، الحالة، والروابط المتاحة.',
    projects: [
      { title: 'PREGO Education', subtitle: 'منصة Laravel ولوحة تحكم لخدمات التعليم', problem: 'كانت خدمات التعليم تحتاج موقعاً واضحاً وطريقة سهلة لإدارة محتوى الخدمات والجامعات ورحلة الطالب من لوحة تحكم.', built: 'موقع/منصة Laravel بصفحات منظمة، محتوى مرتبط بقاعدة البيانات، ولوحة تحكم لإدارة معلومات خدمات التعليم.', role: 'تطوير Laravel، واجهات Blade، هيكلة MySQL، العمل على لوحة التحكم، وتنفيذ واجهة متجاوبة.', result: 'الموقع منشور. الكود خاص لأنه مشروع عميل.', tags: ['Laravel','PHP','Blade','MySQL','Bootstrap'], status: 'منشور', liveUrl: 'https://eduprego.com/', sourceLabel: 'مشروع عميل خاص' },
      { title: 'Efektpharma App', subtitle: 'تطبيق Flutter كمعرض منتجات يعمل دون إنترنت لمندوبي الأدوية', problem: 'كان مندوبو الأدوية بحاجة إلى معرض منتجات يمكن استخدامه أثناء الزيارات، حتى عند عدم توفر اتصال إنترنت مستقر.', built: 'تطبيق Flutter يعمل دون إنترنت لتصفح معلومات وصور المنتجات من بيانات وملفات محلية داخل التطبيق.', role: 'تطوير تطبيق Flutter، بناء تجربة تصفح دون إنترنت، وتصميم واجهة مناسبة للعرض أثناء الزيارات.', result: 'تطبيق موبايل يعمل دون إنترنت. لا يوجد رابط عام متاح حالياً.', tags: ['Flutter','Dart','Offline App','Mobile UI'], status: 'منجز', sourceLabel: 'مشروع خاص' },
      { title: 'Al-Mustafa Law', subtitle: 'موقع أعمال / استشارات قانونية', problem: 'كان العمل يحتاج موقعاً بسيطاً يشرح الخدمات بوضوح ويبني الثقة قبل أن يتواصل الزائر.', built: 'موقع خدمات منظم بأقسام محتوى احترافية وصفحات متجاوبة ومسارات تواصل واضحة.', role: 'تنفيذ الموقع، تنظيم صفحات الخدمات، الواجهة المتجاوبة، ودعم النشر.', result: 'الموقع منشور. الكود خاص لأنه مشروع عميل/عمل.', tags: ['Laravel','PHP','Blade','Bootstrap'], status: 'منشور', liveUrl: 'https://almostafa.company/', sourceLabel: 'مشروع عميل خاص' },
      { title: 'OliveCap Studio', subtitle: 'موقع فريق / علامة تجارية', problem: 'كان موقع الفريق/العلامة يحتاج هيكلة واضحة للهوية والخدمات والأعمال وبيانات التواصل.', built: 'هيكل موقع علامة تجارية بأقسام يمكن أن تدعم الخدمات، تفاصيل الفريق، نماذج الأعمال، والصور مستقبلاً.', role: 'هيكلة الواجهة، ترتيب المحتوى، التنفيذ المتجاوب، وطريقة عرض المشروع.', result: 'قيد التطوير. ما زال يحتاج رابطاً نهائياً ومواد العلامة.', tags: ['JavaScript','React basics','Responsive UI','Brand Website'], status: 'قيد التطوير' },
      { title: 'Teknobox', subtitle: 'مشروع بورتفوليو Shopify / تجارة إلكترونية', problem: 'كان الهدف إنشاء مشروع بورتفوليو يعرض أسلوب صفحات Shopify والمنتجات بدون تقديمه كنتيجة لعميل حقيقي.', built: 'تصور متجر إلكتروني مع عرض للمنتجات والتصنيفات وهيكلة صفحات بأسلوب التجارة الإلكترونية.', role: 'إعداد مشروع بورتفوليو، هيكلة المتجر، عرض المنتجات، والتدرب على التخصيص.', result: 'مشروع بورتفوليو. يمكن إضافة رابط مباشر أو GitHub عند الجاهزية.', tags: ['Shopify','Ecommerce','Theme Customization','Portfolio Project'], status: 'مشروع بورتفوليو', sourceLabel: 'مشروع بورتفوليو' },
    ],
    projectLabels: { problem: 'المشكلة / الهدف', built: 'ما بنيته', role: 'دوري', result: 'النتيجة / الحالة', stack: 'التقنيات' },
    projectLiveLabel: 'زيارة الموقع', projectGithubLabel: 'GitHub',
    stackLabel: 'الأدوات', stackTitle: 'الأدوات التي أستخدمها',
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
    aboutLabel: 'Hakkımda', aboutTitle: 'Gerçek iş ihtiyaçları için\npratik çözümler geliştiriyorum',
    aboutP1: "Pratik dijital çözümlere odaklanan bir Laravel geliştiricisiyim: iş web siteleri, yönetim panelleri, REST API'ler, randevu sistemleri ve yönetimi kolay web uygulamaları geliştiriyorum. Frontend tarafımı güçlendirmek için React temellerini öğreniyorum.",
    aboutP2: 'Yapı, kullanılabilirlik ve gerçek iş problemlerini çözen projeler benim için önemlidir. Projenin her parçası net bir amaca hizmet etmeli ve son kullanıcı için anlaşılır olmalıdır.',
    servicesLabel: 'Ne Geliştiriyorum', servicesTitle: 'Hizmetler',
    servicesDesc: 'İlk günden işletmeniz için çalışmak üzere tasarlanmış Laravel odaklı web çözümleri.',
    serviceCards: [
      { title: 'İş Web Siteleri', desc: 'İşletmenizi net bir şekilde sunan ve potansiyel müşterilerle güven inşa eden profesyonel web siteleri.' },
      { title: 'Web Uygulamaları', desc: 'İş akışınıza özel web uygulamaları — dahili araçlardan müşteri odaklı platformlara.' },
      { title: 'Yönetim Panelleri', desc: 'İçerik, kullanıcı ve iş operasyonlarını yönetmek için temiz, sezgisel paneller.' },
      { title: 'Randevu ve Klinik Sistemleri', desc: 'Günlük iş akışı için tasarlanmış randevu planlama ve hasta yönetim sistemleri.' },
      { title: 'WhatsApp Tabanlı Çözümler', desc: "Web sitenizi doğrudan müşteri iletişimi için WhatsApp'a bağlayan entegrasyonlar." },
      { title: 'Özel İş Sistemleri', desc: 'Belirli iş mantığınız ve süreçlerinize göre tasarlanmış özel sistemler.' },
    ],
    projectsLabel: 'Öne Çıkan Projeler', projectsTitle: 'Son Çalışmalar',
    projectsDesc: 'Gerçek projeler ve portfolyo işleri için hedef, rolüm, durum ve mevcut bağlantıları gösteren kısa case-study notları.',
    projects: [
      { title: 'PREGO Education', subtitle: 'Eğitim hizmetleri için Laravel platform / yönetim paneli', problem: 'Eğitim hizmetlerinin net bir web sitesine ve hizmet, üniversite, öğrenci süreci içeriklerini yönetebilecek pratik bir panele ihtiyacı vardı.', built: 'Yapılandırılmış sayfalar, veritabanı destekli içerik ve eğitim hizmeti bilgilerini yönetmek için admin paneli olan Laravel platformu.', role: 'Laravel geliştirme, Blade arayüz, MySQL yapılandırması, admin panel çalışması ve responsive frontend uygulaması.', result: 'Web sitesi yayında. Kod müşteri projesi olduğu için özel kalıyor.', tags: ['Laravel','PHP','Blade','MySQL','Bootstrap'], status: 'Yayında', liveUrl: 'https://eduprego.com/', sourceLabel: 'Özel müşteri projesi' },
      { title: 'Efektpharma App', subtitle: 'İlaç temsilcileri için offline Flutter ürün galerisi', problem: 'İlaç temsilcilerinin ziyaretlerde, internet bağlantısı zayıf olduğunda bile kullanabileceği bir ürün galerisine ihtiyacı vardı.', built: 'Ürün bilgilerini ve görsellerini yerel uygulama verilerinden gösteren offline-first Flutter uygulaması.', role: 'Flutter uygulama geliştirme, offline ürün gezinme akışı ve sunuma uygun mobil arayüz.', result: 'Offline mobil uygulama olarak geliştirildi. Herkese açık canlı link yok.', tags: ['Flutter','Dart','Offline App','Mobile UI'], status: 'Geliştirildi', sourceLabel: 'Özel proje' },
      { title: 'Al-Mustafa Law', subtitle: 'İş / hukuk danışmanlığı web sitesi', problem: 'İşletmenin hizmetleri net anlatan ve ziyaretçi iletişime geçmeden önce güven oluşturan sade bir web sitesine ihtiyacı vardı.', built: 'Profesyonel içerik bölümleri, responsive sayfalar ve net iletişim yolları olan yapılandırılmış hizmet sitesi.', role: 'Web sitesi uygulaması, hizmet sayfası yapısı, responsive UI ve yayınlama desteği.', result: 'Web sitesi yayında. Kod müşteri/iş projesi olduğu için özel kalıyor.', tags: ['Laravel','PHP','Blade','Bootstrap'], status: 'Yayında', liveUrl: 'https://almostafa.company/', sourceLabel: 'Özel müşteri projesi' },
      { title: 'OliveCap Studio', subtitle: 'Takım / marka web sitesi', problem: 'Takım/marka sitesinin kimlik, hizmetler, işler ve iletişim bilgileri için net bir yapıya ihtiyacı vardı.', built: 'Hizmetleri, ekip detaylarını, iş örneklerini ve ileride eklenecek görselleri destekleyebilecek marka sitesi yapısı.', role: 'Frontend yapısı, içerik yerleşimi, responsive uygulama ve proje sunumu.', result: 'Devam ediyor. Final canlı link ve marka görselleri eklenmeli.', tags: ['JavaScript','React basics','Responsive UI','Brand Website'], status: 'Devam Ediyor' },
      { title: 'Teknobox', subtitle: 'Shopify portfolyo / ecommerce projesi', problem: 'Müşteri sonucu gibi göstermeden Shopify tarzı ürün sunumu gösterecek dürüst bir portfolyo ecommerce projesi gerekiyordu.', built: 'Ürün/kategori sunumu ve ecommerce sayfa yapısı olan mağaza konsepti.', role: 'Portfolyo projesi kurulumu, mağaza yapısı, ürün sunumu ve tema/özelleştirme pratiği.', result: 'Portfolyo projesi. Hazır olduğunda canlı veya GitHub linki eklenebilir.', tags: ['Shopify','Ecommerce','Theme Customization','Portfolio Project'], status: 'Portfolyo Projesi', sourceLabel: 'Portfolyo projesi' },
    ],
    projectLabels: { problem: 'Problem / hedef', built: 'Ne geliştirdim', role: 'Rolüm', result: 'Sonuç / durum', stack: 'Teknoloji' },
    projectLiveLabel: 'Canlı Site', projectGithubLabel: 'GitHub',
    stackLabel: 'Teknoloji', stackTitle: 'Kullandığım Araçlar',
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
              <p style={{ color:'var(--text-secondary)',fontSize:15,fontWeight:300,lineHeight:1.8 }}>{t.aboutP1}</p>
            </div>
            <div style={{ padding:28,borderRadius:12,border:'1px solid var(--border)',background:'rgba(255,255,255,0.02)',backdropFilter:'blur(8px)' }}>
              <p style={{ color:'var(--text-secondary)',fontSize:15,fontWeight:300,lineHeight:1.8 }}>{t.aboutP2}</p>
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
        <p style={{ color:'var(--text-secondary)',fontSize:14,fontWeight:300,lineHeight:1.7 }}>{desc}</p>
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
        <Reveal delay={120}><p style={{ color:'var(--text-secondary)',maxWidth:560,fontSize:15,fontWeight:300,lineHeight:1.7,marginBottom:48 }}>{t.servicesDesc}</p></Reveal>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))',gap:20 }}>
          {t.serviceCards.map((s,i) => <ServiceCard key={i} {...s} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ─── */
function ProjectCard({ title, subtitle, problem, built, role, result, tags, status, liveUrl, githubUrl, sourceLabel, index }) {
  const t = useT();
  const labels = t.projectLabels || {};
  const details = [
    [labels.problem || 'Problem / goal', problem],
    [labels.built || 'What I built', built],
    [labels.role || 'My role', role],
    [labels.result || 'Result / status', result],
  ].filter(([, value]) => value);
  return (
    <Reveal delay={index*100} style={{ height:'100%' }} className="reveal-wrap">
      <TiltCard style={{ height:'100%',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden' }}>
        <div style={{ height:3,background:'linear-gradient(90deg,var(--accent),transparent)' }}></div>
        <div style={{ padding:'24px 28px 28px',height:'100%',display:'flex',flexDirection:'column',gap:12 }}>
          <span style={{ fontFamily:'var(--mono)',fontSize:11,color:'var(--accent)',opacity:0.6,letterSpacing:'0.1em' }}>// {String(index+1).padStart(2,'0')}</span>
          <h3 style={{ fontFamily:'var(--heading)',fontWeight:600,fontSize:18,lineHeight:1.3 }}>{title}</h3>
          {subtitle && <p style={{ color:'var(--accent)',fontFamily:'var(--mono)',fontSize:11,lineHeight:1.5 }}>{subtitle}</p>}
          <div style={{ display:'grid',gap:10,flex:1 }}>
            {details.map(([label, value]) => (
              <div key={label} style={{ display:'grid',gap:4 }}>
                <span style={{ fontFamily:'var(--mono)',fontSize:10,color:'var(--text-secondary)',textTransform:'uppercase',letterSpacing:'0.08em' }}>{label}</span>
                <p style={{ color:'var(--text-secondary)',fontSize:13,fontWeight:300,lineHeight:1.65 }}>{value}</p>
              </div>
            ))}
          </div>
          <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8 }}>
            <span style={{ fontFamily:'var(--mono)',fontSize:10,color:'var(--text-secondary)',textTransform:'uppercase',letterSpacing:'0.08em' }}>{labels.stack || 'Tech stack'}</span>
            <div style={{ display:'flex',flexWrap:'wrap',gap:8 }}>
              {tags.map(tag => (
                <span key={tag} style={{ fontFamily:'var(--mono)',fontSize:11,color:'var(--accent)',background:'var(--accent-glow)',
                  padding:'5px 12px',borderRadius:6,border:'1px solid oklch(0.75 0.15 70 / 0.1)',letterSpacing:'0.02em' }}>{tag}</span>
              ))}
            </div>
            {status && <span style={{ background:'var(--accent)',color:'#08080a',fontFamily:'var(--mono)',fontSize:10,fontWeight:600,
              padding:'4px 10px',borderRadius:6,whiteSpace:'nowrap' }}>{status}</span>}
          </div>
          <div style={{ display:'flex',alignItems:'center',gap:8,flexWrap:'wrap' }}>
            {liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily:'var(--mono)',fontSize:11,fontWeight:500,color:'var(--accent)',
              border:'1px solid oklch(0.75 0.15 70 / 0.25)',padding:'5px 12px',borderRadius:6 }}>{t.projectLiveLabel}</a>}
            {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily:'var(--mono)',fontSize:11,fontWeight:500,color:'var(--accent)',
              border:'1px solid oklch(0.75 0.15 70 / 0.25)',padding:'5px 12px',borderRadius:6 }}>{t.projectGithubLabel}</a>}
            {sourceLabel && <span style={{ fontFamily:'var(--mono)',fontSize:10,color:'var(--text-secondary)',border:'1px dashed var(--border)',
              padding:'5px 10px',borderRadius:6 }}>{sourceLabel}</span>}
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

/* ─── TECH STACK ─── */
const techStack = ['Laravel','PHP','MySQL','Blade','Bootstrap','JavaScript','Git','GitHub','React basics / Learning React'];

function TechStack() {
  const t = useT();
  return (
    <section id="stack">
      <div className="container">
        <Reveal><p className="section-label">{t.stackLabel}</p></Reveal>
        <Reveal delay={80}><h2 className="section-title">{t.stackTitle}</h2></Reveal>
        <Reveal delay={160}>
          <div style={{ display:'flex',flexWrap:'wrap',gap:14,marginTop:36 }}>
            {techStack.map((tech,i) => (
              <Reveal key={tech} delay={200+i*60}>
                <TiltCard style={{ fontFamily:'var(--mono)',fontSize:14,fontWeight:500,color:'var(--text)',background:'var(--bg-card)',
                  border:'1px solid var(--border)',padding:'12px 24px',borderRadius:10,cursor:'default',display:'inline-flex',alignItems:'center',gap:10 }}>
                  <span style={{ width:6,height:6,borderRadius:'50%',background:'var(--accent)',opacity:0.6 }}></span>
                  {tech}
                </TiltCard>
              </Reveal>
            ))}
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
      <TechStack />
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
