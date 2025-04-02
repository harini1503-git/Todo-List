import React, { useRef } from 'react'
import { useAppContext } from '../../context/AppContext'
import Draggable from 'react-draggable';
import Modal from 'react-modal'
import AddEditNotes from '../../pages/Home/AddEditNotes'

const DraggableModal = () => {
  const { openAddEditModal, setOpenAddEditModal, getAllNotes } = useAppContext();
  const modalRef = useRef();
  console.log(modalRef)


  console.log(Draggable);
  return (
    <Draggable nodeRef={modalRef}>

        <Modal
          ref={modalRef} 
          isOpen={openAddEditModal.isShowen}
          onRequestClose={() => setOpenAddEditModal({ isShowen: false, type: 'add', data: null })}
          style={{ overlay: { backgroundColor: 'rgba(0,0,0,0.2)' }}}
          contentLabel="Add or Edit Note"
          className="custom-class">

          <AddEditNotes
            onclose={() => setOpenAddEditModal({ isShowen: false, type: 'add', data: null })}
            type={openAddEditModal.type}
            notedata={openAddEditModal.data}
            getAllNotes={getAllNotes} />

        </Modal>

    </Draggable>

  )
}

export default DraggableModal;