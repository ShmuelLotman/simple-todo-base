import { test, expect } from '@playwright/test'

test('is able to add a todo', async ({ page }) => {
  await page.goto('http://localhost:3000')

  // Expect a title "to contain" a substring.
  await expect(page.getByTestId('todo-app-header')).toHaveText(
    'Simple Todo App'
  )
})

test('ability to create a todo', async ({ page }) => {
  await page.goto('http://localhost:3000')

  // Click the get started link.
  await page.getByTestId('todo-input').fill('New Todo')
  await page.getByTestId('todo-submit').click()

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText('New Todo')).toBeVisible()

  await page.getByTestId('todo-checkbox').last().click()

  expect(page.getByTestId('todo-checkbox').last()).toBeChecked()

  await page.getByTestId('todo-checkbox').last().click()

  expect(page.getByTestId('todo-checkbox').last()).not.toBeChecked()

  await page.getByTestId('todo-delete').last().click()

  await expect(page.getByText('New Todo')).not.toBeVisible()
})

test('ability to assign a todo to a user', async ({ page }) => {
  await page.goto('http://localhost:3000')

  // Click the get started link.
  await page.getByTestId('todo-input').fill('New Todo')
  await page.getByTestId('todo-assignee-select').selectOption('3')
  await page.getByTestId('todo-submit').click()

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText('New Todo')).toBeVisible()

  await expect(page.getByText('Assigned to: Giannis')).toBeVisible()
  await expect(page.getByTestId('todo-assignee-select')).toHaveValue('')

  await page.getByTestId('todo-delete').last().click()

  await expect(page.getByText('New Todo')).not.toBeVisible()
})
