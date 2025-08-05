export default {
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    
    
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
