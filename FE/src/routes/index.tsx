import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Playground from '../components/PlayGround';
import ProtectedRoute from '../components/ProtectedRoute';
import Authentication from '../modules/Auth';
import { AuthStoreProvider } from '../modules/Auth/store';
import Products from '../modules/Products';

const BrowserRouter = () => {
    return (
        <AuthStoreProvider>
            <Router>
                <Routes>
                    <Route path="/auth/*" element={<Authentication />} />
                    <Route
                        path="/products/*"
                        element={
                            <ProtectedRoute>
                                <Products />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/*" element={<Navigate to="/products" replace />} />
                </Routes>
            </Router>
        </AuthStoreProvider>
    );
};
export default BrowserRouter;
