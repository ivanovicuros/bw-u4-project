const request = require('supertest')
const server = require('./server')
const db = require('../api/data/db-config')

test('sanity', () => {
    expect(true).toBe(true)
  })

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})


describe('POST api/auth', () => {
    test('returns an error if username/password is missing or already in use', async () => {
        const res = await request(server).post('/api/auth/register')
        expect(res.body.message).toMatch(/username and password required/i)
    })
   
})