import React, { useState } from "react";

function Modal() {
  return (
    <section id="modal">
      <div className="modal-container">
        <div className="modal-heading">
          <p>Delete comment</p>
        </div>
        <div className="modal-text">
          Are you sure you want to delete this comment. This will remove and
          cannot be undone.
        </div>
        <div className="modal-btns">
          <button id="modal-cancel">No, Cancel</button>
          <button id="modal-delete">Delete</button>
        </div>
      </div>
    </section>
  );
}

export default Modal;
