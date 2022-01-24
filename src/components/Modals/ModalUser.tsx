import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IUser } from '../../types/User'; // make changeable
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

interface ModalProps {
  darkMode: boolean;
  currentItem?: IUser;
  setCurrentItem?: (item: IUser) => {} | void ;
  isShow?: boolean;
  setIsShow?: any;
  addItem?: any;
  editItem?: any;
  btn?: boolean;
}

export const ModalUser: React.FC<ModalProps> = ({
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
  const [showPass, setShowPass] = useState(false);
  const clearItem = {
    name: '',
    email: '',
    password: '',
    roles: [],
    }
  const [item, setItem] = useState<IUser>(clearItem);

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({...item, [e.target.name]: e.target.value});
  }

  const handleSubmit = async () => {
    let success = await addItem(item);
    if (!success) {
      return;
    }
    setShow(false);
    setIsShow && setIsShow(false);
    setItem(clearItem);
    setCurrentItem && setCurrentItem(clearItem);
    setShowPass(false);
  }


  const handleClose = () => {
    setShow(false);
    setIsShow && setIsShow(false);
    setItem(clearItem);
    setCurrentItem && setCurrentItem(clearItem);
    setShowPass(false);
  }

  const handleClear = () => setItem(clearItem);
  

  const handleShow = () => setShow(true);

  const handlePassword = () => setShowPass(!showPass);

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
          Добавить пользователя
        </Button>
      }
      

      <Modal 
        show={show} 
        onHide={handleClose} 
        autoFocus={true}
        keyboard={true}
        className="was-validated"
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавление пользователя</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="mb-3 position-relative">
            <label htmlFor="item1" className="form-label">Email<span className="text-danger"><strong> *</strong></span></label>
            <input 
              type="email" 
              className="form-control" 
              id="item1" 
              aria-describedby="titleHelp"
              name="email"
              autoComplete="email"
              value={item.email}
              onChange={(e) => handleForm(e)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="itemLN" className="form-label">Фамилия</label>
            <input 
              type="text" 
              className="form-control" 
              id="item2" 
              aria-describedby="itemLNHelper"
              name="lastName"
              autoComplete="family-name"
              value={item.lastName ? item.lastName : ''}
              onChange={(e) => handleForm(e)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="itemN" className="form-label">Имя</label>
            <input 
              type="text" 
              className="form-control" 
              id="itemN" 
              aria-describedby="itemNHelper"
              name="name"
              autoComplete="given-name"
              value={item.name ? item.name : ''}
              onChange={(e) => handleForm(e)}
            />
            {/* <div id="itemNHelper" className="form-text">Не более 40 символов</div> */}
          </div>

          <div className="mb-3">
            <label htmlFor="itemMN" className="form-label">Отчество</label>
            <input 
              type="text" 
              className="form-control" 
              id="item2" 
              aria-describedby="itemMNHelper"
              name="middleName"
              autoComplete="additional-name"
              value={item.middleName ? item.middleName : ''}
              onChange={(e) => handleForm(e)}
            />
          </div>

          <label htmlFor="item3" className="form-label">Пароль<span className="text-danger"><strong> *</strong></span></label>
          <div className="input-group mb-3">
            <input 
              type={showPass ? "text" : "password"} 
              className="form-control" 
              id="item3" 
              aria-describedby="item3Helper"
              name="password"
              autoComplete="new-password"
              value={item.password}
              onChange={(e) => handleForm(e)}
              required
            />
            <button
              id="item3Helper" 
              className="btn btn-outline-secondary"
              type="button"
              onClick={handlePassword}
            >
              {showPass ? <EyeSlashFill /> : <EyeFill />}
            </button>
          </div>
          {/* Добавить Список Ролей */}
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
