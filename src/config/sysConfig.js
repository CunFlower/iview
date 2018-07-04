import env from '../../build/env';

const ajaxUrl = env === 'development || test'
    ? 'http://118.89.190.166:9980'
    : env === 'production'
        ? 'http://123.206.195.237:9980'
        : 'http://118.89.190.166:9980';
export default ajaxUrl