import { defineComponent } from 'vue';
import { Input } from 'ant-design-vue';
import { FieldProps } from '../types';
export default defineComponent({
  name: 'StringField',
  components: {
    AInput: Input,
  },
  props: FieldProps,
  setup (props, { slots, attrs, emit }) {
    const onChange = (e: any) => {
      console.log(e.target.value, 'StringField');
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
