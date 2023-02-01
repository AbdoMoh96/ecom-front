import React from "react";
import { Route, Navigate } from "react-router-dom";
import Products from "../../Pages/Products";
import CreateProduct from "../../Pages/CreateProduct";

const MainRoutes = () => {
    return (
        <>
            <Route path="/" element={<Navigate to="/products/list" />} />
            <Route path="/products/list" element={<Products />} />
            <Route path="/products/new" element={<CreateProduct />} />
        </>
    );
};

export default MainRoutes;