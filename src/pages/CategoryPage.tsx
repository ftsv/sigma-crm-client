import React, { useCallback, useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { ToastsContext } from '../context/ToastsContext';
import { ModalCategory } from '../components/ModalCategory';
import { useHttp } from '../hooks/useHttp';
import { ICategory } from '../types/Category';
import { CategoryList } from '../components/CategoryList';
import { Spinner } from 'react-bootstrap';

export const CategoryPage = () => {
  const auth = useContext( AuthContext );
  const { darkMode } = useContext(ThemeContext);
  const { addToast } = useContext(ToastsContext);
  const { request, error, loading } = useHttp();
  const [categories, setCategories] = useState<ICategory[]>([]);

  const addCategory = useCallback(async (category) => {
    try {
      await request('/api/category/add', 'POST', {...category},{
                Authorization: `Bearer ${auth.token}` 
            })
      addToast("Выполнено", `Категория ${category.title} создана!`, "success", 7000)
    } catch (e: any) {
        addToast("Ошибка", `${e}`, "danger", 7000);
        console.log(e);
    }

    fetchCategories();
  },[auth.token, request])

  const editCategory = useCallback(async (category: ICategory) => {
    try {
      const editedCategory = await request(`/api/category/${category._id}`, 'PUT', {...category},{
          Authorization: `Bearer ${auth.token}` 
      });
      addToast("Выполнено", `Категория ${category.title} изменена!`, "success", 7000)
    } catch (e: any) {
      addToast("Ошибка", `${e}`, "danger", 7000);
        console.log(e);
    }
    
    fetchCategories();
  },[auth.token, request])

  const fetchCategories = useCallback(async () => {
        try {
            const fetched = await request('/api/category/all', 'GET', null, {
                Authorization: `Bearer ${auth.token}` 
            });

            setCategories(fetched);
        } catch (e: any) {
            addToast("Ошибка", `${e}`, "danger", 7000);
        console.log(e);
        }
    },[auth.token, request])

    useEffect(() => {
        fetchCategories()
    }, []);


  return (
    <div className={cn({
                        ['bg-dark']: darkMode,
                        ['text-white']: darkMode,
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
                    </div>)
                    : <CategoryList 
                        darkMode={darkMode} 
                        categories={categories} 
                        editCategory={editCategory} 
                        fetchCategories={fetchCategories}
                      />}
        </div>
      </div>
    </div>
  );
}
