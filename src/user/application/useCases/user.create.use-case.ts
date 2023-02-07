import {Injectable} from "@nestjs/common";
import {Either, left, right} from "../../../shared/domain/either";
import {NewUserProps, User} from "../../domain/entities/user";
import {AppError} from "../../../shared/domain/errors/app.error";
import {Result} from "../../../shared/domain/result";
import {IUseCase} from "../../../shared/domain/interfaces/IUseCase"
import {UserRepository} from "../../infra/repositories/user.repository";
import {UserMapper} from "../../infra/mappers/user.mapper";


export type UserCreateUseCaseResponse = Either<AppError.UnexpectedErrorResult<User>
    | AppError.ValidationErrorResult<User>,
    Result<User>>;


@Injectable()
export class UserCreateUseCase implements IUseCase<NewUserProps, UserCreateUseCaseResponse> {

    constructor(private readonly userRepository: UserRepository) {
    }

    async execute(req: NewUserProps
    ): Promise<UserCreateUseCaseResponse> {

        const user = await User.new(req);

        if (!user.isSuccess)
            return left(Result.Fail(user.error));

        const userCreated = await this
            .userRepository
            .create(UserMapper.DomainToPersist(user.getValue()));


        return right(Result.Ok(user.getValue()));
    }
}