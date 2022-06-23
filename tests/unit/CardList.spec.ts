import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils'
import {Store} from 'vuex-mock-store';
import CardList from '@/components/CardList/CardList.vue'
import EntityRow from '@/components/EntityRow/EntityRow.vue'
import { initialState, MUTATIONS } from '@/store/mutations';
import { GETTERS } from '@/store/getters';
import { PagesType } from '@/shared/models/pages.enum';

const localVue = createLocalVue();

const store = new Store({
  state: initialState(),
  getters: {
    [GETTERS.GET_ALL_USERS]: [{
      id: 0,
      name: '',
      username: '',
      email: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: ''
        }
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
      edited: false
    }],
  },
  spy: {
    create: () => jest.fn(() => Promise.resolve()),
  },
});

describe('CardList.vue', () => {
  let wrapper: Wrapper<CardList>;

  beforeEach(() => {
    wrapper = shallowMount(CardList, {
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

  it('Should not display CardList__edited', async () => {
    const elem = wrapper.find('.CardList__edited')
    expect(elem.exists()).toBeFalsy();
    store.getters[GETTERS.GET_ALL_USERS] = [{
      id: 0,
      name: '',
      username: '',
      email: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: ''
        }
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
      edited: true
    }]

    await wrapper.vm.$nextTick()

    const elem2 = wrapper.find('.CardList__edited')
    expect(elem2.exists()).toBeTruthy();
  })

  it('Should create the EntityRow component', () => {
    const entityRow = wrapper.findComponent(EntityRow)
    expect(entityRow.exists()).toBeTruthy();
  })

  it('Should click onDetails', async () => {
    const elem = wrapper.find('.CardList__cta--details')
    elem.trigger('click')
    await wrapper.vm.$nextTick();
    expect(store.commit).toHaveBeenCalledWith(
      MUTATIONS.SET_ACTIVE_USER, 0
    )
    expect((wrapper.vm as any).$router.push).toBeCalledWith(`/${PagesType.DETAILS}`);
  })

  it('Should click onDelete', async () => {
    const elem = wrapper.find('.CardList__cta--delete')
    elem.trigger('click')
    await wrapper.vm.$nextTick();
    expect(store.commit).toHaveBeenCalledWith(
      MUTATIONS.DELETE_USER, 0
    )
  })
})
