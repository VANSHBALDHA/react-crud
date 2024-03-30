import React, { useState, useEffect } from "react";
import "./Demo.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Demo = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    fetch("https://63b3f7299f50390584a2c2aa.mockapi.io/crud")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    toast.success("data delete Successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 500,
    });

    axios
      .delete(`https://63b3f7299f50390584a2c2aa.mockapi.io/crud/${id}`)
      .then(() => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container">
        <div>
          <h1 style={{ textAlign: "center" }}>Crud Operation</h1>
        </div>
        <div className="add">
          <button
            className="btn btn-outline-dark"
            onClick={() => navigate("/add")}
          >
            Add +
          </button>
        </div>
        <div className="position-relative">
          {loading ? (
            <div class="loader" id="loader-4">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            <>
              <table className="table">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Action</th>
                </tr>
                {data.map((dummytable, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{dummytable.id}</td>
                        <td>{dummytable.e_name}</td>
                        <td>{dummytable.e_email}</td>
                        <td>{dummytable.e_age}</td>
                        <td>
                          <Link to={`edit/${dummytable.id}`}>
                            <button className="btn btn-primary">Edit</button>
                          </Link>

                          <Link>
                            <Link
                              className="btn btn-danger"
                              onClick={() => handleDelete(dummytable.id)}
                            >
                              delete
                            </Link>
                          </Link>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Demo;
