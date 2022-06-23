<template>
  <div class="Form">
    <div class="Form__wrapper">
      <div class="Form__widget">
        <div class="Form__title">Info</div>
        <div class="Form__info">
          <Input :name="'Name'"
                :label="'Name'"
                :value="localForm.name"
                :placeholder="'Add name'"
                @input="setField($event, 'name')"
                :readonly="!isEditable" />
          <Input :name="'Username'"
                :label="'Username'"
                :value="localForm.username"
                :placeholder="'Add username'"
                @input="setField($event, 'username')"
                :readonly="!isEditable" />
          <Input :name="'Email'"
                :label="'Email'"
                :value="localForm.email"
                :placeholder="'Add email'"
                @input="setField($event, 'email')"
                :readonly="!isEditable" />
          <InputNumber :name="'Phone'"
                :is-number="true"
                :label="'Phone Number'"
                :value="localForm.phone"
                :configuration="{phone: true, phoneRegionCode: 'US'}"
                :placeholder="'Add phone number'"
                @input="setField($event, 'phone')"
                :readonly="!isEditable" />
        </div>
      </div>
      <div class="Form__widget">
        <div class="Form__title">Address</div>
        <div class="Form__address">
          <Input :name="'Street'"
                :label="'Street'"
                :value="localForm.address.street"
                :placeholder="'Add street'"
                @input="setAddressField($event, 'street')"
                :readonly="!isEditable" />
          <Input :name="'Suite'"
                :label="'Suite'"
                :value="localForm.address.suite"
                :placeholder="'Add suite'"
                @input="setAddressField($event, 'suite')"
                :readonly="!isEditable" />
          <Input :name="'City'"
                :label="'City'"
                :value="localForm.address.city"
                :placeholder="'Add city'"
                @input="setAddressField($event, 'city')"
                :readonly="!isEditable" />
          <InputNumber :name="'Zipcode'"
                :is-number="true"
                :label="'Zipcode'"
                :value="localForm.address.zipcode"
                :configuration="{delimiter: '-', blocks: [5, 4]}"
                :placeholder="'Add street'"
                @input="setAddressField($event, 'zipcode')"
                :readonly="!isEditable" />
        </div>
      </div>
      <div class="Form__widget">
        <div class="Form__title">Work</div>
        <div class="Form__work">
          <Input :name="'Website'"
                :label="'Website'"
                :value="localForm.website"
                :placeholder="'Add website'"
                @input="setField($event, 'website')"
                :readonly="!isEditable" />
          <Input :name="'Company'"
                :label="'Company'"
                :value="localForm.company.bs"
                :placeholder="'Add company'"
                @input="setField($event, 'company')"
                :readonly="!isEditable" />
        </div>
      </div>
    </div>
    <div class="Form__actions">
      <ActionBar :isEditing="isEditable"
                  @go-back="onGoBack()"
                  @on-modify="onModify()"
                  @on-save="onSave()"
                  @on-cancel="onCancel()" />
    </div>
  </div>
</template>
<script lang="ts">
import ActionBar from '@/components/ActionBar/ActionBar.vue';
import Input from '@/components/Input/Input.vue';
import InputNumber from '@/components/InputNumber/InputNumber.vue';
import { User } from '@/shared/models/user.model';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { FormEventEnum } from './eventEnum';

@Component({
  components: {
    Input,
    InputNumber,
    ActionBar,
  }
})
export default class Form extends Vue {
  @Prop({type: Boolean, required: false, default: false}) newForm: boolean
  @Prop({type: Object, required: false, default: ()=>{}}) user: User
  @Prop({type: Boolean, required: false, default: false}) isEditing: boolean

  originalUser = {} as User;
  localForm = {
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
  } as User;

  created() {
    this.originalUser = Object.freeze(this.activeUser)
    this.originalUser !== undefined && (this.localForm = this.originalUser)
  }

  get activeUser() {
    return this.user
  }

  get isEditable() {
    return this.isEditing
  }

  @Emit(FormEventEnum.GO_BACK)
  onGoBack() {}

  @Emit(FormEventEnum.MODIFY)
  onModify() {}

  @Emit(FormEventEnum.CANCEL)
  onCancel() {
    this.localForm = this.originalUser
  }

  @Emit(FormEventEnum.SAVE)
  onSave() {
    return this.localForm
  }

  setField(value: string, field: string) {
    this.localForm = {
      ...this.localForm,
      [field]: value
    }
    console.log('zip: ', this.localForm)
  }

  setAddressField(value: string, field: string) {
    this.localForm = {
      ...this.localForm,
      address: {
        ...this.localForm.address,
        [field]: value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@owui/theme-product/theme";

.Form {
  &__wrapper{
    display: grid;
    grid-gap: $gutter;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    margin-bottom: $gutter * 2;
  }
  &__title {
    @extend %MiniText;
    text-transform: uppercase;
    color: $neutral-medium;
    margin-bottom: $gutter;
  }

  &__widget {
    @extend %Widget;
    @extend %WidgetBordered;
  }

  &__info,
  &__work,
  &__address,
  &__payment {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    align-items: flex-start;
    grid-template-rows: min-content;
    gap: 8px;
    display: grid;
  }

}
</style>