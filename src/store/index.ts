import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { getters } from './getters'
import { initialState, mutations } from './mutations'
import { User } from '../shared/models/user.model';
import { actions } from './actions';

Vue.use(Vuex)

export interface RootState {
  users: User[],
  isEditing: boolean,
  activeUser: number,
}

const store: StoreOptions<RootState> = {
  state () {
    return initialState()
  },
  getters,
  mutations,
  actions,
  modules: {}
}

export default new Vuex.Store<RootState>(store)
