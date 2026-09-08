import { useEffect, useState, type ReactNode } from 'react';

interface HomeProps { onNavigate: (path: string) => void; }

const logo = '/manus-storage/averyn-logo-blue-transparent-v2_5703a112.png';

export default function Home({ onNavigate }: HomeProps) {
  const goLogin = () => onNavigate('/login');
  const [headerVisible, setHeaderVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const revealFromTop = (event: MouseEvent) => {
      setHeaderVisible(event.clientY <= 96);
    };
    window.addEventListener('mousemove', revealFromTop);
    const updateBackToTop = () => setShowBackToTop(window.scrollY > 520);
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.av-reveal').forEach((element) => revealObserver.observe(element));
    return () => {
      window.removeEventListener('mousemove', revealFromTop);
      window.removeEventListener('scroll', updateBackToTop);
      revealObserver.disconnect();
    };
  }, []);

  const backToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div>
      <div className={`av-header-peek ${headerVisible ? 'is-visible' : ''}`} onMouseEnter={() => setHeaderVisible(true)} onMouseLeave={() => setHeaderVisible(false)}>
      <nav className="navbar navbar-expand-lg av-navbar py-3">
        <div className="container">
          <a className="navbar-brand" href="#inicio" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><img className="av-logo" src={logo} alt="Averyn" /></a>
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-label="Abrir navegación"><i className="bi bi-list fs-4" /></button>
          <div className="collapse navbar-collapse" id="mainNav">
            <div className="navbar-nav ms-auto align-items-lg-center gap-lg-4 gap-2 mt-3 mt-lg-0">
              <a className="av-nav-link" href="#capacidades">Capacidades</a>
              
              <a className="av-nav-link" href="#proceso">Cómo funciona</a>
              <button className="btn av-btn-primary ms-lg-2" onClick={goLogin}>Iniciar sesión <i className="bi bi-arrow-right ms-1" /></button>
            </div>
          </div>
        </div>
      </nav>
      </div>

      <main>
        <section id="inicio" className="av-hero av-hero-liquid">
          <img className="av-hero-logo-mark" src="/manus-storage/averyn-logo-black-transparent_f58ca034.png" alt="Averyn" />
          <div className="av-ballot-image" role="img" aria-label="Persona depositando una papeleta en una urna electoral" />
          <div className="av-liquid-copy">
            <h1 className="av-hero-item av-hero-item-1 av-display mb-3">Cada elección merece <em>claridad y control.</em></h1>
            <p className="av-hero-item av-hero-item-2 av-lead mb-4 mx-auto">Averyn integra biometría, OCR y gestión electoral en una plataforma diseñada para operar procesos seguros, automatizados y trazables.</p>
            <button className="av-hero-item av-hero-item-3 btn av-btn-primary btn-lg" onClick={goLogin}>Empezar <i className="bi bi-arrow-right ms-2" /></button>
          </div>
        </section>

        <section id="capacidades" className="av-section av-reveal">
          <div className="container"><div className="row mb-5 align-items-end"><div className="col-lg-7"><h2 className="av-section-title mb-3">Diseñada para operar con claridad.</h2></div><div className="col-lg-4 ms-auto"><p className="av-muted mb-0">Desde el pre-registro y la validación documental hasta la verificación del votante, el tarjetón y la consolidación de resultados, Averyn mantiene cada operación conectada y bajo control.</p></div></div>
            <div className="row g-4"><Feature icon={<i className="bi bi-layers fs-4" />} title="Gestión completa" text="Administra convocatorias, participantes, jornadas, mesas y resultados desde una experiencia unificada." /><Feature icon={<i className="bi bi-diagram-3 fs-4" />} title="Automatización" text="Convierte tareas repetitivas en flujos claros, con estados y alertas para cada equipo." /><Feature icon={<i className="bi bi-diagram-2 fs-4" />} title="Arquitectura conectada" text="Integra módulos y fuentes de información para que tu operación crezca sin perder contexto." /></div>
          </div>
        </section>

        <section id="proceso" className="av-section av-section-soft av-reveal"><div className="container"><div className="row mb-5"><div className="col-lg-7"><h2 className="av-section-title mb-3">De la planeación al resultado.</h2></div></div><div className="row g-4"><Step n="01" icon={<i className="bi bi-clipboard-check fs-4" />} title="Planifica" text="Define el alcance, reglas, equipos y calendario de cada elección." /><Step n="02" icon={<i className="bi bi-fingerprint fs-4" />} title="Verifica" text="Protege la participación con procesos de validación consistentes." /><Step n="03" icon={<i className="bi bi-database fs-4" />} title="Consolida" text="Centraliza la información y obtén una lectura confiable de los resultados." /></div></div></section>

        <div className="av-section-divider" aria-hidden="true"><span><i className="bi bi-arrow-down" /></span></div>

        <section id="arquitectura" className="av-section av-section-soft av-reveal"><div className="container"><div className="row mb-5 align-items-end"><div className="col-lg-7"><h2 className="av-section-title mb-3">Una arquitectura pensada para elecciones reales.</h2></div><div className="col-lg-4 ms-auto"><p className="av-muted mb-0">El sistema separa responsabilidades en servicios especializados para facilitar la integración, el mantenimiento y el crecimiento de la plataforma.</p></div></div><div className="row g-4 mb-5"><Tech title="Identidad y biometría" icon="bi-fingerprint" text="Enrolamiento y verificación mediante huella dactilar, con templates protegidos y control de integridad." /><Tech title="OCR documental" icon="bi-file-earmark-text" text="Procesamiento de documentos colombianos para extraer y validar los datos del votante antes de registrarlos." /><Tech title="Servicios desacoplados" icon="bi-diagram-3" text="Microservicios comunicados mediante HTTP/REST para que cada capacidad evolucione de forma independiente." /><Tech title="Persistencia transaccional" icon="bi-database" text="Oracle XE centraliza la información electoral, los estados de participación y el registro de operaciones." /></div><div className="av-tech-flow p-4 p-lg-5"><div className="row align-items-center g-3 text-center"><Flow label="Interfaz web" icon="bi-window" /><div className="col-auto text-primary"><i className="bi bi-arrow-right fs-4" /></div><Flow label="Java / Javalin" icon="bi-cpu" /><div className="col-auto text-primary"><i className="bi bi-arrow-right fs-4" /></div><Flow label="FastAPI · Bio · OCR" icon="bi-braces" /><div className="col-auto text-primary"><i className="bi bi-arrow-right fs-4" /></div><Flow label="Oracle XE" icon="bi-database-check" /></div><p className="text-center av-muted small mt-4 mb-0">Flujo de integración de alto nivel de Averyn</p></div></div></section>

        <section id="equipo" className="av-section"><div className="container"><div className="row mb-5"><div className="col-lg-7"><h2 className="av-section-title mb-3">Construido desde la ingeniería y la investigación.</h2><p className="av-muted mb-0">Averyn nace como una propuesta académica para modernizar los procesos electorales institucionales mediante software, biometría y arquitecturas distribuidas.</p></div></div><div className="row g-3"><Author name="Jorge Ivan Herrera Garcia" role="Integrante" github="https://github.com/ing-jorgehg" bio="Ingeniería de software, frontend y arquitectura de experiencias digitales." /><Author name="Daniel David Turizo Chacon" role="Integrante" github="https://github.com/ddturizo-eng" bio="Desarrollo de soluciones web y coordinación técnica del proyecto Averyn." /><Author name="Jose Antonio Chinchia Gutierrez" role="Integrante" github="https://github.com/JoseCh777" bio="Construcción de interfaces y componentes para procesos electorales claros." /><Author name="Mateo Calderon Araujo" role="Integrante" github="https://github.com/mcalderona" bio="Desarrollo de software y exploración de tecnologías para la plataforma." /></div></div></section>

