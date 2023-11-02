import React from 'react';
import Todo from './Components/Todo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SettingsForm from './Components/SettingsForm';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Auth from './Components/Auth';
// import './App.scss';

export default class App extends React.Component {
  render() {
    return (
      <>
          <BrowserRouter>
            <Header />
              <Auth capability="read">
                <h1>My To Do List</h1>
                <Routes>
                  <Route path="/" element={<Todo />} />
                  <Route path="/settings" element={<SettingsForm />} />
                </Routes>
              </Auth>
            <Footer />
          </BrowserRouter>
      </>
    );
  }
}