import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StoryList from "./components/StoryList";
import AddStory from "./components/AddStory";
import AddChapter from "./components/AddChapter";
import EditChapter from "./components/EditChapter";
import DetailStory from "./components/DetailStory";
import EditStory from "./components/EditStory";

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <h2>
              <i className="fa fa-book mx-2" aria-hidden="true"></i>
              Storyku
            </h2>
          </a>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="row mt-5">
              <a href="" className="my-2">
                <i className="fa fa-home" aria-hidden="true"></i> Home
              </a>
              <a href="" className="my-2">
                <i className="fa fa-download" aria-hidden="true"></i> Manajemen Story
              </a>
            </div>
          </div>
          <div className="col-md-9">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<StoryList />} />
                <Route path="/add-story/:id" element={<AddStory />} />
                <Route path="/add-chapter/:id" element={<AddChapter />} />
                <Route path="/edit-chapter/:id" element={<EditChapter />} />
                <Route path="/detail-story/:id" element={<DetailStory />} />
                <Route path="/edit-story/:id" element={<EditStory />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
