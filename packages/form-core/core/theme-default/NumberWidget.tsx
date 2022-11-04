import { defineComponent } from 'vue';
import { InputNumber } from 'ant-design-vue';
import { CommonWidgetPropsDefine } from '../types';
const NumberWidget = defineComponent({
  name: 'NumberWidget',
  components: {
    AInputNumber: InputNumber,
  },
  props: CommonWidgetPropsDefine,
  setup (props, { emit }) {
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
export default NumberWidget;
