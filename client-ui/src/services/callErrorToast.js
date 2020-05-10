import { toast } from 'react-toastify'

const callErrorToast = (value, duration) => {
  toast(value, {
    position: 'top-left',
    autoClose: duration,
    type: toast.TYPE.ERROR,
    hideProgressBar: false,
  })
}
export default callErrorToast
