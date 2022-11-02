import { computed, defineComponent } from 'vue';
import { SchemaTypes, FieldProps } from './types';
import {
  NumberField, ObjectField, ArrayField, StringField,
} from './fields';
// NumberField, ObjectField, ArrayField,StringField
import { retrieveSchema } from './utils';
// import { useVJSFContext } from './context';
export default defineComponent({
  name: 'SchemaFormItem',
  props: FieldProps,
  setup (props) {
    const retrievedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props;
      // const formContext = useVJSFContext();
      return retrieveSchema(schema, rootSchema, value);
    });
    return () => {
      const schema = props.schema;
      const type = schema?.type;
      const retrieveSchemaValue = retrievedSchemaRef.value;
      let Component: any;
      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField;
          break;
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField;
          break;
        }
        case SchemaTypes.OBJECT: {
          Component = ObjectField;
          break;
        }
        case SchemaTypes.ARRAY:
          Component = ArrayField;
          break;
        default: {
          console.log(`${type} is not supported`);
          return null;
        }
      }
      return <Component {...props} schema={retrieveSchemaValue} />;
    };
  },
});
