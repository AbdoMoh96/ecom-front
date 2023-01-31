import React from "react";
import { Routes, BrowserRouter } from "react-router-dom";
import web from "./web/web";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {web()}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;