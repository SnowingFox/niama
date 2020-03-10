import { QForm, QInput, QLayout, QPage, QPageContainer } from 'quasar';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Quasar',
  decorators: [withKnobs],
};

export const exampleWithKnobs = () => ({
  components: { QForm, QInput, QLayout, QPage, QPageContainer },
  data: () => ({
    value: '',
  }),
  props: {
    initialValue: {
      defautl: text('Initial Value', 'Yes')
    },
    isDisabled: {
      default: boolean('Disabled', false),
    },
    label: {
      default: text('Label', 'Hello Storybook'),
    },
  },
  template: `<q-layout>
  
  <q-page-container><q-page padding><q-form>
    <q-input outlined v-model="value" :disable="isDisabled" :label="label"></q-input></q-form></q-page>
  </q-page-container></q-layout>`,
});
