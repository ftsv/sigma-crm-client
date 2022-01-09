import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryStringCreator from '../services/query-string-creator';
import cn from 'classnames';

import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { ToastsContext } from '../context/ToastsContext';
import { ModalCategory } from '../components/Modals/ModalCategory';
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
    } catch (e: any) {}
  }

  const addItem = React.useCallback(async (item) => {
    try {
      await request('/api/category/add', 'POST', {...item},{
                Authorization: `Bearer ${auth.token}` 
            })
      addToast("Выполнено", `Категория ${item.title.toLowerCase()} создана!`, "success", 7000)
    } catch (e: any) {}

    fetch();
  },[])

  const editItem = React.useCallback(async (item: ICategory) => {
    try {
      await request(`/api/category/${item._id}`, 'PUT', {...item},{
          Authorization: `Bearer ${auth.token}` 
      });
      addToast("Выполнено", `Категория ${item.title.toLowerCase()} изменена!`, "success", 7000)
    } catch (e: any) {}
    
    fetch();
  },[])

  React.useEffect(() => {
      error !== null && addToast('Ошибка', `${error}`, 'danger',7000);
  }, [error, addToast]);

  React.useEffect(() => {
      location.search = queryStringCreator(pagination);
      fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination?.page, pagination?.limit]);

  React.useEffect(() => {
    document.title = "Категории";
  }, []);
  return (
    <div className="container">
      <ModalCategory darkMode={darkMode} addCategory={addItem} />
      <div>
        {loading 
          ? (<div className="container justify-content-center mt-3">
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
                editCategory={editItem} 
                fetchCategories={fetch}
              />
            </div>
          )
        }
      </div>
    </div>
  );
}
