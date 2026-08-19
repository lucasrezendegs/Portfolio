import { useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Camera,
  Check,
  Clapperboard,
  ExternalLink,
  Github,
  Layers3,
  Mail,
  Menu,
  MessageCircle,
  MonitorPlay,
  Palette,
  X,
} from 'lucide-react';

const projects = [
  {
    number: '01',
    title: 'Relatório de Gestão do DEC',
    category: 'Design editorial',
    description:
      'Projeto editorial completo, da organização da informação à diagramação, infográficos e preparação para impressão em alta tiragem.',
    image: '/rgdec.png',
    tags: ['InDesign', 'Photoshop', 'Infográficos'],
  },
  {
    number: '02',
    title: 'Revista Taquari II',
    category: 'Publicação & direção visual',
    description:
      'Direção visual, capa, diagramação e curadoria de imagens para uma publicação institucional com linguagem clara e acabamento profissional.',
    image: '/taquari.jpeg',
    tags: ['Editorial', 'Direção de arte', 'Print'],
  },
  {
    number: '03',
    title: 'Cobertura institucional',
    category: 'Fotografia & audiovisual',
    description:
      'Registro fotográfico e produção audiovisual com seleção, tratamento de imagem, montagem e acabamento para comunicação institucional.',
    image: '/institucional.jpeg',
    tags: ['Fotografia', 'Premiere Pro', 'Pós-produção'],
  },
];

const services = [
  {
    icon: Palette,
    title: 'Design gráfico',
    text: 'Identidade visual, peças digitais, materiais institucionais, apresentações e campanhas.',
  },
  {
    icon: Layers3,
    title: 'Design editorial',
    text: 'Revistas, relatórios, catálogos e documentos com hierarquia visual e acabamento para impressão.',
  },
  {
    icon: MonitorPlay,
    title: 'Edição de vídeo',
    text: 'Cortes, ritmo, trilha, textos, correção de cor e montagem para conteúdo profissional.',
  },
  {
    icon: Camera,
    title: 'Fotografia',
    text: 'Cobertura de eventos, retratos, produtos e registros institucionais com pós-produção.',
  },
];

