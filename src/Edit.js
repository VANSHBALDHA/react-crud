import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Edit() {
  const navigate = useNavigate();
  const userId = useParams();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get(`https://63b3f7299f50390584a2c2aa.mockapi.io/crud/${userId.id}`)
      .then((response) => {
        const data = response.data;
        setName(data.e_name);
        setAge(data.e_age);
        setEmail(data.e_email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId.id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!name || !email || !age) {
      toast.warning("Please fill all fields!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 500,
      });
    } else {
      toast.success("data Update Successfully !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 500,
      });

      axios
        .put(`https://63b3f7299f50390584a2c2aa.mockapi.io/crud/${userId.id}`, {
          e_name: name,
          e_age: age,
          e_email: email,
        })
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="text-center">
            <h1>Update Data</h1>
          </div>
          <div className="col-md-12">
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>userId:</label>
                <input
                  type="text"
                  value={userId.id}
                  placeholder="id"
                  className="form-control"
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Enter Name: </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Enter Email: </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Enter Age: </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                  className="form-control"
                />
              </div>

              <br />
              <div className="d-grid">
                <input
                  type="submit"
                  value="Update"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edit;
