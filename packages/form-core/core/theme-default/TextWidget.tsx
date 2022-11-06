import { defineComponent, computed } from 'vue';
import { Input } from 'ant-design-vue';
import { CommonWidgetPropsDefine } from '../types';
const TextWidget = defineComponent({
  name: 'TextWidget',
  components: {
    AInput: Input,
  },
  props: CommonWidgetPropsDefine,
  setup (props, { slots, attrs, emit }) {
    const styleRef: any = computed(() => {
      return {
        color: props.options?.color || 'black',
      };
    });
    const onChange = (e: any) => {
      const val = e.target.value;
      emit('change', val);
    };
    return {
      onChange,
      styleRef,
    };
  },
  render () {
    return (
      <a-input
        value={this.value}
        style={this.styleRef}
        onInput={this.onChange}
      />
    );
  },
});

export default TextWidget;
