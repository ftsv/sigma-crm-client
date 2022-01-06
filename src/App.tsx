import React, { useContext} from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavbarComp from './components/Navbar';
import ToastMessage from './components/ToastMessage/ToastMessage';
import { AuthContext } from './context/AuthContext';
import ThemeProvider from './context/ThemeContext';
import ToastsProvider, { ToastsContext } from './context/ToastsContext';
import { Routing } from './router';


const App: React.FC = (): JSX.Element => {
  const { token } = useContext(AuthContext);
  const isAuth = !!token;
  // const routes = useRouting(isAuth);
  
  return (
    <>
      <ThemeProvider>
          <ToastsProvider>
              <BrowserRouter>
                {isAuth && <NavbarComp />}
                <Routing />
              </BrowserRouter>
              <ToastsContext.Consumer>
                {value => <ToastMessage 
                  toastList={value.toasts}
                  position="bottom-end" // добавить контекст, для возможности выбора настроек пользователем
                />}
              </ToastsContext.Consumer>
          </ToastsProvider>
      </ThemeProvider>
    </>
    )
}

export default App;
