export default {
  name: 'entrevista',
  title: 'Entrevistas',
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
            title: 'Vida Microscópica e Relações de Algas',
            value: 'Vida Microscópica e Relações de Algas',
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
      name: 'imagens',
      title: 'Imagens',
      description: 'Colocar até 6 imagens em formato ".webp", máximo 150 Kb cada.',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        layout: 'grid',
      },
      validation: (Rule) => Rule.max(6),
    },
    {
      name: 'descricao',
      title: 'Texto Descritivo',
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
  orderings: [
    {
      title: 'Ordenar por programa',
      name: 'ordemCre',
      by: [{field: 'programa', direction: 'asc'}],
    },
  ],
}
