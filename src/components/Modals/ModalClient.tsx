import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IClient } from '../../types/Client'; // make changeable

interface ModalProps {
  darkMode: boolean;
  currentItem?: IClient;
  setCurrentItem?: (item: IClient) => {} | void ;
  isShow?: boolean;
  setIsShow?: any;
  addItem?: any;
  editItem?: any;
  btn?: boolean;
}

export const ModalClient: React.FC<ModalProps> = ({
  darkMode, 
  isShow, 
  setIsShow, 
  currentItem, 
  setCurrentItem, 
  addItem, 
  editItem , 
  btn = true,
}) => {
  const [show, setShow] = useState(isShow);
  const clearItem = {
        _id: '',
        lastName: '',
        firstName: '',
        middleName: '',
        contacts: {},
        manager: '',
    }
  const [item, setItem] = useState<IClient>(clearItem);

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({...item, [e.target.name]: e.target.value})
  }

  const handleSubmit = () => {
    addItem(item);
    setShow(false);
    setIsShow && setIsShow(false);
    setItem(clearItem);
    setCurrentItem && setCurrentItem(clearItem);
  }


  const handleClose = () => {
    setShow(false);
    setIsShow && setIsShow(false);
    setItem(clearItem);
    setCurrentItem && setCurrentItem(clearItem);
  }

  const handleClear = () => setItem(clearItem);
  

  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(isShow);
    currentItem && setItem(currentItem)
  }, [isShow, currentItem])

  return (
    <>
      {btn &&
        <Button
          variant="primary"
          size="sm"
          onClick={handleShow}
        > 
          Добавить категорию
        </Button>
      }
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавление категории</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="categoryTitle" className="form-label">Наименование категории дела<span className="text-danger"><strong> *</strong></span></label>
            <input 
              type="text" 
              className="form-control" 
              id="categoryTitle" 
              aria-describedby="titleHelp"
              name="title"
              value={item.lastName}
              onChange={(e) => handleForm(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoryDescription" className="form-label">Описание категории</label>
            <input 
              type="text" 
              className="form-control" 
              id="categoryDescription" 
              aria-describedby="descriptionHelp"
              name="description"
              value={item.firstName}
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
        <Modal.Footer>
          <Button variant={darkMode ? "outline-secondary" : "secondary"} onClick={handleClear} size="sm">
            Очистить форму
          </Button>
          <Button variant={darkMode ? "outline-secondary" : "secondary"} onClick={handleClose} size="sm">
            Отменить
          </Button>
          {isShow 
          ? (<Button variant="primary" onClick={() =>  editItem(item) } size="sm">
              Изменить
            </Button>)
          : (<Button variant="primary" onClick={ handleSubmit } size="sm">
              Создать
            </Button>)}
        </Modal.Footer>
      </Modal>
    </>
  );
}
