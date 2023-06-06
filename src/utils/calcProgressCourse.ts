import { TChapter, TCourse, TLesson } from "@src/types"

export const calcTimeCourse = (chapters: TChapter[]) =>
  chapters
    .map((chapter) =>
      chapter.lessons.reduce(
        (chapterTimeTotal, lesson) =>
          typeof lesson !== "string"
            ? chapterTimeTotal + Number(lesson.duration)
            : 0,
        0
      )
    )
    .reduce(
      (courseTimeTotal, timeChapterTotal) => courseTimeTotal + timeChapterTotal,
      0
    )

export const calcTimeLearned = (
  course: TCourse,
  lessonsLearned: {
    course: string
    lessons: {
      lessonId: string
      status: "done" | "learning"
    }[]
  }[]
) => {
  const allLesson = course.courseChapters.reduce(
    (courseLessons: TLesson[], course) => [...courseLessons, ...course.lessons],
    []
  )
  const allLessonLearned = lessonsLearned.find(
    (courseLearn) => courseLearn.course === course._id
  )?.lessons

  const lessonLearnedTimeTotal = allLesson.reduce(
    (total, lesson) =>
      allLessonLearned?.some(
        (lessonLearned) =>
          lessonLearned.lessonId === lesson._id &&
          lessonLearned.status === "done"
      )
        ? total + Number(lesson.duration)
        : total,
    0
  )

  return lessonLearnedTimeTotal
}
