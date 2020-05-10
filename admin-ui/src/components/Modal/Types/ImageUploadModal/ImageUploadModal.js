import React, { useState } from 'react'
import { hideModal } from '../../../../store/actions/modal'
import Modal from '../../Modal'
import './styles.scss'
import { connect } from 'react-redux'
import { uploadImage } from '../../../../services/imageService'

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

  const dialogStyle = {
  }

  const onChange = (e) => {
    const files = Array.from(e.target.files)
    setLoadingState(true)

    const formData = new FormData()
    files.forEach((file, i) => {
      formData.append('image', file)
    })

    uploadImage(formData).subscribe(response => {
        setImageName(response.data.imageName)
        setImageUrl(response.data.imageUrl)
        setLoadingState(false)
      }
    )
  }

  return (
    <Modal
      header={'Lae pilt'}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmButtonText={'Nõustu'}
      dialogStyle={dialogStyle}
      isLoading={isLoading}
    >
      <div>
        <label className="image-modal__upload-button">
          <input className="image-modal__upload-field" type="file" accept="image/png, image/jpeg" id='single'
                 onChange={onChange}/>
          Lae fail
        </label>
        {imageName && <p className="image-modal__file-name-display">Faili nimi : {imageName}</p>}
      </div>
    </Modal>
  )
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
})

export default connect(null, mapDispatchToProps)(ImageUploadModal)
