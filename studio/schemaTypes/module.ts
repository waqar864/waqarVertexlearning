import { defineType, defineField, defineArrayMember } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export const module = defineType({
  name: 'module',
  title: 'Module',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      title: 'Summary',
      rows: 3,
    }),
    defineField({
      name: 'lessons',
      type: 'array',
      title: 'Lessons',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'lesson' }],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'summary',
    },
  },
})
