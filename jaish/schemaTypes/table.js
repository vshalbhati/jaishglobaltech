import { defineType} from 'sanity'

export default defineType({
    name: 'table',
    title: 'Table',
    type: 'document',
    fields: [
      {
        name: 'Title',
        title: 'Table ka Title',
        type: 'string',
      },
      {
        name: 'header',
        title: 'Headers',
        type: 'array',
        of: [{ type: 'string' }],
        validation: Rule => Rule.required().min(1)
      },
      {
        name: 'row',
        title: 'Rows',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'cells',
                title: 'Cells',
                type: 'array',
                of: [{ type: 'text' }],
                validation: Rule => Rule.required().min(1)
              }
            ]
          }
        ]
      }
    ]
  }
)