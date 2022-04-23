import { DEVT_BACKEND_URL, PRODT_BACKEND_URL, FIREBASE_CONFIGS } from '@env'
const devEnvironmentVars = {
    BACKEND_URL: DEVT_BACKEND_URL
};

const probEnvironmentVars = {
    BACKEND_URL: PRODT_BACKEND_URL 
};


export default __DEV__ ? devEnvironmentVars : probEnvironmentVars;