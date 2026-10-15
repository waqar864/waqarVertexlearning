import { defineType, defineField, defineArrayMember } from 'sanity'
import { PlayIcon } from '@sanity/icons'
import { portableTextConfig } from './shared/portableTextConfig'

export const lesson = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  icon: PlayIcon,
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
      name: 'videoUrl',
      type: 'url',
      title: 'Video URL',
      description: 'Supported providers: YouTube, Vimeo, Bunny',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'poster',
      type: 'image',
      title: 'Poster/Thumbnail',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'duration',
      type: 'number',
      title: 'Duration (seconds)',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'freePreview',
      type: 'boolean',
      title: 'Free Preview',
      description: 'Allow non-enrolled learners to watch this lesson',
      initialValue: false,
    }),
    defineField({
      name: 'studentCount',
      type: 'number',
      title: 'Student Count',
      description: 'Number of students who have taken this lesson (for display)',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'notes',
      type: 'array',
      title: 'Lesson Notes',
      ...portableTextConfig,
    }),
    defineField({
      name: 'keyPoints',
      type: 'array',
      title: 'Key Points',
      description: 'List of key takeaways from this lesson',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'proTip',
      type: 'text',
      title: 'Pro Tip',
      rows: 3,
    }),
    defineField({
      name: 'resources',
      type: 'array',
      title: 'Resources',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              type: 'string',
              title: 'Type',
              options: {
                list: [
                  { title: 'Article', value: 'article' },
                  { title: 'Documentation', value: 'documentation' },
                  { title: 'Video', value: 'video' },
                  { title: 'Code Repository', value: 'code' },
                  { title: 'Tool', value: 'tool' },
                  { title: 'Other', value: 'other' },
                ],
              },
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
            defineField({
              name: 'url',
              type: 'url',
              title: 'URL',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'type',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'poster',
      duration: 'duration',
    },
    prepare({ title, media, duration }) {
      const minutes = duration ? Math.floor(duration / 60) : 0
      return {
        title,
        media,
        subtitle: duration ? `${minutes} min` : undefined,
      }
    },
  },
})
