import { toast } from 'react-toastify'

const callToast = (value, duration) => {
  toast(value, {
    className: 'green',
    position: 'top-left',
    autoClose: duration,
    type: toast.TYPE.SUCCESS,
    hideProgressBar: false,
  })
}
export default callToast
