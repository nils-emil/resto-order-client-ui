import { toast } from 'react-toastify'

const callToast = (value) => {
  toast(value, {
    position: 'bottom-left',
    autoClose: 3000
  })
}
export default callToast
