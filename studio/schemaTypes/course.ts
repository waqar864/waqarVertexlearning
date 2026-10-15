import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const course = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      title: 'Summary',
      description: 'Brief description of the course',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'level',
      type: 'string',
      title: 'Level',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price',
      description: 'Price in dollars',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'popular',
      type: 'boolean',
      title: 'Popular',
      description: 'Mark as a popular course',
      initialValue: false,
    }),
    defineField({
      name: 'studentCount',
      type: 'number',
      title: 'Student Count',
      description: 'Number of students enrolled (for display)',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'learningOutcomes',
      type: 'array',
      title: 'Learning Outcomes',
      description: 'What students will learn',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              type: 'string',
              title: 'Icon',
              description: 'Icon name (e.g., "check", "star", "lightbulb")',
            }),
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 2,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'instructor',
      type: 'reference',
      title: 'Instructor',
      to: [{ type: 'instructor' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Category',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modules',
      type: 'array',
      title: 'Modules',
      of: [defineArrayMember({ type: 'module' })],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'summary',
      media: 'coverImage',
      instructorName: 'instructor.name',
    },
    prepare({ title, subtitle, media, instructorName }) {
      return {
        title,
        subtitle: instructorName ? `by ${instructorName}` : subtitle,
        media,
      }
    },
  },
})
