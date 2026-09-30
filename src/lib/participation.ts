// O calendário usa datas locais para evitar que o fuso horário mude o dia escolhido.
export const WEEKDAYS = [
  { value: 1, short: 'Seg', label: 'Segunda-feira' },
  { value: 2, short: 'Ter', label: 'Terça-feira' },
  { value: 3, short: 'Qua', label: 'Quarta-feira' },
  { value: 4, short: 'Qui', label: 'Quinta-feira' },
  { value: 5, short: 'Sex', label: 'Sexta-feira' },
  { value: 6, short: 'Sáb', label: 'Sábado' },
  { value: 0, short: 'Dom', label: 'Domingo' },
] as const;

export function localDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function monthCells(year: number, month: number): Array<Date | null> {
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();
  const cells: Array<Date | null> = Array(firstWeekday).fill(null);
  for (let day = 1; day <= count; day += 1) cells.push(new Date(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function formatPreferredDate(key: string): string {
  const [year, month, day] = key.split('-').map(Number);
  return new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(year, month - 1, day));
}

export function phoneDigits(value: string): string {
  return value.replace(/\D/g, '');
}

export function participationMessage(data: {
  name: string;
  age: string;
  phone: string;
  contactName?: string;
  source: string;
  availableDays: number[];
  preferredDate?: string;
}): string {
  const days = WEEKDAYS.filter((day) => data.availableDays.includes(day.value)).map((day) => day.label).join(', ');
  return [
    'Olá, equipe do Life 80+! Gostaria de saber como participar da pesquisa com pessoas de 80 anos ou mais.',
    '',
    `Nome da pessoa participante: ${data.name.trim()}`,
    `Idade: ${data.age} anos`,
    `Telefone para contato: ${data.phone.trim()}`,
    ...(data.contactName ? [`Pessoa de contato: ${data.contactName.trim()}`] : []),
    `Como soube da pesquisa: ${data.source.trim()}`,
    `Dias da semana disponíveis: ${days}`,
    `Data sugerida: ${data.preferredDate ? formatPreferredDate(data.preferredDate) : 'a combinar com a equipe'}`,
    '',
    'Entendo que o horário e a participação dependem da confirmação da equipe.',
  ].join('\n');
}
