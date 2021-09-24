import React from 'react'
import Modal from 'react-modal'

import '../assets/styles/modal.css'

const customStyle = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      padding               : '6rem 8rem',
      borderRadius          : '4px',
      background            : 'rgb(15, 15, 15)',
      border                : 'none',
      textAlign             : 'center'
    }
  }
  
const ModalAlert = (props) => (
    <Modal
        isOpen={!!props.errorText}
        contentLabel="handling errors"
        style={customStyle}
        overlayClassName="Overlay"
        onRequestClose={props.closeModal}
        ariaHideApp={false}
    >
        <h2>{props.errorText}</h2>
        <button 
            onClick={props.closeModal} 
            className="btn red-btn"
        >
            Close
        </button>
    </Modal>
)

export default ModalAlert