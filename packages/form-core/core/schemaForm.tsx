import {
  defineComponent, PropType, provide, reactive,
} from 'vue';
import { Schema } from './types';
import SchemaItem from './schemaItem';
import { SchemaFormContextKey } from './context';
export default defineComponent({
  name: 'SchemaForm',
  components: {
    SchemaItem,
  },
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
  setup (props, { slots, attrs, emit }) {
    const onChange = (v: any) => {
      props.onChange(v);
    };
    const context = reactive({
      SchemaItem,
    });
    provide(SchemaFormContextKey, context);
    return () => {
      const { schema, value } = props;
      return (
        <schema-item
          value={value}
          schema={schema}
          rootSchema={schema}
          onChange={onChange}
        />
      );
    };
  },
});
