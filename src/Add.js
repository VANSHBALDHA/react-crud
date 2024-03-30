import React, { useState } from "react";
import "./Add.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    age: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.age) {
      toast.warning("Please fill all fields !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 500,
      });
    } else {
      toast.success("data Added successfully !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 500,
      });
      axios
        .post("https://63b3f7299f50390584a2c2aa.mockapi.io/crud", {
          e_name: user.name,
          e_age: user.age,
          e_email: user.email,
        })
        .then(() => {
          navigate("/");
        })
        .catch((err) => console.log(err));
      setUser({
        name: "",
        age: "",
        email: "",
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div>
            <h2 style={{ textAlign: "center" }}>Add data here</h2>
          </div>
          <div className="col-md-12">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter name"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputAge">Age</label>
                <input
                  type="number"
                  id="exampleInputAge"
                  name="age"
                  className="form-control"
                  placeholder="Enter Age"
                  onChange={handleChange}
                />
              </div>
              <div className="pt-3">
                <button className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
