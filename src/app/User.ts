import AxiosClient from 'src/app/AxiosClient';
import { BackendTableResponse, User } from 'src/types';

export default class UserApi {
  public static async getAllUsers() {
    return await AxiosClient.get<BackendTableResponse<User[]>>('users');
  }

  public static async getUser(id: string | number) {
    return await AxiosClient.get<User>(`users/${id}`);
  }

  public static async createUser(data: User) {
    await AxiosClient.post<User, unknown>('register', data);
  }

  public static async updateUser(id: number | string, data: User) {
    return await AxiosClient.put<User, string>(`users/${id}`, data);
  }

  public static async deleteUser(id: number | string) {
    return await AxiosClient.delete<{ message: string }>(`users/${id}`);
  }
}
