export default {
  name: 'investigacao',
  title: 'Investigação',
  type: 'document',
  fields: [
    {
      name: 'programa',
      title: 'Programa (número)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
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
      name: 'thumbnail',
      title: 'Imagem de Capa',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'imagens',
      title: 'Imagens',
      description: 'Colocar até 10 imagens em formato ".webp", máximo 150 Kb cada.',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        layout: 'grid',
      },
      validation: (Rule) => Rule.max(10),
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
    {
      name: 'archiveAudioUrl',
      title: 'Internet Archive – Audio URL (permalink)',
      type: 'url',
      description: 'Forma: https://archive.org/download/IDENTIFIER/FILENAME (permalink estável)',
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
