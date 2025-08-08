export default {
  name: 'sobre',
  title: 'Sobre',
  type: 'document',
  fields: [
    {
      name: 'sobre',
      title: 'Sobre (conteudo visível)',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sobreEN',
      title: 'Sobre ENG (conteudo visível)',
      type: 'blockContent',

      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sobreExpandido',
      title: 'Sobre (conteudo expandido)',
      type: 'blockContent',

      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sobreExpandidoEN',
      title: 'Sobre EN (conteudo expandido)',
      type: 'blockContent',

      validation: (Rule) => Rule.required(),
    },
    {
      name: 'biografiaDiana',
      title: 'Biografia Diana',
      type: 'blockContent',

      validation: (Rule) => Rule.required(),
    },
    {
      name: 'biografiaDianaEN',
      title: 'Biografia Diana EN',
      type: 'blockContent',

      validation: (Rule) => Rule.required(),
    },
    {
      name: 'biografiaBernardo',
      title: 'Biografia Bernardo',
      type: 'blockContent',

      validation: (Rule) => Rule.required(),
    },
    {
      name: 'biografiaBernardoEN',
      title: 'Biografia Bernardo EN',
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
            {
              name: 'nome',
              title: 'Nome da Pessoa',
              placeholder: 'ex: "Diana Policarpo"',
              type: 'string',
            },
            {
              name: 'funcao',
              title: 'Função',
              placeholder:
                'ex: "Conceção e direção artística, entrevistas, conteúdos editoriais..."',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'fichatecnicaEN',
      title: 'Ficha Técnica EN',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'nome',
              title: 'Nome da Pessoa',
              placeholder: 'ex: "Diana Policarpo"',
              type: 'string',
            },
            {
              name: 'funcao',
              title: 'Função',
              placeholder: 'ex: "Concept and artistic direction, interviews, editorial content..."',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Sobre',
      }
    },
  },
}
