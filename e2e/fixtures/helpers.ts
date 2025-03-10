import { Page } from '@playwright/test'

export async function createTodo(
  page: Page,
  title: string,
  description: string,
  status: string,
  assignedTo: string
) {
  await page.getByTestId('add-todo-button').click()
  await page.getByTestId('add-todo-title-input').fill(title)
  await page.getByTestId('add-todo-description-input').fill(description)
  await page.getByLabel('Status').click()
  await page.getByTestId(`add-todo-status-select-item-${status}`).click()
  await page.getByLabel('Assigned To').click()
  await page
    .getByTestId(`add-todo-assigned-to-select-item-${assignedTo}`)
    .click()
  await page.getByTestId('add-todo-modal-submit').click()
}

export async function createColumn(page: Page, name: string) {
  await page.getByTestId('add-column-button').click()
  await page.getByTestId('add-column-input').fill(name)
  await page.getByTestId('add-column-modal-submit').click()
}
