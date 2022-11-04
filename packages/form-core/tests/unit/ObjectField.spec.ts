import { mount } from '@vue/test-utils';
import SchemaForm from '../../core';
import { NumberField, StringField } from '../../core/fields';
describe('SchemaForm', () => {
  let schema: any;
  beforeEach(() => {
    schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        age: {
          type: 'number',
        },
      },
    };
  });
  // it('render objectField successFully', async () => {
  //   const wrapper = mount(SchemaForm, {
  //     props: {
  //       schema,
  //       onChange: () => {},
  //       value: {},
  //     },
  //   });
  //   const stringField = wrapper.findComponent(StringField);
  //   const numberField = wrapper.findComponent(NumberField);
  //   expect(stringField.exists()).toBeTruthy();
  //   expect(numberField.exists()).toBeTruthy();
  // });
});
