import { initialState, MUTATIONS } from "@/store/mutations";
import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import { Store } from "vuex-mock-store";
import NewUserView from '@/views/NewUserView.vue'
import Form from '@/components/Form/Form.vue'

const localVue = createLocalVue();

const store = new Store({
  state: initialState(),
  spy: {
    create: () => jest.fn(() => Promise.resolve()),
  },
});


describe('NewUserView.vue', () => {
  let wrapper: Wrapper<NewUserView>;

  beforeEach(() => {
    wrapper = shallowMount(NewUserView, {
      localVue,
      mocks: {
        $store: store,
        $router: {
          push: jest.fn()
        }
      }
    });
  });

  it('Should create the component', () => {
    expect(wrapper.exists()).toBeTruthy();
  })

  it('Should the form component exists', () => {
    const elem = wrapper.findComponent(Form)
    expect(elem.exists()).toBeTruthy();
  })

  it('Should test form cancel event', async () => {
    wrapper.findComponent(Form).vm.$emit('on-cancel')


    expect(store.commit).toHaveBeenCalledWith(
      MUTATIONS.SET_IS_EDITING, false
    )
  })

  it('Should test form save event', async () => {
    wrapper.findComponent(Form).vm.$emit('on-save')
    expect(store.commit).toHaveBeenCalledWith(
      MUTATIONS.SET_IS_EDITING, false
    )

    expect((wrapper.vm as any).$router.push).toBeCalledWith(`/`);
  })
})
