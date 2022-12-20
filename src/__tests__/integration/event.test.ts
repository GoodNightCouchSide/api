import { BAD_REQUEST, CREATED, NOT_FOUND } from 'http-status'
import supertest from 'supertest'
import createServer from '../../server'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import eventFixtures from '../fixtures/event.fixtures'

const app = createServer()

describe('event', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  })
  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })
  describe('get event route', () => {
    describe('given the event id does not exist', () => {
      it('should return a 404', async () => {
        const eventId = new mongoose.Types.ObjectId()
        await supertest(app).get(`/v1/event/${eventId}`).expect(NOT_FOUND)
      })
    })
    describe('given the event id that exist', () => {
      it('should return a 200', async () => {
        const eventId = new mongoose.Types.ObjectId()
        await supertest(app).get(`/v1/event/${eventId}`).expect(NOT_FOUND)
      })
    })
  })

  describe('create event route', () => {
    describe('given event body to create a new event', () => {
      it('should return a 201 created status', async () => {
        const fakeEvent = eventFixtures.generateFakeEvents(1)[0]
        const { statusCode, body } = await supertest(app).post('/v1/event').send(fakeEvent)
        expect(statusCode).toBe(CREATED)
        expect(body).toEqual({
          ...fakeEvent,
          _id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0
        })
      })
    })
    describe('given a wrong event body to create a new event', () => {
      it('should return a 400 bad request for wrong name type', async () => {
        const wrongEvent = {
          name: true
        }
        const { statusCode } = await supertest(app).post('/v1/event').send(wrongEvent)
        expect(statusCode).toBe(BAD_REQUEST)
      })
    })
  })
})
