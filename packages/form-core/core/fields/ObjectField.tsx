import { defineComponent, inject } from 'vue';
import { FieldProps } from '../types';
import { SchemaFormContextKey } from '../context';
import { isObject } from '../utils';
export default defineComponent({
  name: 'ObjectField',
  props: FieldProps,
  setup (props, { slots, attrs, emit }) {
    const context: any = inject(SchemaFormContextKey);
    const handleObjectFieldChange = (key: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {};
      // 如果我们最终的 field 是 undefined，实际上应该从该 value 里面删除这个值
      if (v === undefined) {
        delete value[key];
      } else {
        value[key] = v;
      }
      props.onChange(value);
    };
    return () => {
      const { schema, rootSchema, value } = props;

      const { SchemaItems } = context;

      const properties = schema.properties || {};

      const currentValue: any = isObject(value) ? value : {};

      return Object.keys(properties).map((k: string, index: number) => (
        <SchemaItems
          schema={properties[k]}
          rootSchema={rootSchema}
          onChange={(v: any) => handleObjectFieldChange(k, v)}
          value={currentValue[k]}
          key={index}
        />
      ));
    };
  },
});
