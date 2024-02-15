import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create-and-authenticate-user'

describe('Search Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })
    
    it('should be able to create gym', async () => {
        const { token } = await createAndAuthenticateUser(app)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Exata',
                description: 'Description',
                phone: '1111111112',
                latitude: -27.2092052,
                longitude: -49.6401091,
        })

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Smart fit',
                description: 'Description',
                phone: '1111111112',
                latitude: -27.2092052,
                longitude: -49.6401091,
        })

        const response = await request(app.server)
            .get('/gyms/search')
            .query({
                query: 'Exata'
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'Exata'
            })
        ])
    })
})