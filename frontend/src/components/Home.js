import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import "./style.css";

function Home() {
  const [data, setData] = useState([]);
  const [s, setS] = useState([]);
  const [id, setId] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/readData").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, [s]);

  const adddata = () => {
    axios
      .post("http://localhost:3000/addData", {
        id: id,
        username: name,
        email: email,
      })
      .then(() => {
        setS([...s, 1]);
      });
  };

  const updatedata = () => {
    axios
      .put(`http://localhost:3000/update/${id}`, {
        username: name,
        email: email,
      })
      .then(() => {
        setS([...s, 1]);
      });
  };

  const deletdata = (e) => {
    axios.delete(`http://localhost:3000/delete/${e}`).then(() => {
      setS([...s, 1]);
    });
  };

  return (
    <div>
      <div id="fgp">
        <Form className="d-flex">
          <Form.Group id="s" className="mb-3">
            <Form.Label>Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter id"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group id="s" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user Name"
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group id="s" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter e-mail"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </Form.Group>

          <Button id="subtn" onClick={adddata} variant="primary">
            Submit
          </Button>
          <Button
            id="subtn"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              updatedata();
            }}
            variant="success"
          >
            Update
          </Button>
        </Form>
      </div>
      <div id="table">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>User Name</th>
              <th>email</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>

                  <td style={{ width: "50px" }}>
                    <Button
                      id={item.id}
                      onClick={(e) => {
                        deletdata(e.target.id);
                      }}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Home;
