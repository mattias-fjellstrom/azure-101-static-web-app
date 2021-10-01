export interface TodoItem {
  id: string
  title: string
  priority: Priority
  done: boolean
}

export enum Priority {
  Low = 1,
  Medium,
  High,
}

export const sampleData: TodoItem[] = [
  {
    id: "1",
    title: "Wash dishes",
    priority: Priority.Low,
    done: false,
  },
  {
    id: "2",
    title: "Vacuum floor",
    priority: Priority.Medium,
    done: false,
  },
  {
    id: "3",
    title: "Make apple cider",
    priority: Priority.High,
    done: false,
  },
  {
    id: "4",
    title: "Sing a song",
    priority: Priority.Low,
    done: true,
  },
]
