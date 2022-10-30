import {
  defineComponent, reactive, ref, watchEffect,
} from 'vue';
import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats/dist/index';
import localize from 'ajv-i18n/localize/jtd';
interface MyData {
  foo: string;
  bar?: number;
}
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
    age: {
      type: Number,
      required: true,
    },
  },
  created () {},

  mounted () {
    this.format();
    // this.addKeys();
  },

  methods: {
    format () {
      const ajv = new Ajv({ allErrors: true });
      require('ajv-errors')(ajv /*, {singleError: true} */);
      ajv.addFormat('test', (data) => {
        return data === '11';
      });
      ajv.addFormat('identifier', /^a-z\$_[a-zA-Z$_0-9]*$/);
      addFormats(ajv);
      const schema: JSONSchemaType<MyData> = {
        type: 'object',
        properties: {
          foo: {
            type: 'string',
            minLength: 10,
            errorMessage: {
              type: '校验不通过',
              minLength: '10',
            },
          },
          bar: { type: 'number', nullable: true },
        },
        required: ['foo'],
        additionalProperties: false,
        errorMessage: {
          type: '校验不通过',
          minLength: '10',
        },
      };
      const validate = ajv.compile(schema);
      const data = {
        foo: '1111',
        bar: 1,
      };
      if (validate(data)) {
        // data is MyData here
        console.log(data.foo, 'data--');
      } else {
        localize.zh(validate.errors);
        console.log(validate.errors, 'errors');
      }
    },
    addKeys () {
      const ajv = new Ajv({ allErrors: true });
      require('ajv-errors')(ajv /*, {singleError: true} */);
      ajv.addKeyword({
        keyword: 'range',
        type: 'number',
        schemaType: 'array',
        // implements: 'exclusiveRange',
        compile: ([min, max], parentSchema) =>
          parentSchema.exclusiveRange === true
            ? (data) => data > min && data < max
            : (data) => data >= min && data <= max,
      });

      // const schema = { range: [2, 4], exclusiveRange: true };
      const schema = { range: [2, 4] };
      const validate = ajv.compile(schema);
      console.log(validate(2.01)); // true
      console.log(validate(3.99)); // true
      console.log(validate(2)); // false
      console.log(validate(4)); // false
    },
  },

  setup (props, { slots, attrs, emit }) {
    console.log(props, 'props');
    console.log(slots, 'slots');
    console.log(attrs, 'attrs');
    // console.log(emit, 'emit');
    const state = reactive({
      name: 1,
    });
    // {value: ''}
    const refName = ref(1);
    console.log(refName.value, 'refName');
    // setInterval(() => {
    //   state.name++;
    //   refName.value++;
    // }, 3000);
    watchEffect(() => {
      console.log(state.name, '11');
    });
    return {
      state,
      refName,
    };
  },
  render () {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <h1>{this.refName}</h1>
      </div>
    );
  },
});
