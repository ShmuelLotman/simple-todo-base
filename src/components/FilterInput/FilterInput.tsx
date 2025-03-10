import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useStore } from '@/store'
import { FilterInputContainer, FilterInputSubmit, StyledInput } from './style'
import { Magnifying } from '@/svgs/Magnifying'

export function FilterInput() {
  const setFilterText = useStore((state) => state.setFilterText)
  const FormSchema = z.object({
    filterText: z.string().nullable(),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      filterText: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFilterText(data.filterText?.toLowerCase() ?? '')
  }

  return (
    <FilterInputContainer>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FilterInputSubmit type="submit">
            <Magnifying />
          </FilterInputSubmit>
          <FormField
            control={form.control}
            name="filterText"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <StyledInput
                    placeholder="Search..."
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </FilterInputContainer>
  )
}
