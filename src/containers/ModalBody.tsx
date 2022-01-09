import React from 'react';
import { Modal } from 'react-bootstrap';

interface ModalBodyProps {
    handleForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
// DONT USEFUL NOW

export const ModalBody: React.FC<ModalBodyProps> = ({handleForm}): JSX.Element => {

    return (
        <Modal.Body>
            <div className="mb-3">
                <label htmlFor="item1" className="form-label">Email<span className="text-danger"><strong> *</strong></span></label>
                <input 
                type="email" 
                className="form-control" 
                id="item1" 
                aria-describedby="titleHelp"
                name="email"
                // value={item.email}
                onChange={(e) => handleForm(e)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="item2" className="form-label">Имя пользователя</label>
                <input 
                type="text" 
                className="form-control" 
                id="item2" 
                aria-describedby="descriptionHelp"
                name="name"
                // value={item.name}
                onChange={(e) => handleForm(e)}
                />
                <div id="descriptionHelp" className="form-text">Не более 40 символов</div>
            </div>
            {/* <div className="mb-3">
                <label htmlFor="categoryPriority" className="form-label">Приоритет категории<span className="text-danger"><strong> *</strong></span></label>
                <input 
                type="number" 
                className="form-control" 
                id="categoryPriority" 
                aria-describedby="priorityHelp"
                name="priority"
                value={item.priority}
                onChange={(e) => handleForm(e)}
                />
                <div id="priorityHelp" className="form-text">Первые в списке категории с высшим приоритетом</div>
            </div> */}

        </Modal.Body>
    )
}