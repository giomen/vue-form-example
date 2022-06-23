<template>
  <div :class="inputTextClass">
    <label class="InputComponent__label" v-if="label">{{ label }}</label>
    <div class="InputComponent__wrapper">
      <input class="InputComponent__input"
             type="text"
             v-model="localValue"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import { ClassMap } from '@/shared/models/classMap.model';

const BEM_BLOCK = 'InputComponent';

@Component
export default class ComponentInput extends Vue {
  @Prop({required: false}) value: string;
  @Prop({type: String, required: false}) name: string;
  @Prop({type: String, required: false}) label: string;
  @Prop({type: String, required: false}) placeholder: string;
  @Prop({type: Boolean, default: false}) readonly: boolean;
  @Prop({type: Boolean, default: false}) isNumber: boolean;

  /**
   * Compute the input-text class from style
   */
  get inputTextClass(): ClassMap {
    return {
      [`${BEM_BLOCK}`]: true,
      [`${BEM_BLOCK}--readonly`]: this.readonly,
    };
  }

  get localValue(): string {
    return (this.value !== null || this.value === undefined) ? this.value : ''
  }

  set localValue(value: string) {
    this.$emit('input', value)
  }

}
</script>

<style lang="scss">
@import "@owui/theme-product/theme";

.InputComponent {
  width: 100%;

  &__label {
    @extend %InputLabel;
    font-weight: 600;
  }

  &__wrapper {
    @extend %InputWrapper;
  }

  &__input {
    @extend %Input;
    min-width: 60px;
    transition: background-color .3s ease;

    &:focus,
    &:focus ~ .InputComponent__icon,
    &:active ~ .InputComponent__icon,
    &:active {
      background-color: lighten($mood-good, 30%);
    }
  }

  &--readonly &__input {
    @extend %InputComponent--readonly
  }
}

</style>
