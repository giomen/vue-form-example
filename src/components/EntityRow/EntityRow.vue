<template>
  <div class="EntityRow">
    <span class="EntityRow__title" ref="title">
      <slot name="title">
        {{ label }}
      </slot>
    </span>
    <span class="EntityRow__subtitle" ref="subtitle">
      <slot name="value">{{ value }}</slot>
    </span>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class EntityRow extends Vue {
  @Prop({type: String, required: false, default: ''}) label: string;
  @Prop({type: String, required: false, default: ''}) value: string;
}
</script>

<style scoped lang="scss">
@import "@owui/theme-product/theme";

.EntityRow {
  display: flex;
  flex-direction: column;
  gap: $gutter * 0.2;
  margin-bottom: $gutter / 2;

  &__title {
    @extend %MicroText;
    word-break: break-word;
    color: $neutral-medium-high;
  }

  &__subtitle {
    @extend %MiniText;
    word-break: break-word;
    color: $neutral-higher;
  }
}
</style>
