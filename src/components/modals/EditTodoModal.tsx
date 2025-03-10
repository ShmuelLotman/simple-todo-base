import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BaseModal } from './BaseModal'
import { useStore } from '@/store'
import { useShallow } from 'zustand/shallow'
import { v4 as uuidv4 } from 'uuid'
const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
  status: z.string().min(2, {
    message: 'Status must be at least 2 characters.',
  }),
  assignedTo: z.string(),
})
export function EditTodoModal({
  onClose,
  todoId,
}: {
  onClose: () => void
  todoId: string
}) {
  const statuses = useStore((state) => state.currentBoard?.statuses)
  const users = useStore((state) => state.users)
  const updateTodo = useStore((state) => state.updateTodo)
  const todo = useStore(
    useShallow((state) => state.todos.find((todo) => todo.id === todoId))
  )
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: todo!.title,
      description: todo!.description,
      status: todo!.status,
      assignedTo: todo!.assignedTo || '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    updateTodo(todo!.id, {
      ...data,
    })
    onClose()
  }

  return (
    <BaseModal onClose={onClose}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    data-testid="edit-todo-title-input"
                    placeholder="Edit todo title..."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    data-testid="edit-todo-description-input"
                    placeholder="Edit todo description..."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="z-[1009]">
                    {statuses?.map((status) => (
                      <SelectItem
                        data-testid={`edit-todo-status-select-item-${status}`}
                        key={status}
                        value={status}
                      >
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assignedTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned To</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="z-[1009]">
                    {users?.map((user) => (
                      <SelectItem
                        data-testid={`edit-todo-assigned-to-select-item-${user.id}`}
                        key={user.id}
                        value={user.id}
                      >
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button data-testid="edit-todo-modal-submit" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </BaseModal>
  )
}
