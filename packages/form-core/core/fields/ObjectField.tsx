import { defineComponent } from 'vue';
import { FieldProps } from '../types';
import { useVJSFContext } from '../context';
import { isObject } from '../utils';
export default defineComponent({
  name: 'ObjectField',
  props: FieldProps,
  setup (props) {
    const context = useVJSFContext();
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
      const {
        schema, rootSchema, value, uiSchema,
      } = props;

      const { SchemaItem } = context;

      const properties = schema.properties || {};

      const currentValue: any = isObject(value) ? value : {};

      return Object.keys(properties).map((k: string, index: any) => (
        <SchemaItem
          schema={properties[k]}
          rootSchema={rootSchema}
          uiSchema={uiSchema.properties ? uiSchema.properties[k] || {} : {}}
          value={currentValue[k]}
          key={index}
          onChange={(v: any) => handleObjectFieldChange(k, v)}
        />
      ));
    };
  },
});
