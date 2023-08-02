import { test } from '@japa/runner'

test.group('RoutesApplication', () => {

  test('display welcome page', async ({ client }) => {
    const response = await client.get('/')

    response.assertStatus(200)
    response.assertBodyContains({ message: 'Fullstack Challenge 🏅 - Space X API' })
  })

  test('GET /launches and return code 200', async ({ client }) => {
    const response = await client.get('/launches')
    response.assertStatus(200)
  })

  test('GET /launches with invalid "page" parameter and return code 400', async ({ client }) => {
    const response = await client.get('/launches?page=invalid')
    response.assertStatus(400)
    response.assertBodyContains({ message: 'Invalid input parameters. The "page" parameter must be a valid integer.' })
  })

  test('GET /launches with invalid "perPage" parameter and return code 400', async ({ client }) => {
    const response = await client.get('/launches?perPage=invalid')
    response.assertStatus(400)
    response.assertBodyContains({ message: 'Invalid input parameters. The "perPage" parameter must be a valid integer.' })
  })

  test('GET /launches/stats and return code 200', async ({ client }) => {
    const response = await client.get('/launches/stats')
    response.assertStatus(200)
  })
})
