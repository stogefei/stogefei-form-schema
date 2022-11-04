import {
  defineComponent,
  PropType,
  computed,
  provide,
  inject,
  ComputedRef,
  ExtractPropTypes,
} from 'vue';
import {
  Theme,
  SelectionWidgetName,
  CommonWidgetNames,
  FieldProps,
} from './types';

// import { isObject } from './utils';

// import { useVJSFContext } from './context';

const THEME_PROVIDER_KEY = Symbol('theme');

const ThemeProvider = defineComponent({
  name: 'VJSFThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true,
    },
  },
  setup (props, { slots, emit, attrs }) {
    const context = computed(() => props.theme);

    provide(THEME_PROVIDER_KEY, context);

    return () => slots.default && slots.default();
  },
});
export default ThemeProvider;

export function getWidget<T extends SelectionWidgetName | CommonWidgetNames> (
  name: T,
  props?: ExtractPropTypes<typeof FieldProps>,
) {
  // const formContext = useVJSFContext();
  // if (props) {
  // }
  const context: ComputedRef<Theme> | undefined =
    inject<ComputedRef<Theme>>(THEME_PROVIDER_KEY);

  if (!context) {
    throw new Error('vjsf theme must required');
  }

  const widgetRef = computed(() => {
    return context.value.widgets[name];
  });

  return widgetRef;
}
