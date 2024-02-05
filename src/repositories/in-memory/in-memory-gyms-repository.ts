import { Gym, Prisma } from "@prisma/client"
import { GymsRepository } from "../gyms-repository"
import { randomUUID } from "crypto"

export class InMemoryGymsRepository implements GymsRepository {
    public items: Gym[] = []

    async findById(id: string) {
        const gym = this.items.find((item) => item.id === id)

        if (!gym) {
            return null
        }

        return gym
    }
}