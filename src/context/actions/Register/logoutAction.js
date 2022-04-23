import AsyncStorage from "@react-native-async-storage/async-storage"
import { LOGOUT_USER } from "../../../constants/actionTypes"
import { showError, showSuccess } from "../../../helpers/flashMessage"

const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('client')
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }

const logoutUser = () => (dispatch) => {
    removeValue();
    dispatch({
        type: LOGOUT_USER, 
    })
}

export default logoutUser;