<section className="av-section av-section-soft"><div className="container text-center"><h2 className="av-section-title mb-3">Tu próxima elección merece una mejor arquitectura.</h2><p className="av-muted mx-auto mb-4" style={{ maxWidth: 570 }}>Explora la plataforma y descubre una forma más clara de gestionar cada etapa del proceso electoral.</p><button className="btn av-btn-primary btn-lg" onClick={goLogin}>Ingresar a Averyn <i className="bi bi-arrow-right ms-2" /></button></div></section>
      </main>

      <footer className="av-footer py-5"><div className="container"><div className="row g-4"><div className="col-lg-5"><img className="av-footer-logo" src="/manus-storage/averyn-logo-white-transparent_cc92c218.png" alt="Averyn" /><p className="small mt-3 mb-0">Gestión electoral segura, automatizada y trazable.</p></div><div className="col-sm-6 col-lg-3"><div className="av-footer-label mb-3">Proyecto</div><a className="av-footer-repo" href="https://github.com/ddturizo-eng/averyn" target="_blank" rel="noreferrer"><i className="bi bi-github me-2" />Repositorio de Averyn <i className="bi bi-arrow-up-right ms-1" /></a><button className="btn btn-link p-0 mt-3 text-white text-decoration-none d-block" onClick={goLogin}>Iniciar sesión</button></div><div className="col-sm-6 col-lg-4"><div className="av-footer-label mb-3">Contacto Averyn</div><p className="small mb-3">Espacio reservado para el correo y los canales oficiales del proyecto.</p><a className="av-contact-placeholder" href="#contacto"><i className="bi bi-envelope me-2" />Próximamente</a></div></div><div className="av-footer-bottom mt-5 pt-4 small">© 2026 Averyn. Todos los derechos reservados.</div></div></footer>
      <button className={`av-back-to-top ${showBackToTop ? 'is-visible' : ''}`} onClick={backToTop} aria-label="Volver arriba" aria-hidden={!showBackToTop} tabIndex={showBackToTop ? 0 : -1}><i className="bi bi-arrow-up" /></button>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) { return <div className="col-md-4"><div className="av-feature-card"><div className="av-feature-icon mb-4">{icon}</div><h3 className="h4 mb-3">{title}</h3><p className="av-muted mb-0">{text}</p></div></div>; }
