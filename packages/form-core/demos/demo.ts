// import PasswordWidget from '@/components/PasswordWiget'

export default {
  name: 'Demo',
  schema: {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        test: true,
        title: 'password',
      },
      lastName: {
        type: 'string',
        minLength: 10,
        title: 're try password',
      },
      age: {
        type: 'number',
        format: 'color',
        title: 'Input Color',
      },
    },
  },
  uiSchema: {
    properties: {
      pass1: {
        widget: '',
      },
      pass2: {
        color: 'red',
      },
    },
  },
  // default: 99,
  default: {
    firstName: 'zaf',
    lastName: 'zhuaf',
    age: 25,
  },
};
