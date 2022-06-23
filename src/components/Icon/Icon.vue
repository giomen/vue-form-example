<template>
    <div :class="getBoxClass" @click.stop="handleClick">
      <span v-for="pathIndex in svgPaths" :key="pathIndex" :class="getPathClass(pathIndex)"></span>
    </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import {IconSizeType, IconType} from "./models";
import {IconEventType} from './eventEnum'
import {ClassMap} from "@/shared/models/classMap.model";

const BEM_BLOCK = 'Icon';
const ICON_CLASS = 'owicon';

@Component
export default class Icon extends Vue {
  @Prop({type: String, required: true}) icon: string;
  @Prop({type: Number, required: false, default: 0}) iconPaths: number;
  @Prop({type: String, required: false, default: IconType.DEFAULT}) type: IconType;
  @Prop({type: String, required: false, default: IconSizeType.SMALL}) size: IconSizeType;
  @Prop({type: Boolean, required: false, default: false}) disabled: boolean;


  get svgPaths(): number[] {
    if(!!this.iconPaths) {
      let i = 0, svgPaths = [];
      while(i++ < this.iconPaths) svgPaths.push(i);
      return svgPaths;
    }
    return [];
  }

  getPathClass(index: number): string {
    return `path${index}`;
  }

  get getBoxClass(): ClassMap {
    return {
      [BEM_BLOCK]: true,
      [`${ICON_CLASS}-${this.icon}`]: true,
      [`${BEM_BLOCK}--${this.size}`] : true,
      [`${BEM_BLOCK}--${this.type}`] : true,
      [`${BEM_BLOCK}--disabled`] : this.disabled,
    }
  }

  public handleClick($event: HTMLInputElement): void {
    !this.disabled ? this.$emit(IconEventType.ICON_CLICK) : null
  }

}
</script>

<style lang="scss" scoped>
@import "@owui/theme-product/theme";
@import "@owui/theme-product/icons";

  .Icon {
    @extend %IconComponent;

    &--action {
      @extend %IconComponent--action;
    }

    &--danger {
      @extend %IconComponent--danger;
    }

    &--link {
      @extend %IconComponent--link;
    }
    
    &--small {
      @extend %IconComponent--small;
    }

    &--medium {
      @extend %IconComponent--medium;
    }

    &--disabled {
      @extend %IconComponent--disabled;
    }
  }
</style>
