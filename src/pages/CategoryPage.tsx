import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryStringCreator from '../services/query-string-creator';

import cn from 'classnames';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { ToastsContext } from '../context/ToastsContext';
import { ModalCategory } from '../components/ModalCategory';
import { useHttp } from '../hooks/useHttp';
import { ICategory } from '../types/Category';
import { CategoryList } from '../components/CategoryList';
import { Spinner } from 'react-bootstrap';
import { Pagination } from '../components/Pagination';

export const CategoryPage = () => {
  const auth = useContext( AuthContext );
  const { darkMode } = useContext(ThemeContext);
  const { addToast } = useContext(ToastsContext);
  const location = useLocation();
  const { request, error, loading } = useHttp();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [pagination, setPagination] = useState({page: 1, limit: 10, total: 0, pages: 0, skip: 0}); // возможно необходимо сделать контекст фильтра в localStorage для первичного отображения

  const fetch = async () => {
          try {
              const {pagination, categories} = await request(`/api/category/all${location.search}`,'GET', null, {
                  Authorization: `Bearer ${auth.token}` 
              });
              setPagination(pagination);
              setCategories(categories);
          } catch (e: any) {
              addToast('Ошибка', `${e}`, 'danger', 7000);
          }
      }

  const addCategory = React.useCallback(async (category) => {
    try {
      await request('/api/category/add', 'POST', {...category},{
                Authorization: `Bearer ${auth.token}` 
            })
      addToast("Выполнено", `Категория ${category.title} создана!`, "success", 7000)
    } catch (e: any) {
        addToast("Ошибка", `${e}`, "danger", 7000);
        console.log(e);
    }

    fetch();
  },[auth.token, request])

  const editCategory = React.useCallback(async (category: ICategory) => {
    try {
      await request(`/api/category/${category._id}`, 'PUT', {...category},{
          Authorization: `Bearer ${auth.token}` 
      });
      addToast("Выполнено", `Категория ${category.title} изменена!`, "success", 7000)
    } catch (e: any) {
      addToast("Ошибка", `${e}`, "danger", 7000);
        console.log(e);
    }
    
    fetch();
  },[auth.token, request])

  React.useEffect(() => {
      error !== null && addToast('Ошибка', `${error}`, 'danger',7000);
  }, [error, addToast]);

  React.useEffect(() => {
      location.search = queryStringCreator(pagination);
      fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination?.page, pagination?.limit]);

  return (
    <div className={cn({
                        'bg-dark': darkMode,
                        'text-white': darkMode,
                    }
                    )}
      style={{minHeight: "100vh", padding: "80px 0"}}
    >
      <div className="container">
        <ModalCategory darkMode={darkMode} addCategory={addCategory} />
        <div>
          {loading 
            ? (<div className="container justify-content-center" style={{marginTop: "20px"}}>
                <Spinner animation="border" variant="secondary" />
              </div>
            )
            : (<div>
                <Pagination
                  pagination={pagination}
                  setPagination={setPagination}
                  darkMode={darkMode}
                  total={true}
                  limit={true}
                />
                <CategoryList 
                  darkMode={darkMode} 
                  categories={categories} 
                  editCategory={editCategory} 
                  fetchCategories={fetch}
                />
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
