import { defineType, defineField, defineArrayMember } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  icon: PlayIcon,
  description: 'Internal video documents with transcripts and chapters (built by ingestion pipeline)',
  fields: [
    defineField({
      name: 'url',
      type: 'string',
      title: 'Video URL',
      description: 'Original video URL (used as source for document ID)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'chapters',
      type: 'array',
      title: 'Chapters (Table of Contents)',
      description: 'Chapter markers with timestamps',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'startSeconds',
              type: 'number',
              title: 'Start (seconds)',
              validation: (Rule) => Rule.required().min(0).integer(),
            }),
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              startSeconds: 'startSeconds',
              label: 'label',
            },
            prepare({ startSeconds, label }) {
              const minutes = Math.floor(startSeconds / 60)
              const seconds = startSeconds % 60
              return {
                title: label,
                subtitle: `${minutes}:${seconds.toString().padStart(2, '0')}`,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'chunks',
      type: 'array',
      title: 'Transcript Chunks',
      description: 'Transcript split into timestamped pieces',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'startSeconds',
              type: 'number',
              title: 'Start (seconds)',
              validation: (Rule) => Rule.required().min(0).integer(),
            }),
            defineField({
              name: 'text',
              type: 'text',
              title: 'Text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              startSeconds: 'startSeconds',
              text: 'text',
            },
            prepare({ startSeconds, text }) {
              const minutes = Math.floor(startSeconds / 60)
              const seconds = startSeconds % 60
              return {
                title: `${minutes}:${seconds.toString().padStart(2, '0')}`,
                subtitle: text.substring(0, 60) + (text.length > 60 ? '...' : ''),
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      url: 'url',
      chapterCount: 'chapters',
    },
    prepare({ url, chapterCount }) {
      return {
        title: url,
        subtitle: chapterCount ? `${chapterCount.length} chapters` : 'No chapters',
      }
    },
  },
})
