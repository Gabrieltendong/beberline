import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import arab from "./arab.json";
import french from "./french.json";
import italian from "./italian.json";
import english from './english.json';

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'fr',
    resources: {
        sa:arab,
        fr:french,
        it:italian,
        en:english
    },
    react:{
        useSuspense: false
    }
})

export default i18next;