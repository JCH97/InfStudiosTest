import {UserRol} from "../enums/user.rol";

export type JWTClaims = {
    _id: string;
    role: UserRol
};

export type JWTToken = string;
