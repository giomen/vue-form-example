import { SessionStorageEnum } from '@/shared/models/storage.enum'
import { User } from '@/shared/models/user.model'
import { GetterTree } from 'vuex'
import { RootState } from './index'

export enum GETTERS {
  GET_ALL_USERS = 'GET_ALL_USERS',
  GET_SELECTED_USER = 'GET_SELECTED_USER',
  GET_IS_EDITING = 'GET_IS_EDITING',
}

export const getters: GetterTree<RootState, RootState> = {
  [GETTERS.GET_ALL_USERS]: (state: RootState): User[] => state.users,
  [GETTERS.GET_IS_EDITING]: (state: RootState): boolean => state.isEditing,
  [GETTERS.GET_SELECTED_USER]: (state: RootState): User =>
    {
      const tempUsers = state.users.length === 0 ? JSON.parse(sessionStorage.getItem(SessionStorageEnum.USERS)) : state.users
      return tempUsers.find((user: User) =>
      user.id === (JSON.parse(sessionStorage.getItem(SessionStorageEnum.ACTIVE_USER)) ?? state.activeUser))
  },
}
