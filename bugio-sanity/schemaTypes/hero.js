export default {
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    {
      name: 'programa',
      title: 'Programa (número)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    },

    {
      name: 'dataHoraInicio',
      title: 'Data e Hora de Início',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
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
      name: 'descricaoMini',
      title: 'Texto Descritivo (Short)',
      type: 'blockContent',

      validation: (Rule) => Rule.required(),
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
