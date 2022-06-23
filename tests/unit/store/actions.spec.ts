import { container } from "@/shared/container";
import { UsersApiService } from "@/shared/services/users.service";
import store, { RootState } from "@/store";
import { actions, ACTIONS } from "@/store/actions";
import { StateStubFactory, UsersStateStubFactory } from "@/shared/store.spec.stub";
import { userApiServiceStub } from "@/shared/user-api-service.spec.stub";
import { ActionContext } from "vuex";
import { MUTATIONS } from "@/store/mutations";
import { SessionStorageEnum } from "@/shared/models/storage.enum";

describe('actions', () => {
  let context: Partial<ActionContext<RootState, RootState>>;

  beforeEach(() => {
    container.snapshot();
    container.unbindAll();
    container.bind<any>(UsersApiService).toConstantValue(userApiServiceStub);
    context = {
      state: {
        ...StateStubFactory() as RootState
      },
      commit: jest.fn(),
      dispatch: jest.fn().mockResolvedValue(undefined),
    }
  })

  afterEach(() => {
    container.restore();
  });

  it('Should retrieve users', async () => {
    await (actions[ACTIONS.GET_ALL_USERS] as any)(context)
    expect(userApiServiceStub.getUsers).toHaveBeenCalled()
    expect(context.commit).toHaveBeenCalledWith(MUTATIONS.SET_USERS, UsersStateStubFactory())
    expect(sessionStorage.getItem(SessionStorageEnum.USERS)).toStrictEqual(JSON.stringify(UsersStateStubFactory()))
  })
})