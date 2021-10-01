export interface TodoItemModel {
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
