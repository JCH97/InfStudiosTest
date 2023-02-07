import {Body, Controller, Post, Response} from "@nestjs/common";
import {UserCreateUseCase} from "../application/useCases/user.create.use-case";
import {NewUserProps, User} from "../domain/entities/user";
import {ProcessResponse} from "../../shared/presentation/user.response";
import {UserMapper} from "../infra/mappers/user.mapper";

@Controller('user')
export class UserController {

    constructor(private readonly create: UserCreateUseCase) {
    }

    @Post()
    public async createAsync(@Body() user: NewUserProps, @Response() res) {
        const ans = await this.create.execute(user);
        return ProcessResponse.setResponse<User>(res, ans, UserMapper.DomainToDto);
    }
}