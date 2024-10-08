export const schema = {
  env: {
    format: ['production', 'test', 'special'],
    default: 'production',
    env: 'NODE_ENV',
  },
  all_props: '',
  prop_1: {
    prop_1_2: '',
  },
  prop_2: '',
  prop_3: '',
  dependencies: ['prop_1.prop_1_2', 'prop_2', 'prop_3'],
}
