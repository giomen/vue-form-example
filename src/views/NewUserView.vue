<template>
  <div class="NewUserView">
    <Form :isEditing="true"
          :newForm="true"
          @on-cancel="onCancel()"
          @on-save="onSave($event)"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Form from '@/components/Form/Form.vue'
import { MUTATIONS } from '@/store/mutations'
import { Mutation } from 'vuex-class'
import { User } from '@/shared/models/user.model'

@Component({
  components: {
    Form
  }
})
export default class NewUserView extends Vue {
  @Mutation(MUTATIONS.ADD_USER) addUser: (payload: User) => void
  @Mutation(MUTATIONS.SET_IS_EDITING) setIsEditing: (payload: boolean) => void

  onCancel() {
    this.setIsEditing(false)
  }

  onSave($event: User) {
    this.addUser($event)
    this.setIsEditing(false)
    this.$router.push('/')
  }

  unmounted() {
    this.setIsEditing(false)
  }
}
</script>
<style lang="scss" scoped>
@import "@owui/theme-product/theme";
</style>