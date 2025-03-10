import { test, expect } from '@playwright/test'
import { createColumn, createTodo } from 'e2e/fixtures/helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.evaluate(() => window.localStorage.clear())
})

test('CRUD operations for todos', async ({ page }) => {
  await createTodo(page, 'Test Todo', 'Test Description', 'todo', 'John Doe')

  await expect(page.getByText('Test Todo')).toBeVisible()

  await page.getByTestId('edit-todo-button-Test Todo').click()

  await page.getByTestId('edit-todo-title-input').fill('Updated Todo')
  await page.getByTestId('edit-todo-modal-submit').click()

  await expect(page.getByText('Updated Todo')).toBeVisible()

  await page.getByTestId('delete-todo-button-Updated Todo').click()

  await expect(page.getByText('Updated Todo')).not.toBeVisible()
})

test('COLUMN create delete', async ({ page }) => {
  await createColumn(page, 'Test Column')

  await expect(page.getByText('Test Column')).toBeVisible()

  await page.getByTestId('delete-status-column-button-Test Column').click()

  await expect(page.getByText('Test Column')).not.toBeVisible()
})

test('filter input', async ({ page }) => {
  await createTodo(page, 'Test Todo', 'Test Description', 'todo', 'John Doe')
  await createTodo(page, 'Party time', 'get funky', 'todo', 'John Doe')

  await expect(page.getByText('Test Todo')).toBeVisible()
  await expect(page.getByText('Party time')).toBeVisible()

  await page.getByTestId('filter-input').fill('Test Todo')
  await page.getByTestId('filter-input-submit').click()

  await expect(page.getByText('Test Todo')).toBeVisible()
  await expect(page.getByText('Party time')).not.toBeVisible()

  await page.getByTestId('filter-input').fill('')
  await page.getByTestId('filter-input-submit').click()

  await expect(page.getByText('Test Todo')).toBeVisible()
  await expect(page.getByText('Party time')).toBeVisible()
})

test('drag and drop todo across columns', async ({ page }) => {
  await createColumn(page, 'Uptown')

  await createTodo(page, 'Test Todo', 'Test Description', 'todo', 'John Doe')

  await expect(page.getByText('Test Todo')).toBeVisible()
  await expect(page.getByText('Uptown')).toBeVisible()

  const testTodo = await page.getByText('Test Todo')
  const testTodoBounding = await testTodo.boundingBox()

  await page.mouse.move(
    testTodoBounding!.x + testTodoBounding!.width / 2,
    testTodoBounding!.y + testTodoBounding!.height / 2
  )

  await page.mouse.down()
  await page.waitForTimeout(100)

  const uptownColumn = await page.getByText('Uptown')
  const uptownColumnBounding = await uptownColumn.boundingBox()

  await page.mouse.move(
    uptownColumnBounding!.x + uptownColumnBounding!.width / 2,
    uptownColumnBounding!.y + uptownColumnBounding!.height / 2
  )

  await page.mouse.up()

  await expect(page.getByText('Test Todo')).toBeVisible()

  expect(await page.getByTestId('todo-Uptown-title').first()).toHaveText(
    'Test Todo'
  )
})

test('drag and reorder todos within a column', async ({ page }) => {
  await createTodo(page, 'Test Todo', 'Test Description', 'todo', 'John Doe')

  await expect(page.getByTestId('todo-todo-title').first()).not.toHaveText(
    'Test Todo'
  )

  await expect(page.getByTestId('todo-todo-title').last()).toHaveText(
    'Test Todo'
  )

  const firstTodo = await page.getByTestId('todo-todo-title').first()
  const firstTodoBounding = await firstTodo.boundingBox()

  const lastTodo = await page.getByText('Test Todo')
  const lastTodoBounding = await lastTodo.boundingBox()

  await page.mouse.move(
    lastTodoBounding!.x + lastTodoBounding!.width / 2,
    lastTodoBounding!.y + lastTodoBounding!.height / 2
  )

  await page.mouse.down()
  await page.waitForTimeout(100)

  await page.mouse.move(
    firstTodoBounding!.x + firstTodoBounding!.width / 2,
    firstTodoBounding!.y + firstTodoBounding!.height / 3
  )

  await page.mouse.up()

  await expect(page.getByTestId('todo-todo-title').first()).toHaveText(
    'Test Todo'
  )
})
