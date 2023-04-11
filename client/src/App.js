import { useState, useEffect, Fragment } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import axios from 'axios';
import { DefaultLayout } from "./components/Layouts";
import Global from "./components/Global";
import "./App.css";

function App() {
  const [auth, setAuth] = useState(false);
    useEffect(() => {
        async function checkAuth(res) {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get('http://localhost:5000/auth/verifyToken', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                response.status === 200 ? setAuth(true) : setAuth(false);
            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
            
        }
        checkAuth();
    }, []);
    return (
        <div className="App">
            <Global>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                            (!auth && 
                            <Fragment>
                                <Page></Page>
                            </Fragment>) || <Navigate to="/dashboard"/>
                            }
                        />
                        );
                    })}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                            (auth && 
                            <DefaultLayout>
                                <Page></Page>
                            </DefaultLayout>) || <Navigate to="/login"/>
                            }
                        />
                        );
                    })}
                </Routes>
            </Global>
        </div>
    );
}

export default App;
