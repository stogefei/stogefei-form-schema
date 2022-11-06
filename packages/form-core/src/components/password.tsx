import { defineComponent } from 'vue';
import { Input } from 'ant-design-vue';
import { CommonWidgetPropsDefine, CommonWidgetDefine } from '../../core/types';

import { withFormItem } from '../../core/theme-default/FormItem';

const PasswordWidget: CommonWidgetDefine = withFormItem(
  defineComponent({
    name: 'PasswordWidget',
    components: {
      AInput: Input.Password,
    },
    props: CommonWidgetPropsDefine,
    setup (props: any) {
      const handleChange = (e: any) => {
        const value = e.target.value;
        e.target.value = props.value;
        props.onChange(value);
      };
      return () => {
        return (
          <a-input
            type="password"
            value={props.value as any}
            onInput={handleChange}
          />
        );
      };
    },
  }),
);

export default PasswordWidget;
