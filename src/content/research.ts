/** Conteúdo factual baseado na publicação da UCB e na apresentação do @life80mais. */
export const RESEARCH_SOURCE_URL = 'https://ucb2.catolica.edu.br/portal/noticias/projeto-convida-pessoas-idosas-para-pesquisa-sobre-longevidade/';

export const studyFacts = [
  { value: '80+', label: 'idade das pessoas participantes' },
  { value: '2016', label: 'início do Life 80+' },
  { value: '≈ 2h', label: 'duração da avaliação presencial' },
] as const;

export const evaluationTopics = [
  {
    number: '01',
    title: 'Mobilidade e equilíbrio',
    lead: 'Como o corpo se move no dia a dia.',
    detail: 'A avaliação observa mobilidade e equilíbrio para compreender parte da capacidade funcional de cada participante.',
  },
  {
    number: '02',
    title: 'Força muscular',
    lead: 'Um indicador importante de funcionalidade.',
    detail: 'O estudo investiga força e massa muscular, inclusive sinais de sarcopenia, dentro de uma avaliação mais ampla.',
  },
  {
    number: '03',
    title: 'Nutrição',
    lead: 'A saúde também passa pela alimentação.',
    detail: 'Aspectos nutricionais ajudam a compor o retrato de saúde e longevidade das pessoas com 80 anos ou mais.',
  },
  {
    number: '04',
    title: 'Indicadores de saúde',
    lead: 'Informações clínicas e funcionais em conjunto.',
    detail: 'Exames e outros indicadores clínicos e funcionais complementam os dados analisados pela equipe de pesquisa.',
  },
] as const;

export const participationSteps = [
  {
    number: '01',
    title: 'Entre em contato',
    description: 'Informe seu interesse. A equipe conversa com você, confirma os critérios e combina a visita.',
  },
  {
    number: '02',
    title: 'Venha à UCB',
    description: 'A avaliação é presencial no Campus Taguatinga e dura cerca de duas horas. Você pode vir com acompanhante, se precisar.',
  },
  {
    number: '03',
    title: 'Receba a devolutiva',
    description: 'A equipe apresenta os resultados e orientações de saúde. Quando necessário, indica caminhos para acompanhamento.',
  },
] as const;

/** Lista de parceiros informada pelo responsável por este site. */
export const partners = [
  { name: 'UCB', full: 'Universidade Católica de Brasília', url: 'https://ucb2.catolica.edu.br/portal/conheca/institucional/catolica-de-brasilia/' },
  { name: 'Grupo Sabin', full: 'Saúde e medicina diagnóstica', url: 'https://gruposabin.com.br/nosso-ecossistema/' },
  { name: 'CAPES', full: 'Coordenação de Aperfeiçoamento de Pessoal de Nível Superior', url: 'https://www.gov.br/capes/pt-br/acesso-a-informacao/institucional/competencias' },
  { name: 'FAPDF', full: 'Fundação de Apoio à Pesquisa do Distrito Federal', url: 'https://www.fap.df.gov.br/sobre-a-fundacao/' },
] as const;
