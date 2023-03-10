import {Routes, Route} from 'react-router-dom'

import './App.css';
import {DefaultLayout} from './components/Layouts'
import Global from './components/Global';
import {publicRoutes} from './routes'
import { Fragment } from 'react';


function App() {
  return (
    <div className="App">
      <Global>    
          <Routes>
            {publicRoutes.map((route,index) => {
                let Layout = DefaultLayout ;
                if (route.layout)
                  Layout=route.layout
                else if(route.layout===null)
                  Layout = Fragment
              const Page = route.component
              return <Route key={index} 
                            path={route.path}
                            element={
                              <Layout>
                                <Page></Page>
                              </Layout>
                            }
              />
            })}
          </Routes>
      </Global>
    </div>
  );
}

export default App;
