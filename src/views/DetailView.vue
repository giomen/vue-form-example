<template>
  <div class="DetailsView">
    <Form :isEditing="isEditing"
          :user="user"
          @go-back="onGoBack"
          @on-cancel="onCancel()"
          @on-modify="onModify()"
          @on-save="onSave($event)"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Form from '@/components/Form/Form.vue'
import { Getter, Mutation } from 'vuex-class'
import { GETTERS } from '@/store/getters'
import { User } from '@/shared/models/user.model'
import { MUTATIONS } from '@/store/mutations'

@Component({
  components: {
    Form
  }
})
export default class Details extends Vue {
  @Getter(GETTERS.GET_SELECTED_USER) user: User
  @Getter(GETTERS.GET_IS_EDITING) isEditing: boolean
  @Mutation(MUTATIONS.UPDATE_USER) updateUser: (payload: User) => void
  @Mutation(MUTATIONS.SET_IS_EDITING) setIsEditing: (payload: boolean) => void
  @Mutation(MUTATIONS.SET_IS_USER_EDITED) setIsUserEdited: (payload: {id: number, edited: boolean}) => void

  onGoBack() {
    this.$router.back()
  }

  onModify() {
    this.setIsEditing(true)
  }

  onCancel() {
    this.setIsEditing(false)
  }

  onSave($event: User) {
    this.updateUser($event)
    this.setIsUserEdited({id: $event.id, edited: true})
    this.setIsEditing(false)
  }

  unmounted() {
    this.setIsEditing(false)
  }

}
</script>

<style lang="scss" scoped>
@import "@owui/theme-product/theme";
</style>
