import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const DashBoard = lazy(()=>import("./components/Dashboard"))
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route element={<Contact />}>
              <Route index element={<ContactList />} />
              <Route path="/form" element={<ContactForm />} />
            </Route>
            <Route path="/dashboard" element={
              <Suspense fallback={<h3>Loading...</h3>}><DashBoard/></Suspense>
            }></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
