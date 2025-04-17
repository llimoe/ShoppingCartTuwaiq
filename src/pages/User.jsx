import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Bounce, toast } from "react-toastify";

function User() {
  const { id } = useParams();           // يجيب قيمة :id من الرابط
  const [form, setForm] = useState({ username: "", email: "" });

  const MySwal = withReactContent(Swal);

  const [users, setUsers] = useState([]);

  const [userData, setUserData] = useState({});

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/users");
    const usersData = res.data;
    setUsers(usersData);
  };
  const notify = () =>
    toast("User Add successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  const AddUsers = () => {
    const res = axios
      .post("http://localhost:3000/users", userData)
      .then((data) => console.log(data))
      .then((result) => {});
    notify();
  };

  const DeleteUser = async (id) => {
    const res = await axios.delete(`http://localhost:3000/users/${id}`, {});
    MySwal.fire("User Deleted !!");
  };

  useEffect(() => {
    fetch(`https://fakestoreapi.com/users/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  
      if (users) {
        setForm({
          username: users.username,
          email: users.email,
        });
      }
    }, [id],[users]);

 
  if (loading) return <p>Loading..</p>;
  if (error)   return <p>Error: {error}</p>;


  

  const handleFrom = (e) => {
    e.preventDefault();
    console.log(userData);
    AddUsers(userData);
  };

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`https://fakestoreapi.com/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(updated => {
        alert("Update done!");
        setUsers(updated);
      })
      .catch(err => alert("error: " + err.message));
  };

  return (
    
    
    <div>
      <h2>Edit Name#{id}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>name :</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save changes</button>
      </form>
      <Header />
      <div className="container">
        <div className="row">
          <h2 className="text-center">Users List </h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col"> Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => {
                return (
                  <tr key={user.id}>
                    <th>{user.id}</th>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="row">
                        <div className="col">
                          <button className="btn btn-info">Edit name </button>
                        </div>
                        <div className="col">
                          <button
                            onClick={() => DeleteUser(user.id)}
                            className="btn btn-danger"
                          >
                            Delete{" "}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <h1>Add User</h1>
          <form onSubmit={handleFrom}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={userData.name}
                onChange={(e) => {
                  setUserData((prev) => {
                    return {
                      ...prev,
                      name: e.target.value,
                    };
                  });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                username
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={userData.username}
                onChange={(e) => {
                  setUserData((prev) => {
                    return {
                      ...prev,
                      username: e.target.value,
                    };
                  });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={userData.email}
                onChange={(e) => {
                  setUserData((prev) => {
                    return {
                      ...prev,
                      email: e.target.value,
                    };
                  });
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User;
