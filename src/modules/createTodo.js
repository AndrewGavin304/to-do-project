import { v4 as uuidv4 } from 'uuid';

export const createTodo = ({
  title = 'Todo Item',
  description = undefined,
  dueDate = undefined,
  priority = 'medium',
  notes = undefined,
  checked = false,
  project = undefined,
  uuid = uuidv4()
} = {}) => ({
  title,
  description,
  dueDate,
  priority,
  notes,
  checked,
  project,
  uuid
})
