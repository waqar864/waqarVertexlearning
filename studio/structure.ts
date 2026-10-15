import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Courses')
        .schemaType('course')
        .child(S.documentTypeList('course')),
      S.listItem()
        .title('Lessons')
        .schemaType('lesson')
        .child(S.documentTypeList('lesson')),
      S.listItem()
        .title('Instructors')
        .schemaType('instructor')
        .child(S.documentTypeList('instructor')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category')),
      S.divider(),
      S.listItem()
        .title('System')
        .child(
          S.list()
            .title('System Documents')
            .items([
              S.listItem()
                .title('Videos')
                .schemaType('video')
                .child(S.documentTypeList('video')),
              S.listItem()
                .title('Progress')
                .schemaType('progress')
                .child(S.documentTypeList('progress')),
            ])
        ),
    ])
