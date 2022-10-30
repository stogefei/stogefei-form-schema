import { computed, defineComponent } from 'vue';
import { SchemaTypes, FieldProps } from './types';
import { StringField, NumberField, ObjectField } from './fields';
import { retrieveSchema } from './utils';
export default defineComponent({
  name: 'SchemaFormItems',
  props: FieldProps,
  setup (props, { slots, attrs, emit }) {
    const retrievedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props;
      return retrieveSchema(schema, rootSchema, value);
    });
    console.log(retrievedSchemaRef, 'retrievedSchemaRef');
    return () => {
      const schema = props.schema;
      const type = schema?.type;
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
        default: {
          console.log(`${type} is not supported`);
          return null;
        }
      }
      return <Component {...props} />;
    };
  },
});
