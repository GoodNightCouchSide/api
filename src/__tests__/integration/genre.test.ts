import { OK } from 'http-status'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import supertest from 'supertest'
import createServer from '../../server'
import paginateFixtures from '../fixtures/paginate.fixtures'

const app = createServer()

describe.only('genre', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  })
  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })
  describe('get one genre route', () => {
    describe('given a genre name that exist', () => {
      it('should return 200', async () => {
        const genreResponse = await supertest(app).post('/v1/seeding/genre')
        const genre = genreResponse.body[0]
        const { statusCode, body } = await supertest(app).get(`/v1/genre?name=${genre.name}`)
        expect(statusCode).toBe(OK)
        expect(body).toEqual(paginateFixtures.getPaginateResult([genre]))
      })
    })
  })
})
