import React from 'react'
import './styles.scss'
import { Photo } from '../../../../../../resources/icons_index'
import { loadModal } from '../../../../../../store/actions/modal'
import { connect } from 'react-redux'
import { IMAGE_UPLOAD_MODAL } from '../../../../../../components/Modal/Types'

function ImageAdd(props) {
  const { onChange, imageUrl } = props

  const changeImageUrlHandler = (data) => {
    onChange('imageUrl', data.imageUrl)
  }

  const modalOptions = {
    modalResponseCallback: changeImageUrlHandler,
    initialState: {
      imageUrl
    }
  }

  return (
    <div style={{ backgroundImage: `url(${imageUrl})` }} className="image-add"
         onClick={() => props.loadModal(IMAGE_UPLOAD_MODAL, modalOptions)}>
      {!imageUrl && <Photo className="image-add__photo"/>}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  loadModal: (modelType, modalResponseCallback) => dispatch(loadModal(modelType, modalResponseCallback))
})

export default connect(null, mapDispatchToProps)(ImageAdd)
