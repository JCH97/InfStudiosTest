import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {UserPersistence, UserPersistenceSchema} from "./infra/entities/user.persistence";
import {UserRepository} from "./infra/repositories/user.repository";

@Module({
    imports: [
        MongooseModule.forFeature(
            [{name: UserPersistence.name, schema: UserPersistenceSchema}]
        )
    ],
    providers: [
        UserRepository,
    ],
    controllers: [],
})
export class UserModule {
}
