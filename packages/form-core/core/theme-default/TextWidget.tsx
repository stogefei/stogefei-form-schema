import { defineComponent } from 'vue';
import { Input } from 'ant-design-vue';
import { CommonWidgetPropsDefine } from '../types';
const TextWidget = defineComponent({
  name: 'TextWidget',
  components: {
    AInput: Input,
  },
  props: CommonWidgetPropsDefine,
  setup (props, { slots, attrs, emit }) {
    const onChange = (e: any) => {
      const val = e.target.value;
      emit('change', val);
    };
    return {
      onChange,
    };
  },
  render () {
    return <a-input value={this.value} onInput={this.onChange} />;
  },
});

export default TextWidget;
