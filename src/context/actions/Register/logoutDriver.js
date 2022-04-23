import AsyncStorage from "@react-native-async-storage/async-storage"
import { LOGOUT_USER } from "../../../constants/actionTypes"
import { showError, showSuccess } from "../../../helpers/flashMessage"

const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('chauffeur')
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }

const logoutDriver = () => (dispatch) => {
    removeValue();
    dispatch({
        type: LOGOUT_USER, 
    })
}

export default logoutDriver;