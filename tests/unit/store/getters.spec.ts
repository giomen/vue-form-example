import { RootState } from '@/store';
import { StateStubFactory, UsersStateStubFactory, UserStubFactory } from '@/shared/store.spec.stub';
import { GETTERS, getters } from '@/store/getters';
import { mutations, MUTATIONS } from '@/store/mutations';

describe('getters', () => {
  let state: RootState;

  beforeEach(() => {
    state = StateStubFactory()
  })

  it('should test GET_ALL_USERS', () => {
    expect(getters[GETTERS.GET_ALL_USERS](state, null, null, null)).toEqual(UsersStateStubFactory())
  })

  it('should test GET_IS_EDITING', () => {
    expect(getters[GETTERS.GET_IS_EDITING](state, null, null, null)).toEqual(false)
  })

  it('should test GET_SELECTED_USER', () => {
    mutations[MUTATIONS.SET_ACTIVE_USER](state, 1)
    const user = {...UserStubFactory(), id: 1}
    expect(getters[GETTERS.GET_SELECTED_USER](state, null, null, null)).toEqual(user)
  })
})