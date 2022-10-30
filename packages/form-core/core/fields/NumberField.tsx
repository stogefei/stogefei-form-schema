import { defineComponent } from 'vue';
import { InputNumber } from 'ant-design-vue';
import { FieldProps } from '../types';
export default defineComponent({
  name: 'NumberField',
  components: {
    AInputNumber: InputNumber,
  },
  props: FieldProps,
  setup (props, { slots, attrs, emit }) {
    const onChange = (val: number) => {
      emit('change', val);
    };
    return {
      onChange,
    };
  },
  render () {
    return <a-input-number value={this.value} onChange={this.onChange} />;
  },
});
