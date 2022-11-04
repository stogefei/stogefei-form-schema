import { defineComponent } from 'vue';
import { FieldProps, Schema, SelectionWidgetName } from '../types';
import { useVJSFContext } from '../context';
import ArrayItemWrapper from '../wrapper/ArrayItemWrapper';
// import Selection from '../widgets/selection';
import { getWidget } from '../theme';

export default defineComponent({
  name: 'ArrayField',
  components: {
    ArrayItemWrapper,
    // SelectionWidget: Selection,
  },
  props: FieldProps,
  setup: function (props) {
    const context = useVJSFContext();
    const SelectionWidgetRef = getWidget(SelectionWidgetName.SelectionWidget);
    // 针对于 multiType 函数的 handle 函数
    const handleArrayItemChange = (v: any, index: number) => {
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];
      arr[index] = v;
      props.onChange(arr);
    };
    const handleAdd = (index: number) => {
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];
      arr.splice(index + 1, 0, undefined);
      props.onChange(arr);
    };
    const handleDelete = (index: number) => {
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];
      arr.splice(index, 1);
      props.onChange(arr);
    };
    const handleUp = (index: number) => {
      if (index === 0) return;

      const { value } = props;
      const arr = Array.isArray(value) ? value : [];

      const item = arr.splice(index, 1);
      arr.splice(index - 1, 0, item[0]);
      props.onChange(arr);
    };
    const handleDown = (index: number) => {
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];

      if (index === arr.length - 1) return;
      const item = arr.splice(index, 1);
      arr.splice(index + 1, 0, item[0]);
      props.onChange(arr);
    };
    return () => {
      const { schema, rootSchema, value } = props;
      const { SchemaItem } = context;
      // const SelectionWidget = theme.widgets[SelectionWidgetName.SelectionWidget];
      const SelectionWidget = SelectionWidgetRef.value;
      const isMultiType = Array.isArray(schema.items); // 数组
      // @ts-ignore
      const isSelect: any = schema?.items && schema?.items?.enum; // 单一类型
      if (isMultiType) {
        const items: Schema[] = schema.items as any;
        const arr = Array.isArray(value) ? value : [];
        return items.map((s: Schema, index: number) => {
          return (
            <SchemaItem
              schema={s}
              key={index}
              rootSchema={rootSchema}
              value={arr[index]}
              onChange={(v: any) => handleArrayItemChange(v, index)}
            />
          );
        });
      } else if (!isSelect) {
        const arr = Array.isArray(value) ? value : [];
        return arr.map((s: any, index: number) => {
          return (
            <ArrayItemWrapper
              index={index}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onUp={handleUp}
              onDown={handleDown}
            >
              <SchemaItem
                schema={schema.items as Schema}
                key={index}
                rootSchema={rootSchema}
                value={s}
                onChange={(v: any) => handleArrayItemChange(v, index)}
              />
            </ArrayItemWrapper>
          );
        });
      } else {
        const enumOptions = (schema.items as Schema).enum;
        const options = enumOptions?.map((e) => ({
          key: e,
          value: e,
        }));
        return (
          <SelectionWidget
            options={options || []}
            value={props.value}
            onChange={props.onChange}
            schema={schema}
          />
        );
      }
    };
  },
});
