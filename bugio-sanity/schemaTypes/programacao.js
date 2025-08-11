export default {
  name: 'programacao',
  title: 'Programação',
  type: 'document',
  fields: [
    {
      name: 'programa',
      title: 'Programa (número)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'data',
      title: 'Data da Entrevista',
      type: 'object',
      fields: [
        {
          name: 'dia',
          title: 'Dia',
          type: 'number',
          placeholder: 'até ao numero 9, colocar o numero zero antes, ex: 09',

          validation: (Rule) => Rule.required().min(2).max(31),
        },
        {
          name: 'mes',
          title: 'Mês (extenso)',
          type: 'string',
          options: {
            list: [
              {title: 'Janeiro', value: 'Janeiro'},
              {title: 'Fevereiro', value: 'Fevereiro'},
              {title: 'Março', value: 'Março'},
              {title: 'Abril', value: 'Abril'},
              {title: 'Maio', value: 'Maio'},
              {title: 'Junho', value: 'Junho'},
              {title: 'Julho', value: 'Julho'},
              {title: 'Agosto', value: 'Agosto'},
              {title: 'Setembro', value: 'Setembro'},
              {title: 'Outubro', value: 'Outubro'},
              {title: 'Novembro', value: 'Novembro'},
              {title: 'Dezembro', value: 'Dezembro'},
            ],
            layout: 'dropdown',
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'ano',
          title: 'Ano',
          type: 'number',
          placeholder: 'ex: 2025',

          validation: (Rule) => Rule.required().min(2025).max(2028),
        },
      ],
    },
    {
      name: 'horario',
      title: 'Horário',
      type: 'object',
      fields: [
        {
          name: 'inicio',
          title: 'Hora de Início',
          type: 'string',
          placeholder: 'ex: 17h00',
          validation: (Rule) => Rule.required(),
        },
      ],
    },

    {
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tituloEN',
      title: 'TítuloEN',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'clusters',
      title: 'Clusters',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {
            title: 'Infraestrutura e Paisagem Cultural',
            value: 'Infraestrutura e Paisagem Cultural',
          },
          {
            title: 'Vida Microscópica e Relações entre Algas',
            value: 'Vida Microscópica e Relações entre Algas',
          },
          {title: 'Forças Climáticas e Atmosféricas', value: 'Forças Climáticas e Atmosféricas'},
          {title: 'Mediadores de Percepção', value: 'Mediadores de Percepção'},
          {title: 'Partículas e Substâncias', value: 'Partículas e Substâncias'},
          {title: 'Fungos e Agentes Simbióticos', value: 'Fungos e Agentes Simbióticos'},
          {title: 'Correntes Políticas e Cívicas', value: 'Correntes Políticas e Cívicas'},
        ],
      },
    },
    {
      name: 'clustersEN',
      title: 'ClustersEN',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {
            title: 'Infrastructure and Cultural Landscape',
            value: 'Infrastructure and Cultural Landscape',
          },
          {
            title: 'Microscopic Life and Algal Relations',
            value: 'Microscopic Life and Algal Relations',
          },
          {title: 'Climate and Atmospheric Forces', value: 'Climate and Atmospheric Forces'},
          {title: 'Perception Mediators ', value: 'Perception Mediators '},
          {title: 'Particles and Substances', value: 'Particles and Substances'},
          {title: 'Fungos e Agentes Simbióticos', value: 'Fungos e Agentes Simbióticos'},
          {title: 'Political and Civic Currents', value: 'Political and Civic Currents'},
        ],
      },
    },
    {
      name: 'clusters2',
      title: 'Entrevista ou Paisagem Sonora',
      type: 'string',
      options: {
        list: [
          {
            title: 'Entrevista',
            value: 'Entrevista',
          },
          {
            title: 'Paisagem Sonora',
            value: 'Paisagem Sonora',
          },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'clusters2_EN',
      title: 'Interview or Soundscape',
      type: 'string',
      options: {
        list: [
          {
            title: 'Interview',
            value: 'Interview',
          },
          {
            title: 'Soundscape',
            value: 'Soundscape',
          },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'imagens',
      title: 'Imagens',
      description: 'Colocar até 3 imagens em formato ".webp", máximo 150 Kb cada.',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        layout: 'grid',
      },
      validation: (Rule) => Rule.max(3),
    },
    {
      name: 'descricao',
      title: 'Texto Descritivo',
      type: 'blockContent',

      validation: (Rule) => Rule.required(),
    },
    {
      name: 'descricaoEN',
      title: 'Texto DescritivoEN',
      type: 'blockContent',

      validation: (Rule) => Rule.required(),
    },
    {
      name: 'fichatecnica',
      title: 'Ficha Técnica',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'titulo', title: 'Título', placeholder: 'ex: "Gravação por:"', type: 'string'},
            {
              name: 'conteudo',
              title: 'Conteúdo',
              placeholder: 'ex: "Bernardo & Diana"',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      programa: 'programa',
      title: 'titulo',
      dia: 'data.dia',
      mes: 'data.mes',
      ano: 'data.ano',
      hora: 'horario.inicio',
      media: 'imagens.0', // pega a primeira imagem do array
    },
    prepare({programa, title, dia, mes, ano, hora, media}) {
      const mapMes = {
        Janeiro: '01',
        Fevereiro: '02',
        Março: '03',
        Abril: '04',
        Maio: '05',
        Junho: '06',
        Julho: '07',
        Agosto: '08',
        Setembro: '09',
        Outubro: '10',
        Novembro: '11',
        Dezembro: '12',
      }
      const pad2 = (n) => String(n ?? '').padStart(2, '0')
      const mm = mapMes[mes] || ''
      const dd = pad2(dia)
      const dateStr = dd && mm && ano ? `${dd}/${mm}/${ano}` : ''
      const subtitle = [dateStr, hora].filter(Boolean).join(' • ')

      return {
        title: programa ? `${programa}. ${title}` : title || 'Sem título',
        subtitle,
        media 
      }
    },
  },

  orderings: [
    {
      title: 'Ordenar por programa',
      name: 'ordemCre',
      by: [{field: 'programa', direction: 'asc'}],
    },
  ],
}
