import { defineComponent, ref, watch } from 'vue';
import { Select } from 'ant-design-vue';
import { SelectionWidgetPropsDefine } from '../types';

const SelectionWidget = defineComponent({
  name: 'SelectionWidget',
  components: {
    ASelect: Select,
  },
  props: SelectionWidgetPropsDefine,
  setup (props: any, { slots, emit, attrs }) {
    const currentValueRef = ref(props.value);
    // 当输入框的值发生了变化需要复制给 value
    watch(currentValueRef, (newV, oldV) => {
      if (newV !== props.value) {
        props.onChange(newV);
      }
    });
    // 同时如果 value 值发生了变化也要将输入框的值变化
    watch(
      () => props.value,
      (newV, oldV) => {
        if (newV !== currentValueRef.value) {
          currentValueRef.value = newV;
        }
      },
    );
    return () => {
      const { options } = props;
      return (
        <a-select
          class="select"
          mode={'multiple'}
          options={options}
          v-model={currentValueRef.value}
        />
      );
    };
  },
});
export default SelectionWidget;
