import { IUser } from "./IUser";

export interface IPost {
    path: string;
    createdAt: string;
    userGuid: string;
    user: IUser;
}