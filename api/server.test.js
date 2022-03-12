/* eslint-disable no-undef */
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

describe('POST api/auth/register', () => {
    test('returns an error if username/password is missing or already in use', async () => {
        const res = await request(server).post('/api/auth/register')
        expect(res.body.message).toMatch(/username and password required/i)
        await request(server).post('/api/auth/register').send({username: 'bugsy', password:'1234'})
        const newUser = await request(server).post('/api/auth/register').send({username: 'bugsy', password:'1234'})
        expect(newUser.body.message).toMatch(/username taken/i)
    })
    test('returns newly registered user', async () => {
        const res = await request(server).post('/api/auth/register').send({username: 'bugsy', password:'1234'})
        expect(res.body.username).toBe('bugsy')
    })
})

describe('POST api/auth/login', () => {
    test('returns an error if username/password is missing or invalid', async () => {
        const res = await request(server).post('/api/auth/login')
        expect(res.body.message).toBe('username and password required')
        await request(server).post('/api/auth/register').send({username: 'mitch', password:'1234'})
        const newUser = await request(server).post('/api/auth/login').send({username: 'mitch', password:'134'})
        expect(newUser.body.message).toMatch(/invalid credentials/i)
    })
    test('returns welcome message if user successfully login', async () => {
        await request(server).post('/api/auth/register').send({username: 'mitch', password:'1234'})
        const res = await request(server).post('/api/auth/login').send({username: 'mitch', password:'1234'})
        expect(res.body.message).toMatch(/welcome back/i)
    })
})

describe('GET api/recipes', () => {
    test('returns request denied if user is not logged in', async () =>{
        const res = await request(server).get('/api/recipes')
        expect(res.body.message).toMatch(/request denied, please login/i)
    })
    test('returns an array with all recipes when the logged in user send the request', async () =>{
        await request(server).post('/api/auth/register').send({username: 'chicha', password:'1234'})
        let res = await request(server).post('/api/auth/login').send({username: 'chicha', password:'1234'})
        res = await request(server).get('/api/recipes').set('Authorization', res.body.token)
        expect(res.body).toBeInstanceOf(Array)

    })
})