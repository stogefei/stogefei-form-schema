import {
  defineComponent, reactive, ref, Ref, watchEffect,
} from 'vue';
import { Col, Row, Divider } from 'ant-design-vue';
import './styles/app.less';
import monaco from './components/monaco-editor';
import SchemaForm from '../core/index';
import demos from '../demos';
type Schema = any;
type UISchema = any;
function toJson (data: any) {
  return JSON.stringify(data, null, 2);
}
export default defineComponent({
  name: 'App',
  components: {
    ACol: Col,
    ARow: Row,
    ADivider: Divider,
    monaco,
    SchemaForm,
  },
  setup () {
    const contextRef = ref();
    const selectedRef: Ref<number> = ref(0);
    const demo: {
      schema: Schema | null;
      data: any;
      uiSchema: UISchema | null;
      schemaCode: string;
      dataCode: string;
      uiSchemaCode: string;
      customValidate: ((d: any, e: any) => void) | undefined;
    } = reactive({
      schema: null,
      data: {},
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: '',
      customValidate: undefined,
    });
    watchEffect(() => {
      const index = selectedRef.value;
      const demoData: any = demos[index];
      demo.data = demoData.default;
      demo.schema = demoData.schema;
      demo.schemaCode = toJson(demoData.schema);
      demo.uiSchema = demoData.uiSchema;
      demo.dataCode = toJson(demoData.default);
      demo.uiSchemaCode = toJson(demoData.uiSchema);
    });

    const handleCodeChange = (
      field: 'schema' | 'data' | 'uiSchema',
      value: string,
    ) => {
      console.log(value, 'value');
      console.log(demo, 'demo----');
      console.log(demo[field], 'demo[field]----');
      try {
        const json = JSON.parse(value);
        demo[field] = json;
        (demo as any)[`${field}Code`] = value;
      } catch (err) {}
      // editorContent.value = val;
    };
    const handleChange = (v: any) => {
      console.log(v, 'handleChange');
      demo.data = v;
      demo.dataCode = toJson(v);
    };
    const handleSchemaChange = (v: any) => handleCodeChange('schema', v);
    const handleDataChange = (v: string) => handleCodeChange('data', v);
    const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v);

    return () => {
      return (
        <a-row type="flex" class="height-100">
          <a-col span="12" class="height-100">
            <div class="height-50">
              <monaco
                title="Schema"
                code={demo.schemaCode}
                onChange={handleSchemaChange}
              />
            </div>
            <div class="height-50">
              <a-row class="height-100">
                <a-col span="12">
                  <monaco
                    title="UISchema"
                    code={demo.uiSchemaCode}
                    onChange={handleUISchemaChange}
                  />
                </a-col>
                <a-col span="12">
                  <monaco
                    title="Value"
                    code={demo.dataCode}
                    onChange={handleDataChange}
                  />
                </a-col>
              </a-row>
            </div>
          </a-col>
          <a-col span="12">
            <schema-form
              value={demo.data}
              contextRef={contextRef}
              onChange={handleChange}
              schema={demo.schema}
            />
          </a-col>
        </a-row>
      );
    };
  },
});
