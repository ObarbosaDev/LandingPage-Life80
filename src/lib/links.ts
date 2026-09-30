/** Destinos internos da página. A inscrição aponta diretamente para o formulário. */
export const ROUTES = {
  home: '#inicio',
  project: '#projeto',
  evaluation: '#avaliacao',
  participation: '#como-participar',
  participate: '#formulario-participacao',
} as const;

/** Canais já presentes no projeto; o número de WhatsApp permanece sem configuração. */
export const CONTACT_EMAIL = 'projetolifeplus80@gmail.com';
export const INSTAGRAM_URL = 'https://www.instagram.com/life80mais/';

export function emailDraft(subject: string, body: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
