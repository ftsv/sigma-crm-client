import React, { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/useHttp';
import { ICategory } from '../types/Category';
import { ModalCategory } from './ModalCategory';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PencilFill, TrashFill } from 'react-bootstrap-icons';
import cn from 'classnames';
import { ToastsContext } from '../context/ToastsContext';

interface CategoryListProps {
  darkMode: boolean;
  categories: ICategory[];
  editCategory?: any;
  fetchCategories: any;
}

//USER_MODEL_INTERFACE
export const CategoryList: React.FC<CategoryListProps> = ({darkMode, categories, editCategory, fetchCategories}) => {
  const auth = useContext(AuthContext);
  const { addToast } = useContext(ToastsContext);
  const { request } = useHttp();
  const [isShow, setIsShow] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<ICategory>({
    title: "",
    description: "",
    priority: 1,
  });

  const deleteCategory = useCallback(async (category: ICategory) => {
    try {
      await request(`/api/category/${category._id}`, 'DELETE', null, {
        Authorization: `Bearer ${auth.token}` 
      })
      fetchCategories();
      addToast("Внимание!", `Категория ${category.title} удалена!`, "warning", 3000)
    } catch (e) {
        addToast("Ошибка", ``, "danger", 5000);
        console.log(e);
        
    }
    

  }, [])

  const showModal = (category: ICategory) => {
    setCurrentCategory(category);
    setIsShow(true);
  }

  if (categories.length < 1){
    return (
      <div className="container" style={{marginTop: "20px"}}>
        <span>Категории отсутствуют, добавьте первую категорию</span>
      </div>
    )}

  return (
    <div className="container" style={{marginTop: "20px"}}>
        <table className={cn("table", "table-sm", "table-hover", "table-bordered", 
            {
                ['table-dark']: darkMode,
            }
        )}>
          <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Наименование</th>
                  <th scope="col">Описание</th>
                  <th scope="col">Приоритет</th>
                  <th scope="col">Действия</th>
              </tr>
          </thead>
          <tbody>
            {categories.map((category, i: number) => (
              <tr key={category.title}>
                  <td>{i+1}</td>
                  <td>{(category.title.length > 40)
                  ? (<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{category.title}</Tooltip>}>
                      <span>{category.title.slice(0, 37) + "..."}</span>
                    </OverlayTrigger>)
                  
                  : category.title}</td>
                  <td>{(category.description.length > 40)
                  ? (<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{category.description}</Tooltip>}>
                      <span>{category.description.slice(0, 37) + "..."}</span>
                    </OverlayTrigger>)
                  
                  : category.description}</td>
                  <td>
                    {category.priority}
                  </td>
                  <td className="d-flex justify-content-end">
                    <Button variant={darkMode ? "primary" : "outline-primary"}
                      size="sm"
                      onClick={() => showModal(category)}
                    >
                      <PencilFill />
                    </Button>
                    <Button variant={darkMode ? "danger" : "outline-danger"}
                      disabled={category.isBlocked}
                      size="sm"
                      onClick={() => deleteCategory(category)}
                      style={{marginLeft: "10px"}}
                    >
                      <TrashFill />
                    </Button>
                  </td>
              </tr>))}
          </tbody>
        </table>
        <ModalCategory 
          darkMode={darkMode} 
          isShow={isShow} 
          setIsShow={setIsShow} 
          currentCategory={currentCategory} 
          setCurrentCategory={setCurrentCategory}
          editCategory={editCategory}
          btn={false}
        />
      </div>)
}
