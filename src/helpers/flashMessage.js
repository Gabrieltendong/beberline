import { showMessage } from "react-native-flash-message";

export const showSuccess = (message) => {
    showMessage({
        message,
        type: "success",
        icon: 'success'
      });
}

export const showError = (message) => {
    showMessage({
        message,
        type: "error",
        icon: 'warning'
      });
}