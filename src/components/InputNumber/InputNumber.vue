<template>
  <div :class="inputTextClass">
    <label class="InputComponent__label" v-if="label">{{ label }}</label>
    <div class="InputComponent__wrapper">
      <input class="InputComponent__input InputComponent__input--number"
             v-if="isNumber"
             type="text"
             v-model="localValue"
             v-cleave="inputConfiguration"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Cleave from 'cleave.js'
import 'cleave.js/dist/addons/cleave-phone.us';
import { ClassMap } from '@/shared/models/classMap.model';

export interface InputCleaveType {
  phone: boolean,
  phoneRegionCode: string
}

const BEM_BLOCK = 'InputComponent';

@Component({
  directives: {
    cleave: {
      componentUpdated: (el, binding) => {
        (el as any).cleave = new Cleave(el, binding.value || {})
      },
      inserted: (el, binding) => {
        (el as any).cleave = new Cleave(el, binding.value || {})
      },
      update: (el) => {
        const event = new Event('.InputComponent__input--number', {bubbles: true});
        setTimeout(function () {
          (el as any).value = (el as any).cleave.properties.result
          el.dispatchEvent(event)
        }, 100);
      }
    }
  }
})
export default class ComponentInput extends Vue {
  @Prop({required: false}) value: string;
  @Prop({type: String, required: false}) name: string;
  @Prop({type: String, required: false}) label: string;
  @Prop({type: String, required: false}) placeholder: string;
  @Prop({type: Boolean, default: false}) readonly: boolean;
  @Prop({type: Boolean, default: false}) isNumber: boolean;
  @Prop({type: Object}) configuration: InputCleaveType;

  /**
   * Compute the input-text class from style
   */
  get inputTextClass(): ClassMap {
    return {
      [`${BEM_BLOCK}`]: true,
      [`${BEM_BLOCK}--readonly`]: this.readonly,
      [`${BEM_BLOCK}--number`]: this.isNumber,
    };
  }

  get inputConfiguration(): Partial<InputCleaveType> {
    return !!this.configuration ? this.configuration : null
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
