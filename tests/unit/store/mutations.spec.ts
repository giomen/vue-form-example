import { SessionStorageEnum } from '@/shared/models/storage.enum';
import { UsersStateStubFactory, UserStubFactory } from '@/shared/store.spec.stub';
import { initialState, mutations, MUTATIONS } from '@/store/mutations';
import { RootState } from '../../../src/store/index';
import { Wrapper } from '@vue/test-utils';

describe('mutations', () => {
  let state: RootState

  beforeEach(() => {
    state = {
      ...initialState(),
    };
  });

  it('should test SET_USERS', () => {
    const payload = UsersStateStubFactory()
    mutations[MUTATIONS.SET_USERS](state, payload)
    expect(state.users).toEqual(payload)
  })

  it('should test DELETE_USER', () => {
    const payload = 1
    mutations[MUTATIONS.DELETE_USER](state, payload)
    expect(state.users).toEqual([])
  })

  it('should test SET_IS_EDITING', () => {
    const payload = true
    mutations[MUTATIONS.SET_IS_EDITING](state, payload)
    expect(state.isEditing).toEqual(payload)
  })

  it('should test ADD_USER', () => {
    const payload = UserStubFactory()
    mutations[MUTATIONS.ADD_USER](state, payload)
    expect(state.users).toEqual([{...payload, id: 10}])
  })
  
  it('should test SET_ACTIVE_USER', async () => {
    const payload = 1
    mutations[MUTATIONS.SET_ACTIVE_USER](state, payload)
    expect(state.activeUser).toEqual(payload)
    expect(sessionStorage.getItem(SessionStorageEnum.ACTIVE_USER)).toEqual(JSON.stringify(payload))
  })

    it('should test SET_IS_USER_EDITED', () => {
      const userPayload = UserStubFactory()
      mutations[MUTATIONS.ADD_USER](state, userPayload)

      const payload = {id: 10, edited: true}
      mutations[MUTATIONS.SET_IS_USER_EDITED](state, payload)

      const user = state.users.find(user => user.id === payload.id)
      expect(user.edited).toEqual(payload.edited)
    })

    it('should test UPDATE_USER', () => {
      const userPayload = UserStubFactory()
      mutations[MUTATIONS.ADD_USER](state, userPayload)

      const payload = {...UserStubFactory(), id: 10, edited: true}
      mutations[MUTATIONS.UPDATE_USER](state, payload)

      const user = state.users.find(user => user.id === payload.id)
      expect(user.edited).toEqual(payload.edited)
    })
})
