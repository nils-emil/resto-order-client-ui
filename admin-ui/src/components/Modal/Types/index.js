import ConfirmModal from './ConfirmModal/ConfirmModal'
import TextInputModal from './TextInputModal/TextInputModal'
import OrderModal from './OrderModal/OrderModal'


export const CONFIRM_MODAL = 'CONFIRM_MODAL'
export const TEXT_INPUT_MODAL = 'TEXT_INPUT_MODAL'
export const ORDER_MODAL = 'ORDER_MODAL'

export const modals = {
  CONFIRM_MODAL: ConfirmModal,
  TEXT_INPUT_MODAL: TextInputModal,
  ORDER_MODAL: OrderModal
}
