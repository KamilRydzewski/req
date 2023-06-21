import AxiosClient from 'src/app/AxiosClient';
import { BackendTableParams, BackendTableResponse, User } from 'src/types';

export default class UserApi {
  public static async getAllUsers(params?: BackendTableParams) {
    return await AxiosClient.get<BackendTableResponse<User[]>>('users', {params});
  }

  public static async getUser(id: string | number) {
    return await AxiosClient.get<{data:User}>(`users/${id}`);
  }

  public static async createUser(data: User) {
    await AxiosClient.post<User, unknown>('users', data);
  }

  public static async updateUser(id: number | string, data: User) {
    return await AxiosClient.put<User, string>(`users/${id}`, data);
  }

  public static async deleteUser(id: number | string) {
    return await AxiosClient.delete<{ message: string }>(`users/${id}`);
  }
}
