import type { PropType, DefineComponent } from 'vue';
export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean',
}

type SchemaRef = { $ref: string };

export interface Schema {
  // 这里加 string 类型的原因是因为后面再写的时候，除了写成 SchemaTypes.NUMBER 还可以直接写 string
  type?: SchemaTypes | string;
  const?: any;
  format?: string;

  title?: string;
  default?: any;

  properties?: {
    [key: string]: Schema;
  };
  items?: Schema | Schema[] | SchemaRef;
  uniqueItems?: any;
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef;
  };
  oneOf?: Schema[];
  anyOf?: Schema[];
  allOf?: Schema[];
  // TODO: uiSchema
  // vjsf?: VueJsonSchemaConfig
  required?: string[];
  enum?: any[];
  enumNames?: any[];
  enumKeyValue?: any[];
  additionalProperties?: any;
  additionalItems?: Schema;

  minLength?: number;
  maxLength?: number;
  minimun?: number;
  maximum?: number;
  multipleOf?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
}

export const FieldProps = {
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  rootSchema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  value: {
    required: true,
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  // uiSchema: {
  //   type: Object as PropType<Schema>,
  //   required: true,
  // },
  // errorSchema: {
  //   type: Object as PropType<Schema>,
  //   required: true,
  // },
} as const;

export type CommonWidgetDefine = DefineComponent<
  typeof CommonWidgetPropsDefine
>;

export type CommonFieldType = DefineComponent<typeof FieldProps>;

export const CommonWidgetPropsDefine = {
  value: {},
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  errors: {
    type: Array as PropType<string[]>,
  },
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  options: {
    type: Object as PropType<{ [key: string]: any }>,
  },
} as const;

export const SelectionWidgetPropsDefine = {
  ...CommonWidgetPropsDefine,
  options: {
    type: Array as PropType<
      Array<{
        key: string;
        value: any;
      }>
    >,
    required: true,
  },
} as const;

export type SelectionWidgetDefine = DefineComponent<
  typeof SelectionWidgetPropsDefine
>;

export enum SelectionWidgetName {
  SelectionWidget = 'SelectionWidget',
}

export enum CommonWidgetNames {
  TextWidget = 'TextWidget',
  NumberWidget = 'NumberWidget',
}

export interface Theme {
  widgets: {
    [SelectionWidgetName.SelectionWidget]: SelectionWidgetDefine;
    [CommonWidgetNames.TextWidget]: CommonWidgetDefine;
    [CommonWidgetNames.NumberWidget]: CommonWidgetDefine;
  };
}
