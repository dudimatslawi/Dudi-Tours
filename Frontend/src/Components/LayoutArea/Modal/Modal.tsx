import { useState } from "react";
import "./Modal.css";

function Modal(): JSX.Element {
    const [visible, setVisible] = useState<boolean>(true)
    function closeModal() {
        setVisible(false)
    }

    return (

        <div className="Modal">
            {visible ? (<div className='visible-modal'>
                this is the modal
                <button onClick={closeModal}>close</button>
            </div>
            ) : null}
        </div>
    );
}

export default Modal;
