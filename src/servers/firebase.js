import { initializeApp } from "firebase/app";
import {
     getFirestore, 
     doc,
     updateDoc,
     collection, 
     getDocs, 
     addDoc, 
     onSnapshot,

} from "firebase/firestore";

FIREBASE_CONFIGS = {
  apiKey: "AIzaSyC_0TzyFTmfaLsVmW6_Xbvz2PIvTYQX0dM",
  authDomain: "beberline-test.firebaseapp.com",
  projectId: "beberline-test",
  storageBucket: "beberline-test.appspot.com",
  messagingSenderId: "307263209989",
  appId: "1:307263209989:web:494b23f4b414fd7bbe526c",
  measurementId: "G-V7N8LQ306E"
}

//init firebase app
initializeApp(FIREBASE_CONFIGS)

//init services
const db = getFirestore()

//collection ref
const  colRef = collection(db, 'command')

//get collection data 
export const getData = ()=> {
    onSnapshot(colRef, (snapshot)=> {
       return snapshot.docs
    })
}

//create new doc
export const createDoc = (clientId, commandId)=> {
    addDoc(colRef, {
        active: false,
        client_id: clientId,
        command_id: commandId,
        createdAt: new Date(),
        driver_id: null,
        driver_position: null,
        isDeleted: false
    })
    .then((doc)=>{
        console.log(' created :>> ', doc.id );
    })
    .catch(( err )=> {
        console.log(`err.message`, err.message)
    })
}

export const confirmPay = (order_id)=> {
    getDocs(colRef)
    .then((res)=>{
        if ( !res.empty ) {

            res.docs.map((docu)=> {
           if ( docu.data().command_id == order_id ) {
            let docRef = doc(db, "command", order_id)
                updateDoc(docRef, {
                    paymentMade: true
                })
                .catch((err)=> {
                    console.log(err.message);
                })
           }
        })
        } else{
            console.log('empty');
        }
    })
    .catch((err)=> {
        console.log(`err`, err.message)
    })
}