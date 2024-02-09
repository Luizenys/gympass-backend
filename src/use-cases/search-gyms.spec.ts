import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { SearchGymsUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsUseCase(gymsRepository)
    })

    it('should be able to search for gyms', async() => {
        await gymsRepository.create({
            title: 'Exata',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091,
        })

        await gymsRepository.create({
            title: 'X Fusion',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091,
        })

        const {gyms} = await sut.execute({
            query: 'Exata',
            page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Exata' }),
        ])
    })

    it('should be able to fetch paginated gyms search', async() => {
        for (let i =1; i <= 22; i++) {
            await gymsRepository.create({
                title: `Exata ${i}`,
                description: null,
                phone: null,
                latitude: -27.2092052,
                longitude: -49.6401091,
            })
        }

        const { gyms } = await sut.execute({
            query: 'Exata',
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Exata 21' }),
            expect.objectContaining({ title: 'Exata 22' })
        ])
    })

})