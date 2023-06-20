import UserApi from 'src/app/User';
import { User } from 'src/types';
import { computed, ComputedRef, ref } from 'vue';

const users = ref<User[]>([]);
export interface UseUsers {
  users: ComputedRef<User[]>;
  createNewUser: (data: User) => Promise<void>;
  deleteUser: (id: number) => Promise<{message: string}>;
  getUser: (id: number) => Promise<User>;
  getAllUsers: () => Promise<User[]>;
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

  const deleteUser = async (id: number) => {
    try {
      return UserApi.deleteUser(id)
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
  };

  const getUser = async (id: number) => {
    try {
      return await UserApi.getUser(id);
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
  };

  const getAllUsers = async () => {
    try {
      const resp = await UserApi.getAllUsers();
      users.value = resp.data;
      return resp.data; 
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
