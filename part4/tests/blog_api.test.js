require('dotenv').config()

const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.blogs.map(b => new Blog(b))
    const promiseArray = blogObjects.map(b => b.save())

    await Promise.all(promiseArray)
})

describe('blog api test', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })


    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.blogs.length)
    })

    test('blogs should contain id property', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })


    test('a valid blog can be added if likes is missing', async () => {
        const blog = {
            title: 'Missing likes',
            author: 'Bleh',
            url: 'https://SnakeWantsToEat.com/'
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const result = await helper.getAllBlogsInDB()
        expect(result.length).toBe(helper.blogs.length + 1)

        const titles = result.map(n => n.title)
        expect(titles).toContain('Missing likes')
    })


    test('a blog should not be added if contents are missing', async () => {
        const blog = {
            author: 'Squid'
        }

        const response = await api.post('/api/blogs').send(blog)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('content missing')

        const result = await helper.getAllBlogsInDB()
        expect(result.length).toBe(helper.blogs.length)
    })

    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.getAllBlogsInDB()
        const blogToDelete = blogsAtStart[0]

        const response = await api.delete(`/api/blogs/${ blogToDelete.id }`)
        expect(response.status).toBe(204)

        const result = await helper.getAllBlogsInDB()
        expect(result.length).toBe(helper.blogs.length - 1)
    })

    test('a blog likes can be updated', async () => {
        const blogsAtStart = await helper.getAllBlogsInDB()
        const blogToUpdate = blogsAtStart[0]

        const blog = {
            title: 'ARRRRRGHHHH',
            author: 'Optimus Prime',
            url: 'https://help.com/',
            likes: 9999
        }

        const response = await api.put(`/api/blogs/${ blogToUpdate.id }`).send(blog)
        expect(response.status).toBe(200)

        const result = await helper.getAllBlogsInDB()
        expect(result[0].likes).toBe(9999)
    })

    test('a valid blog can be added', async () => {
        const blog = {
            title: 'Hello World',
            author: 'Arsen Bah',
            url: 'https://helloWorld.com/',
            likes: 80
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const result = await helper.getAllBlogsInDB()
        expect(result.length).toBe(helper.blogs.length + 1)

        const titles = result.map(n => n.title)
        expect(titles).toContain('Hello World')
    })
})

afterAll(() => {
    mongoose.connection.close()
})