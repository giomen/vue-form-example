<template>
  <div class="ActionBar">
      <div class="ActionBar__cta ActionBar__cta--back" @click="goBack()" v-if="!isEditable">Back</div>
      <div class="ActionBar__cta ActionBar__cta--modify" @click="onModify()" v-if="!isEditable">Modify</div>
      <div class="ActionBar__cta ActionBar__cta--save" @click="onSave()" v-if="isEditable">Save</div>
      <div class="ActionBar__cta ActionBar__cta--cancel" @click="onCancel()" v-if="isEditable">Cancel</div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Emit, Vue} from 'vue-property-decorator'
import {ActionBarEventEnum} from './actionBarEventEnum'

@Component
export default class ActionBar extends Vue{
  @Prop({type: Boolean, required: false, default: false}) isEditing: boolean;

  get isEditable() {
    return this.isEditing
  }

  @Emit(ActionBarEventEnum.GO_BACK)
  goBack() {}

  @Emit(ActionBarEventEnum.MODIFY)
  onModify() {}

  @Emit(ActionBarEventEnum.SAVE)
  onSave() {}

  @Emit(ActionBarEventEnum.CANCEL)
  onCancel() {}
}
</script>

<style lang="scss" scoped>
@import "@owui/theme-product/theme";
.ActionBar {

  display: flex;
  gap: $gutter;

  &__cta {
    @extend %Button;
    @extend %ButtonSmall;
    max-width: 150px;

    &--modify {
      @extend %ButtonGhost;
    }

    &--back {
      @extend %ButtonSecondary;
    }

    &--cancel {
      @extend %ButtonGhost;
    }

    &--save {
      @extend %ButtonSuccess;
    }
  }
}
</style>