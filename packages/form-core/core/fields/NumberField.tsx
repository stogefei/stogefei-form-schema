import { defineComponent } from 'vue';
import { InputNumber } from 'ant-design-vue';
import { FieldProps, CommonWidgetNames } from '../types';
import { getWidget } from '../theme';
export default defineComponent({
  name: 'NumberField',
  components: {
    AInputNumber: InputNumber,
  },
  props: FieldProps,
  setup (props, { emit }) {
    const handleChange = (val: number) => {
      emit('change', val);
    };
    const NumberWidgetRef = getWidget(CommonWidgetNames.NumberWidget);
    return () => {
      const NumberWidget = NumberWidgetRef.value;
      const { rootSchema, onChange, ...rest } = props;
      return <NumberWidget {...rest} onChange={handleChange} />;
    };
  },
});
