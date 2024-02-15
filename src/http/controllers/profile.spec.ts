import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })
    
    it('should be able to authenticate', async () => {
        await request(app.server).post('/users').send({
            name: 'Luli',
            email: 'luiza@gmail.com',
            password: '123456'
        })

        const authResponse = await request(app.server).post('/sessions').send({
            email: 'luiza@gmail.com',
            password: '123456'
        })

        const { token } = authResponse.body

        const profileResponse = await request(app.server)
            .get('/me')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.body.user).toEqual(
            expect.objectContaining({
                email: 'luiza@gmail.com'
            })
        )
    })
})