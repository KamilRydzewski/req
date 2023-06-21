import UserApi from 'src/app/User';
import { User, BackendTableResponse, BackendTableParams } from 'src/types';
import { computed, ComputedRef, ref } from 'vue';

const users = ref<User[]>([]);
export interface UseUsers {
  users: ComputedRef<User[]>;
  createNewUser: (data: User) => Promise<void>;
  deleteUser: (removingId: number) => Promise<{message: string}>;
  getUser: (id: number) => Promise<User>;
  getAllUsers: (params?: BackendTableParams) => Promise<BackendTableResponse<User[]>>;
  updateUser: (id: number, data: User) => Promise<string>;
}

export const useUsers = (): UseUsers => {
  const createNewUser = async (data: User) => {
    try {
      return UserApi.createUser(data);
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
  };

  const updateUser = async (id = 0, data: User) => {
    try {
      return UserApi.updateUser(id, data);
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
  };

  const deleteUser = async (removingId: number) => {
    try {
      const resp = UserApi.deleteUser(removingId)
      users.value = users.value.filter(
        (user) => user.id != removingId
      );
      return resp;
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
  };

  const getUser = async (id: number) => {
    try {
      const resp =  await UserApi.getUser(id);
      return resp.data
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
  };

  const getAllUsers = async (params?: BackendTableParams) => {
    try {
      const resp = await UserApi.getAllUsers(params);
      users.value = resp.data;
      return resp; 
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
  };



  return {
    createNewUser,
    deleteUser,
    getUser,
    getAllUsers,
    updateUser,
    users: computed<User[]>(() => users.value)
  };
};
