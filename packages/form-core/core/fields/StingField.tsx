import { defineComponent, computed } from 'vue';
import { Input } from 'ant-design-vue';
import { FieldProps, CommonWidgetNames } from '../types';
import { getWidget } from '../theme';
export default defineComponent({
  name: 'StringField',
  components: {
    AInput: Input,
  },
  props: FieldProps,
  setup (props, { slots, attrs, emit }) {
    const handleChange = (val: any) => {
      emit('change', val);
    };
    const TextWidgetRef = computed(() => {
      const widgetRef = getWidget(CommonWidgetNames.TextWidget, props);
      return widgetRef.value;
    });

    return () => {
      const { rootSchema, onChange, ...rest } = props;
      const TextWidget = TextWidgetRef.value;
      // 在 props 里面有相同的 keys 会 mergeProps 合并
      return <TextWidget {...rest} onChange={handleChange} />;
    };
  },
});
