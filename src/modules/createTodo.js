export const createTodo = ({
  title = 'Todo Item',
  description = 'Description',
  dueDate = undefined,
  priority = 'medium',
  notes = undefined,
  checklist = undefined,
  project = undefined
} = {}) => ({
  title,
  description,
  dueDate,
  priority,
  notes,
  checklist,
  project
})