const skills = ['Photoshop', 'Premiere Pro', 'InDesign', 'Illustrator', 'CorelDRAW', 'Fotografia', 'Direção de arte', 'Pós-produção'];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const sections = ['inicio', 'servicos', 'projetos', 'sobre', 'contato'];
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) sectionObserver.observe(element);
    });

    return () => sectionObserver.disconnect();
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal');

    // The previous stylesheet intentionally hides reveal elements until this
    // observer marks them as visible. Without this observer the whole page
    // appears empty in production, leaving only the fixed navigation visible.
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );

    elements.forEach((element) => revealObserver.observe(element));

    // Guarantee content visibility even in browsers/environments where
    // IntersectionObserver is unavailable or delayed during hydration.
    const fallback = window.setTimeout(() => {
      elements.forEach((element) => element.classList.add('visible'));
    }, 1200);

    return () => {
      window.clearTimeout(fallback);
      revealObserver.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" onClick={closeMenu}>
          LR<span>.</span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`topnav ${menuOpen ? 'open' : ''}`}>
          {[
            ['inicio', 'Início'],
            ['servicos', 'Serviços'],
            ['projetos', 'Projetos'],
            ['sobre', 'Sobre'],
            ['contato', 'Contato'],
          ].map(([id, label]) => (
            <a key={id} className={activeSection === id ? 'active' : ''} href={`#${id}`} onClick={closeMenu}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#contato">Vamos conversar <ArrowUpRight size={16} /></a>
      </header>

      <main>
        <section id="inicio" className="hero section">
          <div className="hero-grid" />
          <div className="hero-copy reveal">
            <div className="eyebrow"><span className="live-dot" /> Disponível para projetos</div>
            <p className="hero-kicker">Designer gráfico · Audiovisual · Fotografia</p>
            <h1>Design que faz sua marca <em>ser percebida.</em></h1>
            <p className="hero-lead">
              Transformo ideias em peças visuais, publicações e conteúdos audiovisuais com direção criativa, atenção aos detalhes e foco no resultado.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projetos">Ver projetos <ArrowDownRight size={18} /></a>
              <a className="button button-ghost" href="#contato">Solicitar orçamento <MessageCircle size={18} /></a>
            </div>
            <div className="hero-proof">
              <span>03</span><div><strong>projetos em destaque</strong><small>selecionados para esta apresentação</small></div>
            </div>
          </div>
          <div className="hero-visual reveal delay-1">
            <div className="portrait-frame">
              <img src="/institucional.jpeg" alt="Projeto audiovisual de Lucas Rezende" />
              <div className="floating-card floating-top"><Clapperboard size={18} /><span>Audiovisual<br /><b>+ Design</b></span></div>
              <div className="floating-card floating-bottom"><span>01</span><div><small>FOCO</small><b>Detalhe & impacto</b></div></div>
            </div>
          </div>
          <a className="scroll-cue" href="#servicos"><span>Role para explorar</span><ArrowDownRight size={18} /></a>
        </section>

        <section id="servicos" className="section services-section">
          <div className="section-heading reveal">
            <div><span className="eyebrow-number">01 /</span><span className="eyebrow-label">O que eu faço</span></div>
            <h2>Soluções visuais para <em>comunicar melhor.</em></h2>
            <p>Um serviço criativo completo para quem precisa de uma apresentação mais profissional, consistente e memorável.</p>
          </div>
          <div className="services-grid">
            {services.map(({ icon: Icon, title, text }, index) => (
              <article className="service-card reveal" style={{ transitionDelay: `${index * 70}ms` }} key={title}>
                <div className="service-icon"><Icon size={22} /></div>
                <span className="service-index">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="#contato">Quero este serviço <ArrowUpRight size={15} /></a>
              </article>
            ))}
          </div>
        </section>

        <section id="projetos" className="section projects-section">
          <div className="section-heading split reveal">
            <div><span className="eyebrow-number">02 /</span><span className="eyebrow-label">Trabalho selecionado</span></div>
            <div><h2>Projetos que <em>falam por si.</em></h2><p>Uma seleção do meu trabalho em design editorial, comunicação e audiovisual.</p></div>
          </div>
          <div className="projects-list">
            {projects.map((project, index) => (
              <article className={`project-card reveal ${index % 2 ? 'reverse' : ''}`} key={project.title}>
                <div className="project-image-wrap"><img src={project.image} alt={project.title} /><span className="project-number">{project.number}</span></div>
                <div className="project-content">
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="sobre" className="section about-section">
          <div className="about-card reveal">
            <div className="about-label"><span className="eyebrow-number">03 /</span><span>Sobre o profissional</span></div>
            <div className="about-content">
              <div><h2>Precisão no processo.<br /><em>Personalidade no resultado.</em></h2></div>
              <div className="about-text">
                <p>Minha trajetória une comunicação, design e audiovisual. Gosto de entender primeiro o objetivo de cada projeto e, só então, construir uma solução visual que faça sentido para a audiência.</p>
                <p>Tenho experiência com materiais institucionais, design editorial, fotografia e edição de vídeo — do conceito ao arquivo final.</p>
                <div className="check-list">{['Olhar estratégico para comunicação', 'Organização e atenção aos detalhes', 'Compromisso com prazos e acabamento'].map((item) => <span key={item}><Check size={15} />{item}</span>)}</div>
              </div>
            </div>
          </div>
          <div className="skills-strip reveal">
            <span>Ferramentas & competências</span>
            <div>{skills.map((skill) => <b key={skill}>{skill}</b>)}</div>
          </div>
        </section>

        <section id="contato" className="section contact-section">
          <div className="contact-inner reveal">
            <div className="contact-heading"><span className="eyebrow-number">04 /</span><span className="eyebrow-label">Próximo projeto</span><h2>Tem uma ideia?<br /><em>Vamos tirar do papel.</em></h2></div>
            <div className="contact-copy"><p>Conte um pouco sobre o que você precisa e vamos conversar sobre a melhor solução visual para o seu projeto.</p><div className="contact-actions"><a className="button button-primary" href="mailto:lucas.lgrs@outlook.com">Enviar e-mail <Mail size={17} /></a><a className="button button-outline" href="https://wa.me/5561998361444" target="_blank" rel="noreferrer">Falar pelo WhatsApp <MessageCircle size={17} /></a></div><div className="contact-email">lucas.lgrs@outlook.com</div></div>
          </div>
        </section>
      </main>

      <footer className="footer"><div><a className="brand" href="#inicio">LR<span>.</span></a><p>Design · Audiovisual · Fotografia</p></div><div className="footer-links"><a href="https://github.com/lucasrezendegs" target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ExternalLink size={13} /></a><a href="#contato">Contato <ArrowUpRight size={13} /></a></div><small>© {new Date().getFullYear()} Lucas Rezende. Todos os direitos reservados.</small></footer>
    </div>
  );
}
