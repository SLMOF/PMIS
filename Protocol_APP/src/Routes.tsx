import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import AccountRoutes from './auth/Routes';

interface IProps {
    history: any;
}

const AppRoutes: React.FC<IProps> = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/*" element={<AccountRoutes />} />
                <Route path="*" element={<App />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes