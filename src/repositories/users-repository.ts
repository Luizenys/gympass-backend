import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findByEmail(email: String): Promise<User | null>
    findById(id: string): Promise<User | null>
}