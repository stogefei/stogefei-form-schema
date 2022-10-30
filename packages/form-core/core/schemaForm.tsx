import {
  defineComponent, PropType, provide, reactive,
} from 'vue';
import { Schema } from './types';
import SchemaItems from './schemaItems';
import { SchemaFormContextKey } from './context';
export default defineComponent({
  name: 'SchemaForm',
  components: {
    SchemaItems,
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
      SchemaItems,
    });
    provide(SchemaFormContextKey, context);
    return () => {
      const { schema, value } = props;
      return (
        <schema-items
          value={value}
          schema={schema}
          rootSchema={schema}
          onChange={onChange}
        />
      );
    };
  },
});
