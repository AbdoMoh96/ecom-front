import React from "react";
import { Route, Navigate } from "react-router-dom";
import Products from "../../Pages/Products";

const MainRoutes = () => {
    return (
        <>
            <Route path="/" element={<Navigate to="/products/list" />} />
            <Route path="/products/list" element={<Products />} />
        </>
    );
};

export default MainRoutes;