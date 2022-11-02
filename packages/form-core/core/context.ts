import { inject, ComputedRef } from 'vue';
import { CommonFieldType, CommonWidgetDefine } from './types';
export const SchemaFormContextKey = Symbol('provide');
export interface SchemaFormContextProps {
  SchemaItem: CommonFieldType;
  formatMapRef: ComputedRef<
    | {
        [key: string]: CommonWidgetDefine;
      }
    | undefined
  >;
  transformSchemaRef: any;
}
// 注意: 当函数抽离出来了，如果里面的响应式的数据发生了变化，同样也会重新调用这个函数
export function useVJSFContext () {
  const context: { SchemaItem: CommonFieldType } | undefined =
    inject(SchemaFormContextKey);

  if (!context) {
    throw new Error('SchemaForm should be used');
  }
  return context;
}
