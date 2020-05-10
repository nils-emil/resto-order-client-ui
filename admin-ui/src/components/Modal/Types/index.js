import ConfirmModal from './ConfirmModal/ConfirmModal'
import TextInputModal from './TextInputModal/TextInputModal'
import OrderModal from './OrderModal/OrderModal'
import ImageUploadModal from './ImageUploadModal/ImageUploadModal'

export const CONFIRM_MODAL = 'CONFIRM_MODAL'
export const TEXT_INPUT_MODAL = 'TEXT_INPUT_MODAL'
export const ORDER_MODAL = 'ORDER_MODAL'
export const IMAGE_UPLOAD_MODAL = 'IMAGE_UPLOAD_MODAL'

export const modals = {
  CONFIRM_MODAL: ConfirmModal,
  TEXT_INPUT_MODAL: TextInputModal,
  ORDER_MODAL: OrderModal,
  IMAGE_UPLOAD_MODAL: ImageUploadModal
}
