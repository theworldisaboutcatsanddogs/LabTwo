import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
    const { id } = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [ageError, setAgeError] = useState("");
    const [numberError, setNumberError] = useState("");
    const [addressError, setAddressError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/get/` + id);
                console.log(response);
                setName(response.data.name);
                setEmail(response.data.email);
                setAge(response.data.age);
                setNumber(response.data.number);
                setAddress(response.data.address);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        let isError = false;

        // Reset previous error messages
        setNameError("");
        setEmailError("");
        setAgeError("");
        setNumberError("");
        setAddressError("");

        if (!name) {
            setNameError("Name is required");
            isError = true;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            setNameError("Name should contain only alphabets");
            isError = true;
        } else {
            setNameError("");
        }     

        if (!email) {
            setEmailError("Email is required");
            isError = true;
        }

        if (!age) {
            setAgeError("Age is required");
            isError = true;
        } else if (isNaN(age)) {
            setAgeError("Age must be a number");
            isError = true;
        }

        if (!number) {
            setNumberError("Number is required");
            isError = true;
        } else if (number.length !== 11 || isNaN(number)) {
            setNumberError("Number should be 11 digits");
            isError = true;
        }

        if (!address) {
            setAddressError("Address is required");
            isError = true;
        }

        if (!isError) {
            axios
                .put(`http://localhost:3000/update/` + id, { name, email, age, number, address })
                .then((res) => {
                    console.log(res);
                    navigate("/");
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Update User</h2>
                            <form onSubmit={handleUpdate}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={`form-control ${nameError ? "is-invalid" : ""}`}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    {nameError && <div className="invalid-feedback">{nameError}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`form-control ${emailError ? "is-invalid" : ""}`}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {emailError && <div className="invalid-feedback">{emailError}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="age">Age</label>
                                    <input
                                        type="number"
                                        id="age"
                                        className={`form-control ${ageError ? "is-invalid" : ""}`}
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                    {ageError && <div className="invalid-feedback">{ageError}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="number">Number</label>
                                    <input
                                        type="tel"
                                        id="number"
                                        className={`form-control ${numberError ? "is-invalid" : ""}`}
                                        value={number}
                                        onChange={(e) => setNumber(e.target.value)}
                                    />
                                    {numberError && <div className="invalid-feedback">{numberError}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        className={`form-control ${addressError ? "is-invalid" : ""}`}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                    {addressError && <div className="invalid-feedback">{addressError}</div>}
                                </div>
                                <button type="submit" className="btn btn-success btn-block mt-4">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;