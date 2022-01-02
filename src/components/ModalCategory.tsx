import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ICategory } from '../types/Category';

interface ModalCategoryProps {
  darkMode: boolean;
  currentCategory?: ICategory;
  setCurrentCategory?: (category: ICategory) => {} | void ;
  isShow?: boolean;
  setIsShow?: any;
  addCategory?: any;
  editCategory?: any;
  btn?: boolean;
}

export const ModalCategory: React.FC<ModalCategoryProps> = ({darkMode, isShow, setIsShow, currentCategory, setCurrentCategory, addCategory, editCategory , btn = true}, ) => {
  const [show, setShow] = useState(isShow);
  const clearCategory = {
    title: "",
    description: "",
    priority: 1,
    createDate: ""
  }
  const [category, setCategory] = useState<ICategory>(clearCategory)

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({...category, [e.target.name]: e.target.value})
  }

  const handleSubmit = () => {
    addCategory(category);
    setShow(false);
    setIsShow && setIsShow(false);
    setCategory(clearCategory);
    setCurrentCategory && setCurrentCategory(clearCategory);
  }


  const handleClose = () => {
    setShow(false);
    setIsShow && setIsShow(false);
    setCategory(clearCategory);
    setCurrentCategory && setCurrentCategory(clearCategory);
  }

  const handleClear = () => setCategory(clearCategory);
  

  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(isShow);
    currentCategory && setCategory(currentCategory)
  }, [isShow, currentCategory])

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
              value={category.title}
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
              value={category.description}
              onChange={(e) => handleForm(e)}
            />
            <div id="descriptionHelp" className="form-text">Не более 40 символов</div>
          </div>
          <div className="mb-3">
            <label htmlFor="categoryPriority" className="form-label">Приоритет категории<span className="text-danger"><strong> *</strong></span></label>
            <input 
              type="number" 
              className="form-control" 
              id="categoryPriority" 
              aria-describedby="priorityHelp"
              name="priority"
              value={category.priority}
              onChange={(e) => handleForm(e)}
            />
            <div id="priorityHelp" className="form-text">Первые в списке дела с высшим приоритетом</div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant={darkMode ? "outline-secondary" : "secondary"} onClick={handleClear} size="sm">
            Очистить форму
          </Button>
          <Button variant={darkMode ? "outline-secondary" : "secondary"} onClick={handleClose} size="sm">
            Отменить
          </Button>
          {isShow 
          ? (<Button variant="primary" onClick={() =>  editCategory(category) } size="sm">
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
