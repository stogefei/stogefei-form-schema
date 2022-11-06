import { defineComponent, computed } from 'vue';
// import { Input } from 'ant-design-vue';
import { CustomFormat, CommonWidgetPropsDefine } from '../../core/types';

import { withFormItem } from '../../core/theme-default/FormItem';

const format: CustomFormat = {
  name: 'color',
  definition: {
    type: 'string',
    validate: /^#[0-9A-Fa-f]{6}$/,
  },
  component: withFormItem(
    defineComponent({
      name: 'ColorWidget',
      // components: {
      //   AInput: Input,
      // },
      props: CommonWidgetPropsDefine,
      setup (props: any) {
        const handleChange = (e: any) => {
          const value = e.target.value;
          e.target.value = props.value;
          props.onChange(value);
        };

        const styleRef = computed(() => {
          return {
            color: (props.options && props.options.color) || '#000000',
          };
        });

        return () => {
          return (
            <input
              type="color"
              value={props.value as any}
              onInput={handleChange}
              style={styleRef.value}
            />
          );
        };
      },
    }),
  ),
};

export default format;
