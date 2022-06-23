import { SessionStorageEnum } from '@/shared/models/storage.enum';
import { User } from '@/shared/models/user.model';
import { MutationTree } from 'vuex';
import { RootState } from './index';
import { uuid } from 'uuidv4';

export enum MUTATIONS {
  SET_USERS = 'SET_USERS',
  DELETE_USER = 'DELETE_USER',
  SET_IS_EDITING = 'SET_IS_EDITING',
  SET_IS_USER_EDITED = 'SET_IS_USER_EDITED',
  SET_ACTIVE_USER = 'SET_ACTIVE_USER',
  UPDATE_USER = 'UPDATE_USER',
  ADD_USER = 'ADD_USER',
}

export const initialState: () => RootState = () => ({
  users: [],
  isEditing: false,
  activeUser: null,
})

export const mutations: MutationTree<RootState> = {
  [MUTATIONS.SET_USERS]: (state: RootState, payload: User[]) =>
    state.users = payload.map((user: User) => ({...user, edited: !!user.edited ? user.edited : false})),
  [MUTATIONS.DELETE_USER]: (state: RootState, payload: number) => {
    state.users = state.users.filter((item: User) => item.id !== payload)
    sessionStorage.setItem(SessionStorageEnum.USERS, JSON.stringify(state.users))
  },
  [MUTATIONS.SET_IS_EDITING]: (state: RootState, payload: boolean) => state.isEditing = payload,
  [MUTATIONS.ADD_USER]: (state: RootState, payload: User) => {
    /** add 10 only because this fake api return 10 elements, and in a case of adding a new user
     * after deleting some there is a possibility to create a duplicated id */
    const id = state.users.length + 10
    const tempUser = {...payload, id: id}
    state.users = [...state.users, tempUser]
    sessionStorage.setItem(SessionStorageEnum.USERS, JSON.stringify(state.users))
  },
  [MUTATIONS.SET_ACTIVE_USER]: (state: RootState, payload: number) => {
    state.activeUser = payload
    sessionStorage.setItem(SessionStorageEnum.ACTIVE_USER, JSON.stringify(state.activeUser))
  },
  [MUTATIONS.SET_IS_USER_EDITED]: (state: RootState, payload: {id: number, edited: boolean}) =>
    {
      state.users = state.users.map((user: User) => user.id !== payload.id ? user : {...user, edited: payload.edited})
      sessionStorage.setItem(SessionStorageEnum.USERS, JSON.stringify(state.users))
    },
  [MUTATIONS.UPDATE_USER]: (state: RootState, payload: User) =>
    {
      state.users = state.users.map((user: User) => user.id !== payload.id ? user : payload)
      sessionStorage.setItem(SessionStorageEnum.USERS, JSON.stringify(state.users))
      state.isEditing = false
    },
}