function Step({ n, icon, title, text }: { n: string; icon: ReactNode; title: string; text: string }) { return <div className="col-md-4"><div className="d-flex gap-3"><div className="av-step-num">{n}</div><div><div className="text-primary mb-3">{icon}</div><h3 className="h4">{title}</h3><p className="av-muted mb-0">{text}</p></div></div></div>; }

function Tech({ icon, title, text }: { icon: string; title: string; text: string }) { return <div className="col-md-6 col-xl-3"><div className="av-tech-card"><div className="av-feature-icon mb-3"><i className={`bi ${icon}`} /></div><h3 className="h5 mb-2">{title}</h3><p className="av-muted small mb-0">{text}</p></div></div>; }
function Flow({ icon, label }: { icon: string; label: string }) { return <div className="col"><div className="av-flow-node"><i className={`bi ${icon} d-block fs-4 mb-2`} /><span>{label}</span></div></div>; }
function Author({ name, role, github, bio }: { name: string; role: string; github: string; bio: string }) { const username = github.split('/').filter(Boolean).pop() ?? ''; return <div className="col-sm-6 col-lg-3"><div className="av-author-wrap"><a className="av-author-card" href={github} target="_blank" rel="noreferrer" aria-label={`Abrir perfil de GitHub de ${name}`}><div className="av-author-avatar">{name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</div><div className="flex-grow-1"><strong>{name}</strong><small className="d-block av-muted mt-1">{role}</small></div><i className="bi bi-github av-author-github" aria-hidden="true" /></a><div className="av-github-popover" role="tooltip"><img src={`https://github.com/${username}.png?size=96`} alt={`Avatar de ${name}`} /><div><strong>{name}</strong><small>@{username}</small><p>{bio}</p><span><i className="bi bi-github me-1" /> Ver perfil</span></div></div></div></div>; }
