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
      name: 'descricaoMini',
      title: 'Texto Descritivo (Short)',
      type: 'blockContent',

      validation: (Rule) => Rule.required(),
    },
    {
      name: 'descricaoMiniEN',
      title: 'Texto DescritivoEN',
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
