import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import ParticipationForm from './components/ParticipationForm';
import { evaluationTopics, partners, participationSteps, RESEARCH_SOURCE_URL, studyFacts } from './content/research';
import { CONTACT_EMAIL, emailDraft, INSTAGRAM_URL, ROUTES } from './lib/links';

// O arquivo local preserva o vídeo escolhido e mantém o hero visível sem depender da CDN.
const VIDEO_URL = '/hero-bloom.mp4';

const navigation = [
  { label: 'A pesquisa', href: ROUTES.project },
  { label: 'A avaliação', href: ROUTES.evaluation },
  { label: 'Como participar', href: ROUTES.participation },
] as const;

function Brand() {
  return (
    <a href={ROUTES.home} className="brand-lockup shrink-0 text-white" aria-label="Life 80+, voltar ao início">
      <img src="/life80-official-avatar.jpg" alt="" width="40" height="40" className="brand-seal" />
      <span className="brand-wordmark">life80<span className="brand-wordmark__plus">+</span></span>
    </a>
  );
}

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // O vídeo acompanha a preferência de movimento, inclusive quando ela muda.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 1024px)');
    const syncPlayback = () => {
      const video = videoRef.current;
      if (!video) return;
      if (reducedMotion.matches) video.pause();
      else void video.play().catch(() => {});
    };
    const closeOnDesktop = () => { if (desktop.matches) setMobileOpen(false); };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    syncPlayback();
    reducedMotion.addEventListener('change', syncPlayback);
    desktop.addEventListener('change', closeOnDesktop);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      reducedMotion.removeEventListener('change', syncPlayback);
      desktop.removeEventListener('change', closeOnDesktop);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return (
    <section id="inicio" className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#17130f] text-white" aria-label="Apresentação do Life 80+">
      <video ref={videoRef} className="pointer-events-none absolute inset-0 h-full w-full object-cover" src={VIDEO_URL} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-black/15 sm:from-black/55 sm:via-black/20" aria-hidden="true" />

      <header className="relative z-10 w-full px-5 py-4 sm:px-6 sm:py-5 md:px-12 lg:px-16">
        <nav className="relative flex w-full items-center justify-between" aria-label="Navegação principal">
          <Brand />
          <div className="hidden items-center gap-8 lg:flex xl:gap-10">
            {navigation.map((entry) => <a key={entry.href} href={entry.href} className="text-sm font-medium text-white/90 transition-colors hover:text-white">{entry.label}</a>)}
          </div>
          <a href={ROUTES.participate} className="liquid-glass hidden min-h-11 items-center rounded-full px-5 text-sm font-semibold text-white hover:bg-white/10 lg:inline-flex">Registrar interesse</a>

          <button type="button" className="relative flex h-11 w-11 items-center justify-center text-white lg:hidden" aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'} aria-controls="mobile-menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>
            <Menu className={'absolute h-6 w-6 transition-all duration-300 ' + (mobileOpen ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100')} aria-hidden="true" />
            <X className={'absolute h-6 w-6 transition-all duration-300 ' + (mobileOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0')} aria-hidden="true" />
          </button>
          <div id="mobile-menu" className={'mobile-panel absolute top-full right-0 left-0 mt-3 rounded-2xl bg-[#17130f]/95 p-6 backdrop-blur-xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ' + (mobileOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 pointer-events-none opacity-0')} aria-hidden={!mobileOpen} inert={!mobileOpen}>
            <div className="flex flex-col gap-1">
              {navigation.map((entry) => <a key={entry.href} href={entry.href} onClick={() => setMobileOpen(false)} className="rounded-lg px-2 py-3 text-base font-medium text-white/90 hover:bg-white/5 hover:text-white">{entry.label}</a>)}
            </div>
            <div className="mt-4 border-t border-white/20 pt-5">
              <a href={ROUTES.participate} onClick={() => setMobileOpen(false)} className="liquid-glass inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold text-white">Registrar interesse</a>
            </div>
          </div>
        </nav>
      </header>

      <div className="relative z-0 flex flex-1 items-start justify-center px-5 pt-14 sm:pt-16 md:pt-20">
        <div className="max-w-[850px] text-center">
          <p className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-4 py-2 text-[10px] font-semibold tracking-[.1em] text-white/90 backdrop-blur-sm sm:mb-9 sm:gap-3 sm:text-xs sm:tracking-[.18em]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#e6c34f]" aria-hidden="true" />
            PESQUISA EM GERONTOLOGIA · UCB
          </p>
          <h1 className="hero-title text-[clamp(2.35rem,10vw,4rem)] font-semibold leading-[1.03] tracking-[-.035em] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            O futuro também<br />tem <span className="text-[#e6c34f]">80</span> anos.
          </h1>
          <p className="mx-auto mt-6 max-w-[570px] text-base leading-relaxed text-white/85 sm:mt-8 md:text-lg">
            Uma pesquisa da UCB com pessoas de 80 anos ou mais. Avaliamos aspectos da saúde para entender melhor como se vive a longevidade.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-9 sm:gap-4">
            <a href={ROUTES.participate} className="inline-flex min-h-12 items-center rounded-full bg-[#e6c34f] px-6 py-3 text-sm font-semibold text-[#17130f] transition-colors hover:bg-[#f3d66c] sm:text-base">Quero participar da pesquisa</a>
            <a href={ROUTES.project} className="liquid-glass hero-secondary inline-flex min-h-12 items-center rounded-full px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 sm:text-base">Entender o projeto</a>
          </div>
        </div>
      </div>
      <a href={ROUTES.evaluation} className="hero-next relative z-10 mx-5 mb-5 flex min-h-[88px] items-center justify-between gap-5 rounded-2xl border border-white/25 bg-[#17130f]/80 px-5 py-4 text-white backdrop-blur-md transition-colors hover:bg-[#17130f]/95 sm:mx-6 sm:mb-6 md:ml-auto md:mr-12 md:mb-9 md:w-[380px] lg:mr-16">
        <span><span className="block text-[10px] font-semibold tracking-[.2em] text-[#e6c34f]">UMA VISITA PRESENCIAL</span><span className="display-font mt-1 block text-xl leading-tight">O que acontece na avaliação</span></span>
        <ArrowDownRight aria-hidden="true" className="h-6 w-6 shrink-0 text-[#e6c34f]" strokeWidth={1.5} />
      </a>
    </section>
  );
}

function ResearchSection() {
  return (
    <section id="projeto" className="relative overflow-hidden bg-[#17130f] py-24 text-[#f6f0e6] sm:py-32 lg:py-40">
      <div className="section-shell relative z-10">
        <p className="section-eyebrow">01 / A PESQUISA</p>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-20">
          <h2 className="display-font min-w-0 max-w-[14ch] text-[clamp(2.5rem,10vw,3.25rem)] leading-[1.02] tracking-tight sm:text-6xl lg:text-[clamp(4rem,6vw,6.5rem)]">Aos 80, cada trajetória amplia o que sabemos sobre longevidade.</h2>
          <div className="max-w-xl text-base leading-relaxed text-[#d5cfc4] sm:text-lg">
            <p>O Life 80+ investiga a saúde, a funcionalidade e a fragilidade de pessoas com 80 anos ou mais. O estudo integra a Pós-Graduação em Gerontologia da Universidade Católica de Brasília.</p>
            <p className="mt-5">Desde 2016, a equipe reúne avaliações e dados que podem apoiar pesquisas sobre envelhecimento saudável e planejamento de cuidados.</p>
          </div>
        </div>
        <div className="mt-20 grid border-t border-white/25 sm:grid-cols-3 lg:mt-28">
          {studyFacts.map((fact) => (
            <div key={fact.value} className="border-b border-white/15 py-7 sm:border-b-0 sm:border-r sm:px-7 sm:last:border-r-0 sm:first:pl-0 lg:py-9">
              <strong className="display-font block text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-none tracking-[-.06em] text-[#e6c34f]">{fact.value}</strong>
              <span className="mt-3 block text-sm leading-relaxed text-[#c9c1b4] sm:text-base">{fact.label}</span>
            </div>
          ))}
        </div>
        <a href={RESEARCH_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-[#e6c34f]/70 text-sm font-medium text-[#e6c34f] hover:text-white">Ler a publicação da UCB <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
      </div>
      <span aria-hidden="true" className="project-watermark display-font pointer-events-none absolute right-[-2vw] bottom-[-.35em] hidden text-[clamp(15rem,35vw,34rem)] leading-none text-[#e6c34f]/[.045] lg:block">80+</span>
    </section>
  );
}

function EvaluationSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = evaluationTopics[selectedIndex];

  return (
    <section id="avaliacao" className="bg-[#eee9dc] py-24 text-[#262117] sm:py-32 lg:py-40">
      <div className="section-shell">
        <p className="section-eyebrow section-eyebrow-light">02 / A AVALIAÇÃO</p>
        <div className="mt-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
          <h2 className="display-font max-w-[15ch] text-[clamp(2.5rem,10vw,3.25rem)] leading-[1.02] tracking-tight sm:text-6xl lg:text-[clamp(4rem,6vw,6.5rem)]">A idade é um número. A saúde pede mais perguntas.</h2>
          <p className="max-w-md text-base leading-relaxed text-[#62594a] sm:text-lg">A equipe observa diferentes aspectos da capacidade intrínseca — habilidades físicas e mentais relacionadas à autonomia e à qualidade de vida.</p>
        </div>
        <div className="mt-12 grid min-w-0 gap-4 lg:mt-16 lg:grid-cols-[.95fr_1.05fr] lg:gap-5">
          <div role="group" aria-label="Explore os temas da avaliação" className="grid min-w-0 gap-3 sm:grid-cols-2">
            {evaluationTopics.map((topic, index) => {
              const active = index === selectedIndex;
              return (
                <button key={topic.number} type="button" aria-pressed={active} aria-controls="evaluation-detail" onClick={() => setSelectedIndex(index)} className={'flex min-h-[180px] min-w-0 flex-col justify-between rounded-[24px] border p-5 text-left transition-colors sm:p-6 lg:min-h-[210px] ' + (active ? 'border-[#17130f] bg-[#17130f] text-white' : 'border-[#262117]/15 bg-[#f8f5eb] text-[#262117] hover:border-[#9c803a] hover:bg-white')}>
                  <span className={'text-xs font-semibold tracking-[.2em] ' + (active ? 'text-[#e6c34f]' : 'text-[#7d6d4f]')}>{topic.number} / 04</span>
                  <span>
                    <strong className="display-font block text-2xl leading-tight sm:text-3xl">{topic.title}</strong>
                    <span className={'mt-2 block text-sm leading-relaxed ' + (active ? 'text-[#d8d1c3]' : 'text-[#62594a]')}>{topic.lead}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div id="evaluation-detail" aria-live="polite" className="relative flex min-h-[350px] min-w-0 flex-col overflow-hidden rounded-[28px] bg-[#dbc169] p-7 sm:p-10 lg:min-h-full">
            <span className="relative z-10 text-xs font-semibold tracking-[.2em] text-[#5e4a1a]">EM FOCO / {selected.number}</span>
            <div className="relative z-10 mt-auto max-w-xl pt-20">
              <h3 className="display-font text-[clamp(2.5rem,5vw,5.25rem)] leading-[1.02] tracking-tight">{selected.title}</h3>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#40351e] sm:text-lg">{selected.detail}</p>
              <a href={ROUTES.participation} className="mt-7 inline-flex min-h-11 items-center gap-2 border-b border-[#262117] text-sm font-semibold">Veja como participar <ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
            </div>
            <span aria-hidden="true" className="display-font pointer-events-none absolute -top-20 -right-4 text-[18rem] leading-none text-[#fff5d2]/40 sm:text-[24rem]">80</span>
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#6b6151]">Os procedimentos são explicados pela equipe antes da avaliação. Informações baseadas na <a href={RESEARCH_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[#17130f]">publicação da UCB sobre o Life 80+</a>.</p>
      </div>
    </section>
  );
}

function ParticipationSection() {
  return (
    <section id="como-participar" className="bg-[#e6c34f] py-24 text-[#201b13] sm:py-32 lg:py-40">
      <div className="section-shell">
        <p className="section-eyebrow section-eyebrow-dark">03 / COMO PARTICIPAR</p>
        <div className="mt-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
          <h2 className="display-font max-w-[14ch] text-[clamp(2.75rem,10vw,3.5rem)] leading-[.99] tracking-[-.045em] sm:text-6xl lg:text-[clamp(4rem,6vw,6.5rem)]">Uma visita à UCB. Uma contribuição para entender a longevidade.</h2>
          <p className="max-w-sm text-base leading-relaxed text-[#4c3c19] sm:text-lg">A pesquisa recebe pessoas com 80 anos ou mais. O contato inicial permite à equipe confirmar os critérios e combinar a avaliação presencial.</p>
        </div>
        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3">
          {participationSteps.map((step) => (
            <article key={step.number} className="flex min-h-[245px] flex-col rounded-[26px] border border-[#201b13]/15 bg-[#f7edcf] p-6 sm:p-8 lg:min-h-[300px]">
              <span className="text-xs font-semibold tracking-[.2em] text-[#786431]">{step.number} / 03</span>
              <div className="mt-auto pt-10">
                <h3 className="display-font text-3xl leading-tight sm:text-4xl">{step.title}</h3>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-[#625230]">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-5 grid gap-6 rounded-[28px] bg-[#17130f] p-6 text-white sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:p-12">
          <div>
            <p className="text-xs font-semibold tracking-[.2em] text-[#e6c34f]">PESSOAS COM 80 ANOS OU MAIS</p>
            <h3 className="display-font mt-4 max-w-[15ch] text-3xl leading-tight sm:text-4xl">Seu interesse é o primeiro passo.</h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#d8d1c3] sm:text-base">O formulário organiza seus dados e dias possíveis. A data indicada é uma sugestão; a equipe confirma o agendamento.</p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <a href={ROUTES.participate} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#e6c34f] px-6 text-sm font-semibold text-[#17130f] hover:bg-[#f3d66c] sm:text-base">Registrar interesse <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
            <a href={emailDraft('Life 80+ — participação de familiar', 'Olá, equipe do Life 80+!\nGostaria de saber como ajudar um familiar a participar da pesquisa.')} className="min-h-11 border-b border-white/50 py-2 text-sm text-white/85 hover:text-white">Vou ajudar um familiar</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinaleFooter() {
  return (
    <footer className="overflow-hidden bg-[#17130f] text-[#f6f0e6]">
      <div className="relative min-h-[600px] sm:min-h-[700px]">
        <img src="/footer-bloom.jpg" alt="" aria-hidden="true" loading="lazy" className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#17130f] via-[#17130f]/85 to-[#17130f]/35" aria-hidden="true" />
        <div className="section-shell relative z-10 pt-24 pb-32 sm:pt-32 lg:pt-36">
          <p className="section-eyebrow">04 / PARTICIPE</p>
          <h2 className="display-font mt-10 max-w-[11ch] text-[clamp(3.5rem,8vw,8rem)] leading-[.97] tracking-[-.045em]">Vamos conversar sobre a pesquisa<span className="text-[#e6c34f]">?</span></h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-[#e2dbcf] sm:text-lg">Conte à equipe que você tem interesse. A visita só é marcada depois que vocês conversarem e confirmarem os detalhes.</p>
          <a href={ROUTES.participate} className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#e6c34f] px-6 py-3 text-sm font-semibold text-[#201b13] transition-colors hover:bg-[#f3d66c] sm:text-base">Ir ao formulário <ArrowDownRight aria-hidden="true" className="h-5 w-5" /></a>
        </div>
      </div>

      <div className="section-shell relative z-10 -mt-20 pb-24 sm:-mt-28 sm:pb-32">
        <ParticipationForm />
      </div>

      <div className="border-t border-white/20 bg-[#17130f]">
        <div className="section-shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.05fr_.65fr_1.2fr_.95fr] lg:gap-10 lg:py-20">
          <div className="flex flex-col items-start">
            <Brand />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#bdb5aa]">Pesquisa sobre longevidade, capacidade intrínseca e fragilidade em pessoas com 80 anos ou mais, vinculada à Gerontologia da UCB.</p>
            <a href={ROUTES.participate} className="mt-6 inline-flex min-h-11 items-center rounded-full border border-[#e6c34f]/65 px-5 text-sm font-semibold text-[#e6c34f] hover:bg-[#e6c34f] hover:text-[#17130f]">Registrar interesse</a>
          </div>
          <nav aria-label="Navegação do rodapé" className="flex flex-col items-start gap-3 text-sm">
            <h3 className="mb-2 font-semibold text-white">Explore</h3>
            <a href={ROUTES.home} className="text-[#c9c1b4] hover:text-[#e6c34f]">Início</a>
            <a href={ROUTES.project} className="text-[#c9c1b4] hover:text-[#e6c34f]">A pesquisa</a>
            <a href={ROUTES.evaluation} className="text-[#c9c1b4] hover:text-[#e6c34f]">A avaliação</a>
            <a href={ROUTES.participation} className="text-[#c9c1b4] hover:text-[#e6c34f]">Como participar</a>
          </nav>
          <div>
            <h3 className="mb-5 text-sm font-semibold text-white">Instituições e apoios</h3>
            <ul className="grid gap-4">
              {partners.map((partner) => (
                <li key={partner.name} className="text-sm leading-relaxed">
                  <a href={partner.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#e6c34f] hover:text-white">{partner.name}</a>
                  <span className="block text-[#c9c1b4]">{partner.full}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start gap-3 text-sm">
            <h3 className="mb-2 font-semibold text-white">Fale com a equipe</h3>
            <a href={'mailto:' + CONTACT_EMAIL} className="break-all text-[#c9c1b4] hover:text-[#e6c34f]">{CONTACT_EMAIL}</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-[#c9c1b4] hover:text-[#e6c34f]">Instagram @life80mais</a>
            <a href={RESEARCH_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="text-[#c9c1b4] hover:text-[#e6c34f]">Publicação da UCB</a>
            <a href={emailDraft('Life 80+ — contato com a equipe', 'Olá, equipe do Life 80+!\nGostaria de saber mais sobre a pesquisa.')} className="mt-3 inline-flex min-h-11 items-center rounded-full bg-[#e6c34f] px-5 font-semibold text-[#17130f] hover:bg-[#f3d66c]">Escrever e-mail</a>
          </div>
        </div>
        <div className="section-shell flex flex-col gap-2 border-t border-white/15 py-6 text-xs text-[#9f978b] sm:flex-row sm:justify-between">
          <span>Life 80+ · Universidade Católica de Brasília</span>
          <span>Informações sobre a pesquisa: UCB e @life80mais.</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <main>
        <Hero />
        <ResearchSection />
        <EvaluationSection />
        <ParticipationSection />
      </main>
      <FinaleFooter />
    </>
  );
}
