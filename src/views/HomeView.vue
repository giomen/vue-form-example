<template>
  <div class="Home">
    <CardList/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CardList from '@/components/CardList/CardList.vue'
import { Action } from 'vuex-class'
import {ACTIONS} from '@/store/actions'
import { User } from '@/shared/models/user.model'

@Component({
  components: {
    CardList
  }
})
export default class HomeView extends Vue {
  @Action(ACTIONS.GET_ALL_USERS) getAllUsers: () => Promise<User[]>

  created() {
    this.getAllUsers().then().catch(e => console.log('error: ', e))
  }
}
</script>
<style lang="scss" scoped>
@import "@owui/theme-product/theme";
</style>
