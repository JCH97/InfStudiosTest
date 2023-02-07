import {UserRol} from "../enums/user.rol";
import {Domain} from "../../../shared/domain/domain.abstract";
import {Result} from "../../../shared/domain/result";
import * as jwt from 'jsonwebtoken';
import {UserPassword} from "../value-objects/user.password";
import {JWTClaims, JWTToken} from "../value-objects/token.value-object";
import {AppError} from "../../../shared/domain/errors/app.error";

type UserProps = {
    _id?: string;
    name: string;
    lastName: string;
    email: string;
    password: UserPassword;
    rol: UserRol;
    createdAt: Date;
    updatedAt: Date;
};

export type NewUserProps = Omit<UserProps, '_id' | 'createdAt' | 'updatedAt' | 'password'> & {
    password: string;
}

export class User extends Domain<UserProps> {
    get _id(): string {
        return this.props._id;
    }

    get name(): string {
        return this.props.name;
    }

    get lastName(): string {
        return this.props.lastName;
    }

    get email(): string {
        return this.props.email;
    }

    get password(): UserPassword {
        return this.props.password;
    }

    get rol(): UserRol {
        return this.props.rol;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    public static async new(
        props: NewUserProps,
    ): Promise<Result<User>> {

        let password = await UserPassword.createFromPlain({value: props.password});
        if (!password.isSuccess)
            return Result.Fail<User>(password.error);

        return this.create({
            ...props,
            password: password.getValue(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    public static create(props: UserProps): Result<User> {
        const u = new User(props);
        return Result.Ok(u);
    }

    updateRol() {
        this.props.rol = UserRol.ADMIN;
    }

    async getUserToken(
        plainPass: string,
        secret: string,
        expiresIn: string
    ): Promise<Result<JWTToken, AppError.ValidationError>> {

        const jwtClaims: JWTClaims = {
            _id: this.props._id,
            email: this.props.email,
            role: this.props.rol
        };

        const token = await jwt.sign(
            jwtClaims,
            secret,
            {
                expiresIn
            },
        );

        return Result.Ok(token);
    }
}


