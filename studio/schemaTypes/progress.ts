import { defineType, defineField, defineArrayMember } from 'sanity'
import { ActivityIcon } from '@sanity/icons'

export const progress = defineType({
  name: 'progress',
  title: 'Progress',
  type: 'document',
  icon: ActivityIcon,
  description: 'Learner progress tracking (written via server routes only)',
  fields: [
    defineField({
      name: 'userId',
      type: 'string',
      title: 'User ID',
      description: 'Clerk user ID',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'completedLessons',
      type: 'array',
      title: 'Completed Lessons',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'lesson' }],
        }),
      ],
    }),
    defineField({
      name: 'positions',
      type: 'array',
      title: 'Video Positions',
      description: 'Resume positions for lessons',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'lesson',
              type: 'reference',
              title: 'Lesson',
              to: [{ type: 'lesson' }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'seconds',
              type: 'number',
              title: 'Position (seconds)',
              validation: (Rule) => Rule.required().min(0).integer(),
            }),
          ],
          preview: {
            select: {
              lessonTitle: 'lesson.title',
              seconds: 'seconds',
            },
            prepare({ lessonTitle, seconds }) {
              const minutes = Math.floor(seconds / 60)
              const secs = seconds % 60
              return {
                title: lessonTitle || 'Unknown lesson',
                subtitle: `${minutes}:${secs.toString().padStart(2, '0')}`,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      userId: 'userId',
      completedCount: 'completedLessons',
    },
    prepare({ userId, completedCount }) {
      return {
        title: `User: ${userId}`,
        subtitle: completedCount ? `${completedCount.length} lessons completed` : 'No progress',
      }
    },
  },
})
