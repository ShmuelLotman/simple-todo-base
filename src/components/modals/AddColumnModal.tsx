import { useStore } from '@/store'
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

import { BaseModal } from './BaseModal'

const FormSchema = z.object({
  newStatus: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

export function AddColumnModal({ onClose }: { onClose: () => void }) {
  const currentBoard = useStore((state) => state.currentBoard)
  const updateBoard = useStore((state) => state.updateBoard)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newStatus: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    updateBoard(currentBoard!.id, {
      ...currentBoard!,
      statuses: [...currentBoard!.statuses, data.newStatus],
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
            name="newStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add a column:</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </BaseModal>
  )
}
