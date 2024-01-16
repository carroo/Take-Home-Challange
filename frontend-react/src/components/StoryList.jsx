import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const StoryList = () => {
  const [story, setStory] = useState([]);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getStory();
    console.log("as");
  }, [search]);

  function generateRandomId() {
    return Math.floor(Math.random() * 1000000);
  }
  const randomId = generateRandomId();
  const getStory = async () => {
    const formData = new FormData();
    formData.append("category", category);
    formData.append("status", status);
    formData.append("search", search);
    const response = await axios.post(
      `http://localhost:5000/story-where`,
      formData,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    setStory(response.data);
  };

  const deleteStory = async (storyId) => {
    try {
      await axios.delete(`http://localhost:5000/story/${storyId}`);
      getStory();
    } catch (error) {
      console.log(error);
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    getStory();
  };
  const reset = (e) => {
    e.preventDefault();
    setCategory('');
    setStatus('');
    setSearch('');
    getStory();
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-md-4">
              <h3>List Story</h3>
            </div>
            <div className="col-md-5">
              <input
                type="search"
                name="search"
                placeholder="search by writer's name / title story"
                className="form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-1">
              <button
                className="btn btn-secondary rounded-circle"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
              >
                <i className="fa fa-filter" aria-hidden="true"></i>
              </button>
            </div>
            <div className="col-md-2 text-end">
              <Link
                to={`/add-story/${randomId}`}
                className="btn btn-primary w-100"
              >
                Add Story
              </Link>
            </div>
          </div>
        </div>

        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Title</th>
                <th>Writer</th>
                <th>Category</th>
                <th>Tags</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {story.map((s) => (
                <tr key={s.id}>
                  <td>{s.title}</td>
                  <td>{s.author}</td>
                  <td>{s.category}</td>
                  <td>
                    {s.tags ? (
                      s.tags.split(",").map((tag, index) => (
                        <span
                          key={index}
                          className="bg-secondary mx-1 px-2 py-1 rounded-pill text-white"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted">kosong</span>
                    )}
                  </td>
                  <td>
                    <span className="bg-secondary mx-1 px-2 py-1 rounded-pill text-white">
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/edit-story/${s.id}`}
                      className="btn btn-warning mx-1"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/detail-story/${s.id}`}
                      className="btn btn-info mx-1"
                    >
                      Detail
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteStory(s.id)}
                      className="btn btn-danger mx-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="modal" id="myModal">
        <div className="modal-dialog nodal-sm">
          <div className="modal-content">
            <form onSubmit={submitForm}>
              <div className="modal-header">
                <h4 className="modal-title">Filter</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                <form action="">
                  <div className="row mb-3 mx-3">
                    <div className="col-md-12">
                      <label htmlFor="category" className="form-label">
                        Category
                      </label>
                      <select
                        name="category"
                        className="form-control"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Choose</option>
                        <option value="Financial">Financial</option>
                        <option value="Technology">Technology</option>
                        <option value="Health">Health</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3 mx-3">
                    <div className="col-md-12">
                      <label htmlFor="status" className="form-label">
                        Status
                      </label>
                      <select
                        name="status"
                        className="form-control"
                        required
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="">Choose</option>
                        <option value="Publish">Publish</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal-footer row">
                <div className="col-md-12">
                  <div className="row mx-3">
                    <div className="col-md-6">
                      <button type="button" className="btn btn-outline-primary"  onClick={(e) => reset(e)}>
                        reset
                      </button>
                    </div>

                    <div className="col-md-6 text-end">
                      <button
                        type="button"
                        className="btn btn-outline-danger mx-3"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>

                      <button type="submit" className="btn btn-primary ">
                        Filter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryList;
