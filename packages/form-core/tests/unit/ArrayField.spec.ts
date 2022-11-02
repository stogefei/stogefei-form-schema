import { mount } from '@vue/test-utils';
import SchemaForm from '../../core';
import { NumberField, StringField, ArrayField } from '../../core/fields';
import selection from '../../core/widgets/selection';
describe('ArrayField', () => {
  const schema = {
    type: 'array',
    items: [
      {
        type: 'string',
      },
      {
        type: 'number',
      },
    ],
  };
  it('render multiType successFully', async () => {
    const wrapper = mount(SchemaForm, {
      props: {
        schema,
        onChange: () => {},
        value: {},
      },
    });
    const arrFiled = wrapper.findComponent(ArrayField);
    const stringField = arrFiled.findComponent(StringField);
    const numberField = arrFiled.findComponent(NumberField);
    expect(stringField.exists()).toBeTruthy();
    expect(numberField.exists()).toBeTruthy();
  });

  it('render single successFully', async () => {
    const wrapper = mount(SchemaForm, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'number',
          },
        },
        onChange: () => {},
        value: [1, 2],
      },
    });
    const arrFiled = wrapper.findComponent(ArrayField);
    // const stringField = arrFiled.findAllComponents(StringField);
    const numberField = arrFiled.findAllComponents(NumberField);
    expect(numberField.length).toBe(2);
    // expect(stringField.length).toBe(2);
  });
  it('render arraySelectFields successFully', async () => {
    const wrapper = mount(SchemaForm, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'number',
            enum: ['1', '2', '3'],
          },
        },
        onChange: () => {},
        value: [],
      },
    });
    const arrFiled = wrapper.findComponent(ArrayField);
    const select = arrFiled.findComponent(selection);
    expect(select.exists()).toBeTruthy();
  });
});
