import React from 'react'
import './styles.scss'
import { Photo } from '../../../../../../resources/icons_index'
import { loadModal } from '../../../../../../store/actions/modal'
import { connect } from 'react-redux'
import { TEXT_INPUT_MODAL } from '../../../../../../components/Modal/Types'

function ImageAdd(props) {
  const { onChange, imageUrl } = props

  const changeImageUrlHandler = (data) => {
    onChange('imageUrl', data.text)
  }

  const modalOptions = {
    modalResponseCallback: changeImageUrlHandler,
    header: 'Lisa pilt',
    textFieldName: 'Pildi URL',
    initialState: {
      text: imageUrl
    }
  }

  return (
    <div style={{ backgroundImage: `url(${imageUrl})` }} className="image-add"
         onClick={() => props.loadModal(TEXT_INPUT_MODAL, modalOptions)}>
      {!imageUrl && <Photo className="image-add__photo"/>}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  loadModal: (modelType, modalResponseCallback) => dispatch(loadModal(modelType, modalResponseCallback))
})

export default connect(null, mapDispatchToProps)(ImageAdd)
