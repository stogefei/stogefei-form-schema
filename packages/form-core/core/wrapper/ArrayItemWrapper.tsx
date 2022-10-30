import { defineComponent, PropType } from 'vue';
import { Button } from 'ant-design-vue';
// import { useVJSFContext } from '../context';
export default defineComponent({
  name: 'ArrayItemWrapper',
  components: {
    AButton: Button,
  },
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup (props: any, { slots }) {
    // const context = useVJSFContext();
    return () => {
      return (
        <div>
          <div>
            <a-button onClick={() => props.onAdd(props.index)}>新增</a-button>
            <a-button onClick={() => props.onDelete(props.index)}>
              删除
            </a-button>
            <a-button onClick={() => props.onUp(props.index)}>上移</a-button>
            <a-button onClick={() => props.onDown(props.index)}>下移</a-button>
          </div>
          {/* slots.default 是一个函数 */}
          <div>{slots.default && slots.default()}</div>
        </div>
      );
    };
  },
});
