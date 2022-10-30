import {
  defineComponent,
  ref,
  onMounted,
  PropType,
  shallowRef,
  watch,
  onBeforeUnmount,
} from 'vue';
import * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { Input } from 'ant-design-vue';
// @ts-ignore
// eslint-disable-next-line import/extensions
import customLangMonarch from './lang.js';
export default defineComponent({
  name: 'EditorArea',
  components: {
    AInput: Input,
    ATextArea: Input.TextArea,
  },
  props: {
    code: String,
    title: String,
    onChange: {
      type: Function as PropType<
        (value: string, event: Monaco.editor.IModelContentChangedEvent) => void
      >,
      required: true,
    },
  },
  setup (props, { emit }) {
    let _subscription: Monaco.IDisposable | undefined;
    // eslint-disable-next-line camelcase
    let __prevent_trigger_change_event = false;
    const editorRef = shallowRef();
    const containerRef = ref();
    Monaco.languages.register({ id: 'custom' });
    Monaco.languages.setMonarchTokensProvider('custom', customLangMonarch);
    const { title } = props;
    // console.log(props.code, 'EditorArea--');
    onMounted(() => {
      // console.log(containerRef, 'containerRef');
      if (containerRef.value) {
        const editorInner: any = (editorRef.value = Monaco.editor.create(
          containerRef.value,
          {
            value: props.code,
            language: 'custom',
            folding: true,
            scrollbar: {
              // Subtle shadows to the left & top. Defaults to true.
              useShadows: false,
              // Render vertical arrows. Defaults to false.
              verticalHasArrows: true,
              // Render horizontal arrows. Defaults to false.
              horizontalHasArrows: true,
              vertical: 'visible',
              horizontal: 'visible',
              verticalScrollbarSize: 17,
              horizontalScrollbarSize: 17,
              arrowSize: 30,
            },
            minimap: {
              enabled: true,
            },
            lineNumbers: 'off',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            theme: 'vs-dark',
            formatOnPaste: true,
            renderValidationDecorations: 'on',
          },
        ));
        editorInner.onDidChangeModelContent((event: any) => {
          // console.log(editorInner.getValue(), 'eee');
          // eslint-disable-next-line camelcase
          if (!__prevent_trigger_change_event) {
            const value = editorInner.getValue();
            props.onChange(value, event);
          }
        });
      }
    });
    onBeforeUnmount(() => {
      if (_subscription) _subscription.dispose();
    });
    watch(
      () => props.code,
      (v) => {
        const editor = editorRef.value;
        const model = editor.getModel();
        if (v !== model.getValue()) {
          editor.pushUndoStop();
          // eslint-disable-next-line camelcase
          __prevent_trigger_change_event = true;
          // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
          model.pushEditOperations(
            [],
            [
              {
                range: model.getFullModelRange(),
                text: v,
              },
            ],
          );
          editor.pushUndoStop();
          // eslint-disable-next-line camelcase
          __prevent_trigger_change_event = false;
        }
        // if (v !== editorRef.value.getValue()) {
        //   editorRef.value.setValue(v)
        // }
      },
    );
    return () => {
      return (
        <div class="editor-box">
          <h4>{title}</h4>
          <div id="editor" ref={containerRef}></div>
        </div>
      );
    };
  },
});
