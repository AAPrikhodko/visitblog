import React from 'react';
import './App.scss';

import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DetailedPost from "./pages/DetailedPost/DetailedPost";
import NewPost from "./pages/NewPost/NewPost";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

function App() {
    return (
      <QueryClientProvider client = {queryClient}>
        <BrowserRouter>
          <div className="app-wrapper">
            <div className='header'><Header /></div>
            <div className='content'>
                <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/:id" element={<DetailedPost />} />
                      <Route path="/:id/:action" element={<DetailedPost />} />
                      <Route path="/create" element={<NewPost />} />
                      <Route path="/404" element={<NotFoundPage />} />
                      <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
            </div>
            <div className='footer'><Footer/></div>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;
