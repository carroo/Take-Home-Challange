import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import Swal from "sweetalert2";

const DetailStory = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [taggs, setTaggs] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [storyCover, setStoryCover] = useState();
  const [status, setStatus] = useState("Publish");
  const [storyId, setStoryId] = useState(id);
  const [chapter, setChapter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    addTemp();
    getChapter();
  }, []);

  const handleChange = (newTaggs) => {
    setTaggs(newTaggs);
  };

  const getChapter = async () => {
    const response = await axios.get(
      `http://localhost:5000/chapter-story/${id}`
    );
    setChapter(response.data);
  };


  const addTemp = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/story/${storyId}`
      );
      const data = response.data;
      setTitle(data.title);
      setAuthor(data.author);
      setSynopsis(data.synopsis);
      setCategory(data.category);
      setTags(data.tags);
      setTaggs(data.tags.split(","));
      setStoryCover(data.story_cover);
      setStatus(data.status);
    } catch (error) {
      console.error("Error posting Storytemp:", error);
    }
  };


  return (
    <div className="container mt-5">
      <Link to={`/`}>
        <i className="fa fa-arrow-left mx-1 mb-4" aria-hidden="true"></i>
        List Story
      </Link>
      <form>
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-md-4">
                <h3>Detail Story </h3>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="author" className="form-label">
                  Writer Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  name="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="synopsis" className="form-label">
                  Synopsis
                </label>
                <textarea
                  name="synopsis"
                  className="form-control"
                  readOnly
                  rows="3"
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  name="category"
                  className="form-control"
                  readOnly
                  required
                  disabled
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose</option>
                  <option value="Financial">Financial</option>
                  <option value="Technology">Technology</option>
                  <option value="Health">Health</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="tags" className="form-label">
                  Tags/keyword story
                </label>
                <TagsInput value={taggs} disabled onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="cover_image" className="form-label">
                  Cover Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  readOnly
                  name="cover_image"
                />
                {storyCover ? (
                  <img
                    src={storyCover}
                    width={`100px`}
                    className="img-rounded"
                    alt="Cinque Terre"
                  ></img>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  name="status"
                  className="form-control"
                  readOnly
                  disabled
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Publish">Publish</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-md-3 ms-auto">
                
              </div>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {chapter ? (
                  chapter.map((c) => (
                    <tr key={c.id}>
                      <td>{c.title}</td>
                      <td>
                        {new Date(c.updatedAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-md-4 ms-auto text-end ">
                <Link to={`/`} className="btn btn-outline-primary mx-2">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DetailStory;
