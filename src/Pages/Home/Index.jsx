import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import shortid from "shortid";

let id = "";

let CONTACT_FORM_INIT_STATE = {
  name: "",
  email: "",
  phone: "",
  id: "",
  school: "",
  age: "",
};

const Home = () => {
  const [values, setValues] = useState({ ...CONTACT_FORM_INIT_STATE });
  const [st, setSt] = useState([]);
  const [filters, setFilters] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("")
  const { name, email, phone, school, age } = values;

  const hanldeChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      id: id,
    });
  };

  const hanldeFilter = (e) => {
    setFilters(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (st.find((i) => i.id === values.id)) {
      console.log("NOT Create");
      toast.error("Sorry this student already exists ", {
        position: "top-right",
        theme: "colored",
      });
    } else {
      setSt([...st, values]);
      toast.success("Congratulations you have student created successfully", {
        position: "top-right",
        theme: "colored",
      });
    }
    console.log(st, "store data");
    console.log(values, "upcoming store");
  };

  useEffect(() => {
    id = shortid.generate();
  }, [name, email, phone, school]);

  let filteredStudent = [];

  if (filters === "All") {
    filteredStudent = st
  } else {
    filteredStudent = st.filter((item) => item.school === filters);
  }

  if (searchTerm) {
    filteredStudent = filteredStudent.filter((searchItem)=> searchItem.name.includes(searchTerm))
  }

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", color: "#4b60b5" }}>Student Portal</h1>
      <hr />
      <br />
      <div className="add_newFrom">
        <span className="add_title">Add New Student</span>
        <br />
        <hr />
        <br />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required={true}
            value={name}
            onChange={hanldeChange}
            className="input_style"
            placeholder="Name"
            name="name"
          />
          <input
            type="email"
            required={true}
            value={email}
            onChange={hanldeChange}
            className="input_style"
            placeholder="Email"
            name="email"
          />
          <input
            type="number"
            className="input_style"
            onChange={hanldeChange}
            placeholder="Mobile Number"
            name="phone"
            value={phone}
          />{" "}
          <input
            className="input_style"
            type="date"
            value={age}
            name="age"
            onChange={hanldeChange}
          />
          <select
            className="input_styles"
            name="school"
            value={school}
            onChange={hanldeChange}
          >
            <option value="sdfs">Select School</option>
            <option value="Purulia ML High School">
              Purulia ML High School
            </option>
            <option value="Chandrapur High School">
              Chandrapur High School
            </option>
            <option value="Dhaka High School">Dhaka High School</option>
          </select>
          <br /> <br />
          <input
            type="submit"
            className="buttons"
            value={"Add Student"}
            placeholder="Address"
          />
        </form>
      </div>
      <div className="sapaidBorder">
        <h1 style={{ textAlign: "center", color: "rgb(29 31 42)" }}>
          Student Datails
        </h1>
        <hr />
      </div>

      <div className="table_style">
        <div className="d" style={{ width: "100%", display: "flex" }}>
          <select
            className="input_styles"
            value={filters}
            onChange={hanldeFilter}
            style={{ width: "50%" }}
          >
            <option value="All">ALL</option>
            <option value="Purulia ML High School">
              Purulia ML High School
            </option>
            <option value="Chandrapur High School">
              Chandrapur High School
            </option>
            <option value="Dhaka High School">Dhaka High School</option>
          </select>{" "}
          <input
            type="text"
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            className="searchBtn"
            placeholder="Search"
            style={{ width: "50%" }}
          />
        </div>
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Brith Date</th>
            <th>School Name</th>
            <th>Student ID</th>
          </tr>

          {filteredStudent.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.age}</td>
              <td>{item.school}</td>
              <td>{item.id}</td>
            </tr>
          ))}

          {/* <div class="pagination">
            <a href="#">&laquo;</a>
            <a href="#">1</a>
            <a class="active" href="#">
              2
            </a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">&raquo;</a>
          </div> */}
        </table>
      </div>
      <br />
    </div>
  );
};

export default Home;
