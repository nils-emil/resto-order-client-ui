import React, { useState } from 'react'
import { hideModal } from '../../../../store/actions/modal'
import Modal from '../../Modal'
import './styles.scss'
import { connect } from 'react-redux'
import { uploadImage } from '../../../../services/imageService'
import { showPopUpWithTimeout } from '../../../../store/actions/popup'
import { popUpVariants } from '../../../PopUp/PopUp'

function ImageUploadModal(props) {

  const { modalResponseCallback, previousImageUrl } = props.options
  const [imageUrl, setImageUrl] = useState(previousImageUrl)
  const [imageName, setImageName] = useState(null)
  const [isLoading, setLoadingState] = useState(false)

  const onConfirm = () => {
    modalResponseCallback({ imageUrl })
    props.hideModal()
  }

  const onClose = () => {
    props.hideModal()
  }

  const onChange = (e) => {
    if (e.target.files[0].size > 5000000) {
      props.showPopUpWithTimeout({ type: popUpVariants.ERROR, text: 'Fail on liiga suur' })
      return
    }

    setLoadingState(true)
    const formData = new FormData()
    formData.append('image', e.target.files[0])

    const observer = {
      next: response => {
        setImageName(response.data.imageName)
        setImageUrl(response.data.imageUrl)
        setLoadingState(false)
      },
      error: error => {
        props.showPopUpWithTimeout({ type: popUpVariants.ERROR, text: error.response.data.message })
        setLoadingState(false)
      }
    }

    uploadImage(formData).subscribe(observer)
  }

  return (
    <Modal
      header={'Laadi pilt'}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmButtonText={'Salvesta'}
      dialogStyle={{}}
      isLoading={isLoading}
    >
      <div>
        <label className="image-modal__upload-button">
          <input className="image-modal__upload-field" type="file" accept="image/png, image/jpeg" id='single'
                 onChange={onChange}/>
          Laadi pilt
        </label>
        {imageName && <p className="image-modal__file-name-display">Pildi nimi : {imageName}</p>}
      </div>
    </Modal>
  )
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showPopUpWithTimeout: (popUpType, popUpText) => dispatch(showPopUpWithTimeout(popUpType, popUpText))
})

export default connect(null, mapDispatchToProps)(ImageUploadModal)
