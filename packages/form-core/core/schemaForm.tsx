import {
  defineComponent,
  markRaw,
  PropType,
  provide,
  reactive,
  watchEffect,
  shallowRef,
  Ref,
  computed,
} from 'vue';
import Ajv, { Options } from 'ajv';
import {
  CustomFormat,
  Schema,
  UISchema,
  CustomKeyword,
  CommonWidgetDefine,
} from './types';
import SchemaItem from './schemaItem';
import { SchemaFormContextKey, SchemaFormContextProps } from './context';

// 使用 ajvErrors 必须要使用的配置
const defaultAjvOptions: Options = {
  allErrors: true,
};
export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    uiSchema: {
      type: Object as PropType<UISchema>,
    },
    customFormats: {
      type: [Array, Object] as PropType<CustomFormat[] | CustomFormat>,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    ajvOptions: {
      type: Object as PropType<Options>,
    },
    customKeywords: {
      type: [Array, Object] as PropType<CustomKeyword | CustomKeyword[]>,
    },
  },
  setup (props, { slots, attrs, emit }) {
    const formatMapRef = computed(() => {
      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats];
        return customFormats.reduce((result: any, format: any) => {
          // 这里就拿到了 format 对应组件的 map
          result[format.name] = format.component;
          return result;
        }, {} as { [key: string]: CommonWidgetDefine });
      } else {
        return {};
      }
    });
    const onChange = (v: any) => {
      props.onChange(v);
    };
    const context = reactive<SchemaFormContextProps>({
      // @ts-ignore
      SchemaItem: markRaw(SchemaItem),
      formatMapRef,
    });
    provide(SchemaFormContextKey, context);
    // 不需要考虑 key 变化的情况，只需要考虑整体变化的情况就可以了
    // const errorSchemaRef: Ref<ErrorSchema> = shallowRef({});
    // @ts-ignore
    const validatorRef: Ref<Ajv.Ajv> = shallowRef() as any;
    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions,
      });
      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats];
        customFormats.forEach((format: any) => {
          validatorRef.value.addFormat(format.name, format.definition);
        });
      }

      if (props.customKeywords) {
        const customKeywords = Array.isArray(props.customKeywords)
          ? props.customKeywords
          : [props.customKeywords];
        customKeywords.forEach((keyword: any) =>
          validatorRef.value.addKeyword(keyword.name, keyword.deinition as any),
        );
      }
    });

    return () => {
      const { schema, value, uiSchema } = props;
      return (
        <SchemaItem
          value={value}
          schema={schema}
          rootSchema={schema}
          uiSchema={uiSchema || {}}
          onChange={onChange}
        />
      );
    };
  },
});
