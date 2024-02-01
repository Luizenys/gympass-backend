import { expect, describe, it } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
    it('should be able to authenticate', async() => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: 'Luli',
            email: 'luli@gmail.com',
            password_hash: await hash('123456',6)
        })

        const { user } = await sut.execute({
            email: 'luli@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async() => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        expect(() => sut.execute({
            email: 'luli@gmail.com',
            password: '123456'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)

    })

    it('should not be able to authenticate with wrong password', async() => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: 'Luli',
            email: 'luli@gmail.com',
            password_hash: await hash('123456',6)
        })

        expect(() => sut.execute({
            email: 'luli@gmail.com',
            password: '999932'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
        
    })
})