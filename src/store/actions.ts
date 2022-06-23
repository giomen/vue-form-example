import { container } from "@/shared/container";
import { User } from "@/shared/models/user.model";
import { UsersApiService } from "@/shared/services/users.service";
import { ActionTree } from "vuex";
import { RootState } from "./index";
import { MUTATIONS } from "./mutations";
import {tap} from "rxjs/operators";
import { SessionStorageEnum } from "@/shared/models/storage.enum";

export enum ACTIONS {
  GET_ALL_USERS = 'GET_ALL_USERS'
}

export const actions: ActionTree<RootState, RootState> = {
  [ACTIONS.GET_ALL_USERS]: ({commit}): Promise<User[]> => {
    return container.get(UsersApiService).getUsers().pipe(
      tap((response: User[]) => {
        if(sessionStorage.getItem(SessionStorageEnum.USERS) === null) {
          console.log('sessionStorage empty')
          commit(MUTATIONS.SET_USERS, response)
          sessionStorage.setItem(SessionStorageEnum.USERS, JSON.stringify(response))
        } else {
          commit(MUTATIONS.SET_USERS, JSON.parse(sessionStorage.getItem(SessionStorageEnum.USERS)))
        }
      })
    ).toPromise()
  }
}