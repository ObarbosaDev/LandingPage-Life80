import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatPreferredDate, localDateKey, monthCells, participationMessage, phoneDigits, WEEKDAYS } from '../lib/participation';
import { emailDraft, INSTAGRAM_URL } from '../lib/links';

const SOURCE_OPTIONS = [
  'Indicação de família ou amigos',
  'Instagram do Life 80+',
  'Outra rede social',
  'Universidade Católica de Brasília',
  'Profissional de saúde',
  'Outra forma',
] as const;

// O número oficial será adicionado quando a equipe confirmar o canal de WhatsApp.
const WHATSAPP_NUMBER = (import.meta.env.VITE_LIFE80_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');
const WHATSAPP_READY = /^55\d{10,11}$/.test(WHATSAPP_NUMBER);

export default function ParticipationForm() {
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);
  const todayKey = localDateKey(today);
  const reviewRef = useRef<HTMLDivElement>(null);

  const [contactRole, setContactRole] = useState<'self' | 'family'>('self');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [contactName, setContactName] = useState('');
  const [source, setSource] = useState('');
  const [otherSource, setOtherSource] = useState('');
  const [availableDays, setAvailableDays] = useState<number[]>([]);
  const [monthOffset, setMonthOffset] = useState(0);
  const [preferredDate, setPreferredDate] = useState('');
  const [dateToArrange, setDateToArrange] = useState(false);
  const [messagePreview, setMessagePreview] = useState('');
  const [status, setStatus] = useState('');

  // Alterar qualquer resposta invalida a revisão anterior.
  useEffect(() => {
    setMessagePreview('');
    setStatus('');
  }, [contactRole, name, age, phone, contactName, source, otherSource, availableDays, preferredDate, dateToArrange]);

  // A revisão fica visível após o envio, sem mover a página enquanto a pessoa preenche.
  useEffect(() => {
    if (!messagePreview) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    reviewRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }, [messagePreview]);

  const shownMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const monthLabel = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(shownMonth);
  const shortMonthLabel = new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' }).format(shownMonth);
  const cells = monthCells(shownMonth.getFullYear(), shownMonth.getMonth());
  const selectedDayLabels = WEEKDAYS.filter((day) => availableDays.includes(day.value)).map((day) => day.label).join(', ');

  const toggleDay = (day: number) => {
    const next = availableDays.includes(day) ? availableDays.filter((value) => value !== day) : [...availableDays, day];
    setAvailableDays(next);
    if (preferredDate) {
      const [year, month, date] = preferredDate.split('-').map(Number);
      if (!next.includes(new Date(year, month - 1, date).getDay())) setPreferredDate('');
    }
  };

  const prepareMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Number(age) < 80) {
      setStatus('A pesquisa recebe pessoas com 80 anos ou mais.');
      return;
    }
    if (phoneDigits(phone).length < 10 || phoneDigits(phone).length > 11) {
      setStatus('Informe um telefone com DDD e 10 ou 11 dígitos.');
      return;
    }
    if (!source || (source === 'Outra forma' && !otherSource.trim())) {
      setStatus('Conte como soube da pesquisa.');
      return;
    }
    if (availableDays.length === 0) {
      setStatus('Escolha pelo menos um dia da semana.');
      return;
    }
    if (!preferredDate && !dateToArrange) {
      setStatus('Escolha uma data sugerida ou marque que prefere combinar com a equipe.');
      return;
    }

    setMessagePreview(participationMessage({
      name,
      age,
      phone,
      contactName: contactRole === 'family' ? contactName : undefined,
      source: source === 'Outra forma' ? otherSource : source,
      availableDays,
      preferredDate: dateToArrange ? undefined : preferredDate,
    }));
    setStatus('Confira os dados abaixo antes de abrir o canal de contato.');
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(messagePreview);
      setStatus('Mensagem copiada.');
    } catch {
      setStatus('Não foi possível copiar automaticamente. Abra a mensagem completa para selecionar o texto.');
    }
  };

  return (
    <form id="formulario-participacao" onSubmit={prepareMessage} className="participation-form min-w-0 rounded-[28px] bg-[#f7edcf] p-5 text-[#201b13] shadow-2xl sm:p-8 lg:p-10">
      <div className="flex min-w-0 flex-col gap-3 border-b border-[#201b13]/20 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[.2em] text-[#786431]">PEDIDO DE CONTATO / LIFE 80+</p>
          <h3 className="display-font mt-3 max-w-[17ch] text-3xl leading-tight sm:text-4xl">Vamos conversar sobre a sua participação.</h3>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-[#625230]">Este formulário prepara um pedido de contato. A equipe confirma os critérios, a data e o horário da avaliação.</p>
      </div>

      <div className="mt-8 grid min-w-0 gap-10 lg:grid-cols-[minmax(0,.83fr)_minmax(0,1.17fr)] lg:gap-14">
        <div className="grid min-w-0 content-start gap-5">
          <div className="flex items-center gap-3">
            <span className="form-step">01</span>
            <h4 className="display-font text-2xl">Quem vai participar</h4>
          </div>
          <div role="group" aria-label="Quem está preenchendo o formulário?" className="grid gap-2 sm:grid-cols-2">
            <button type="button" aria-pressed={contactRole === 'self'} onClick={() => setContactRole('self')} className={'source-option justify-center text-center ' + (contactRole === 'self' ? 'source-option--selected' : '')}>Estou preenchendo para mim</button>
            <button type="button" aria-pressed={contactRole === 'family'} onClick={() => setContactRole('family')} className={'source-option justify-center text-center ' + (contactRole === 'family' ? 'source-option--selected' : '')}>Estou ajudando alguém</button>
          </div>
          <label className="form-label">Nome da pessoa participante
            <input className="form-input" name="name" type="text" autoComplete="name" minLength={2} maxLength={100} required value={name} onChange={(event) => setName(event.target.value)} placeholder="Nome completo" />
          </label>
          <div className="grid min-w-0 gap-5 sm:grid-cols-[minmax(0,.45fr)_minmax(0,1fr)] lg:grid-cols-1 xl:grid-cols-[minmax(0,.45fr)_minmax(0,1fr)]">
            <label className="form-label">Idade <span className="font-normal text-[#786431]">(80 anos ou mais)</span>
              <input className="form-input" name="age" type="number" inputMode="numeric" min="80" max="120" required value={age} onChange={(event) => setAge(event.target.value)} placeholder="Ex.: 82" />
            </label>
            <label className="form-label">Telefone para contato
              <input className="form-input" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={20} required value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(61) 99999-9999" />
            </label>
          </div>
          {contactRole === 'family' && (
            <label className="form-label">Seu nome, para a equipe saber com quem falar
              <input className="form-input" name="contactName" type="text" autoComplete="name" minLength={2} maxLength={100} required value={contactName} onChange={(event) => setContactName(event.target.value)} placeholder="Seu nome completo" />
            </label>
          )}
          <fieldset className="min-w-0">
            <legend className="form-label">Como soube da pesquisa?</legend>
            <div className="mt-3 grid min-w-0 gap-2 lg:grid-cols-2">
              {SOURCE_OPTIONS.map((option, index) => (
                <label key={option} className={'source-option ' + (source === option ? 'source-option--selected' : '')}>
                  <input type="radio" name="source" value={option} required={index === 0} checked={source === option} onChange={() => setSource(option)} className="sr-only" />
                  <span className="source-option__indicator" aria-hidden="true" />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {source === 'Outra forma' && (
            <label className="form-label">Conte como soube
              <input className="form-input" name="otherSource" type="text" maxLength={120} required value={otherSource} onChange={(event) => setOtherSource(event.target.value)} placeholder="Ex.: por uma notícia" />
            </label>
          )}
        </div>

        <div className="min-w-0">
          <div className="mb-5 flex items-center gap-3">
            <span className="form-step">02</span>
            <h4 className="display-font text-2xl">Quando você pode vir</h4>
          </div>
          <fieldset>
            <legend className="form-label">Quais dias da semana funcionam para você?</legend>
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
              {WEEKDAYS.map((day) => {
                const selected = availableDays.includes(day.value);
                return (
                  <button key={day.value} type="button" aria-label={day.label} aria-pressed={selected} onClick={() => toggleDay(day.value)} className={'weekday-option ' + (selected ? 'weekday-option--selected' : '')}>{day.short}</button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-6 min-w-0 rounded-[22px] border border-[#201b13]/20 bg-[#fff9e9] p-3 sm:p-5">
            <div className="flex items-center justify-between gap-3 px-1">
              <button type="button" aria-label="Mês anterior" disabled={monthOffset === 0} onClick={() => setMonthOffset((value) => value - 1)} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-[#e9dfc4] disabled:cursor-not-allowed disabled:opacity-30"><ChevronLeft aria-hidden="true" className="h-5 w-5" /></button>
              <h4 aria-live="polite" aria-label={monthLabel} className="whitespace-nowrap text-center text-sm font-semibold sm:text-base"><span className="sm:hidden">{shortMonthLabel}</span><span className="hidden sm:inline">{monthLabel}</span></h4>
              <button type="button" aria-label="Próximo mês" disabled={monthOffset === 2} onClick={() => setMonthOffset((value) => value + 1)} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-[#e9dfc4] disabled:cursor-not-allowed disabled:opacity-30"><ChevronRight aria-hidden="true" className="h-5 w-5" /></button>
            </div>
            <div className="calendar-scroll mt-3 min-w-0 max-w-full overflow-x-auto pb-1">
              <div className="min-w-[320px]">
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-[#786431]">
                  {WEEKDAYS.map((day) => <span key={day.value} className="py-2">{day.short}</span>)}
                </div>
                <div role="group" aria-label="Escolha uma data sugerida" className="grid grid-cols-7 gap-1">
                  {cells.map((date, index) => {
                    if (!date) return <span key={'empty-' + index} aria-hidden="true" />;
                    const key = localDateKey(date);
                    const enabled = key >= todayKey && availableDays.includes(date.getDay());
                    const chosen = preferredDate === key && !dateToArrange;
                    return (
                      <button key={key} type="button" disabled={!enabled} aria-label={formatPreferredDate(key)} aria-pressed={chosen} onClick={() => { setPreferredDate(key); setDateToArrange(false); }} className={'flex h-11 min-w-11 items-center justify-center rounded-xl text-sm font-medium transition-colors ' + (chosen ? 'bg-[#17130f] text-white' : enabled ? 'bg-[#e6c34f]/30 text-[#201b13] hover:bg-[#e6c34f]' : 'text-[#9f9889] opacity-55')}>{date.getDate()}</button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[#625230]">Marque os dias possíveis e escolha uma data sugerida. Esta escolha não reserva um horário.</p>
          <p className="text-sm leading-relaxed text-[#625230] min-[380px]:hidden">Deslize o calendário para ver a semana inteira.</p>
          <label className={'source-option mt-4 ' + (dateToArrange ? 'source-option--selected' : '')}>
            <input type="checkbox" checked={dateToArrange} onChange={(event) => { setDateToArrange(event.target.checked); if (event.target.checked) setPreferredDate(''); }} className="h-5 w-5 shrink-0 accent-[#201b13]" />
            <span>Prefiro combinar a data com a equipe</span>
          </label>
          {preferredDate && !dateToArrange && <p className="mt-4 rounded-xl bg-[#e6c34f]/35 px-4 py-3 text-sm leading-relaxed"><span className="font-semibold">Data sugerida:</span> {formatPreferredDate(preferredDate)}</p>}
        </div>
      </div>

      <div className="mt-9 flex flex-col gap-4 border-t border-[#201b13]/20 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm leading-relaxed text-[#625230]">Os dados são usados para montar a mensagem. Este site não salva o formulário nem confirma o agendamento.</p>
        <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#17130f] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#443526] sm:text-base">Revisar pedido <ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
      </div>
      {status && <p role="status" className="mt-4 text-sm font-medium text-[#5c4918]">{status}</p>}

      {messagePreview && (
        <div ref={reviewRef} id="revisao-do-pedido" className="mt-8 scroll-mt-6 border-t border-[#201b13]/20 pt-8">
          <p className="text-xs font-semibold tracking-[.2em] text-[#786431]">ÚLTIMO PASSO</p>
          <h4 className="display-font mt-3 text-3xl leading-tight sm:text-4xl">Confira antes de enviar.</h4>
          <dl className="mt-6 grid gap-x-8 gap-y-4 rounded-2xl bg-[#fff9e9] p-5 text-sm sm:grid-cols-2 sm:p-6">
            <div><dt className="font-semibold text-[#786431]">Pessoa participante</dt><dd className="mt-1">{name}, {age} anos</dd></div>
            <div><dt className="font-semibold text-[#786431]">Telefone</dt><dd className="mt-1">{phone}</dd></div>
            {contactRole === 'family' && <div><dt className="font-semibold text-[#786431]">Pessoa de contato</dt><dd className="mt-1">{contactName}</dd></div>}
            <div><dt className="font-semibold text-[#786431]">Dias disponíveis</dt><dd className="mt-1">{selectedDayLabels}</dd></div>
            <div><dt className="font-semibold text-[#786431]">Data sugerida</dt><dd className="mt-1">{dateToArrange ? 'A combinar com a equipe' : formatPreferredDate(preferredDate)}</dd></div>
          </dl>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#625230]">Ao abrir o e-mail ou o WhatsApp, a mensagem estará pronta para sua revisão. O envio acontece apenas quando você confirmar no aplicativo.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {WHATSAPP_READY ? (
              <a href={'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(messagePreview)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#17130f] px-6 text-sm font-semibold text-white hover:bg-[#443526]">Abrir WhatsApp <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
            ) : (
              <a href={emailDraft('Interesse na pesquisa Life 80+', messagePreview)} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#17130f] px-6 text-sm font-semibold text-white hover:bg-[#443526]">Abrir e-mail <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
            )}
            <button type="button" onClick={copyMessage} className="min-h-12 rounded-full border border-[#201b13]/30 px-6 text-sm font-semibold hover:bg-white">Copiar mensagem</button>
          </div>
          <details className="mt-5 text-sm">
            <summary className="cursor-pointer font-semibold underline underline-offset-4">Ver mensagem completa</summary>
            <pre className="mt-3 whitespace-pre-wrap break-words rounded-xl bg-white/70 p-4 leading-relaxed">{messagePreview}</pre>
          </details>
          {!WHATSAPP_READY && <p className="mt-5 text-sm leading-relaxed text-[#625230]">Também é possível acompanhar o projeto no <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">Instagram oficial</a>.</p>}
        </div>
      )}
    </form>
  );
}
