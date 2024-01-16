import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import Swal from 'sweetalert2';

const StoryList = () => {
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

  const bCancel = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure you want to cancel adding the story without saving the data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sure',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStory(); //
      }
    });

  }
  const deleteChapter = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/chapter/${id}`);
      getChapter();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteStory = async () => {
    try {
      await axios.delete(`http://localhost:5000/story/${id}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const bAddChapter = (e) => {
    e.preventDefault();
    saveStory(e);
    navigate(`/add-chapter/${id}`);
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

  const loadImage = (e) => {
    const image = e.target.files[0];
    const imageUrl = URL.createObjectURL(image);
    setStoryCover(imageUrl);
    setCoverImage(image);
  };

  const submitForm = async (e) => {
    e.preventDefault;
    try {
      const p = await saveStory(e);
      navigate("/");
    } catch {
      console.log(ae);
    }
  };
  const saveStory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(title);
    formData.append("file", coverImage);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("synopsis", synopsis);
    formData.append("category", category);
    const tt = taggs.join(",");
    formData.append("tags", tt);
    formData.append("status", status);

    try {
      await axios.patch(`http://localhost:5000/story/${storyId}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      //console.log("test");
      //navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <a type="button" className="text-primary" onClick={() => deleteStory()}>
        <i className="fa fa-arrow-left mx-1 mb-4" aria-hidden="true"></i>
        List Story
      </a>
      <form onSubmit={submitForm}>
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-md-4">
                <h3>Add Story </h3>
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
              <div className="col-md-6">
                <label htmlFor="tags" className="form-label">
                  Tags/keyword story
                </label>
                <TagsInput value={taggs} onChange={handleChange} />
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
                  name="cover_image"
                  onChange={loadImage}
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
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={(e) => bAddChapter(e)}
                >
                  Add Chapter
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Last Updated</th>
                  <th>Action</th>
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
                      <td>
                        <Link
                          to={`/edit-chapter/${c.id}`}
                          className="btn btn-warning mx-1"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => deleteChapter(c.id)}
                          className="btn btn-danger mx-1"
                        >
                          Delete
                        </button>
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
                <button
                  type="button"
                  className="btn btn-outline-primary mx-2"
                  onClick={(e) => bCancel(e)}
                >
                  Cancel
                </button>
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

export default StoryList;
