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
          placeholder: 'ex: 17h',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'fim',
          title: 'Hora de Fim',
          type: 'string',
          placeholder: 'ex: 19h',
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
      type: 'string',
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
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'thumbnail',
      title: 'Imagem de Capa',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'descricao',
      title: 'Texto Descritivo',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
  ],
}
