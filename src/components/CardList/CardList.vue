<template>
  <div class="CardList">
    <div class="CardList__wrapper" v-for="user in users" :key="user.id">
      <div class="CardList__content">
        <div class="CardList__info">
          <EntityRow :label="'Name'" :value="user.name"/>
          <EntityRow :label="'UserName'" :value="user.username"/>
          <EntityRow :label="'Email'" :value="user.email"/>
        </div>
        <div class="CardList__edited" v-if="user.edited">
          <div class="CardList__editedCircle"></div>
        </div>
      </div>
      <div class="CardList__actions">
        <div class="CardList__cta CardList__cta--details" @click="onDetails(user.id)">Details</div>
        <div class="CardList__cta CardList__cta--delete" @click="onDelete(user.id)">Delete</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PagesType } from '@/shared/models/pages.enum';
import { User } from '@/shared/models/user.model';
import { GETTERS } from '@/store/getters';
import { MUTATIONS } from '@/store/mutations';
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import EntityRow from '@/components/EntityRow/EntityRow.vue';

@Component({
  components: {
    EntityRow
  }
})
export default class CardList extends Vue {
  @Getter(GETTERS.GET_ALL_USERS) getAllUsers: User[];
  @Mutation(MUTATIONS.DELETE_USER) deleteUser: (id: number) => void;
  @Mutation(MUTATIONS.SET_ACTIVE_USER) setActiveUser: (payload: number) => void;

  get users(): User[] {
    return this.getAllUsers
  }

  onDetails(id: number) {
    this.setActiveUser(id)
    this.$router.push(`/${PagesType.DETAILS}`)
  }

  onDelete(id: number) {
    this.deleteUser(id)
  }
}
</script>

<style scoped lang="scss">
@import "@owui/theme-product/theme";
@import "@owui/theme-product/icons";
.CardList {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: $gutter;

  &__wrapper {
    @extend %Widget;
    @extend %WidgetBordered;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
  }

  &__actions {
    margin-top: $gutter;
    display: flex;
    gap: $gutter / 2;
  }

  &__cta {
    @extend %Button;
    @extend %ButtonSmall;
    max-width: 150px;

    &--delete {
      @extend %ButtonDisruptive
    }
  }

  &__content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__editedCircle {
    width: 16px;
    height: 16px;
    display: block;
    background: $mood-warning;
    border-radius: 50%;
  }
}
</style>
