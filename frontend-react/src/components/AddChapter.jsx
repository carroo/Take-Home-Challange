import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddChapter = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [storyId, setStoryId] = useState(id);

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const saveChapter = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    try {
      await axios.post(`http://localhost:5000/chapter/${storyId}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate(`/add-story/${storyId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-5">
      <Link to="/">
        <i className="fa fa-arrow-left mx-1 mb-4" aria-hidden="true"></i>
        List Story
      </Link>

      <Link to={`/add-story/${storyId}`}>
        <i className="fa fa-arrow-left mx-1 mb-4" aria-hidden="true"></i>
        Add Story
      </Link>
      <form onSubmit={saveChapter}>
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-md-4">
                <h3>Add Chapter</h3>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  name="content"
                  row="3"
                  data={content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-md-4 ms-auto text-end ">
                <Link
                  to={`/add-story/${storyId}`}
                  className="btn btn-outline-primary mx-2"
                >
                  Cancel
                </Link>
                <button type="submit" className="btn btn-primary mx-2">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddChapter;
