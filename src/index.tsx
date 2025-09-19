import '@/assets/css/index.css';
import Layout from '@/layout/layout';
import Index from '@/pages';
import Login from '@/pages/login';
import Verify from '@/pages/verify';
import paths from '@/router/paths';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Route,Routes } from 'react-router';

const rootEl = document.getElementById('root');
if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path={`${paths.index}`} element={<Index />} />
                        <Route path={`${paths.login}`} element={<Login />} />
                        <Route path={`${paths.verify}`} element={<Verify />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </React.StrictMode>
    );
}
