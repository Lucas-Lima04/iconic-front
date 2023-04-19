import api from "..";
import { IUser } from "../../models/IUser";

interface IAddUser {
  name: string;
  email: string;
  password: string;
}

export class UserService {

  static async createUser({
    name,
    email,
    password
  }: IAddUser): Promise<IUser> {
    const { data } = await api.post('/users', {
      name,
      email,
      password
    });
    localStorage.setItem('accessToken', data.token);

    return data;
  }

  static async updateUser({
    email,
    name,
  }: IAddUser): Promise<IUser> {
    const { data } = await api.put('/users', {
      name: name,
      email: email,
      
    });

    return data;
  }


  static async findByEmail({
    email,
    hospitalGuid
  }: {
    email: string;
    hospitalGuid: string;
  }): Promise<IUser> {
    const { data } = await api.post('/users/email', {
      email,
      hospitalGuid
    });

    return data;
  }
}
