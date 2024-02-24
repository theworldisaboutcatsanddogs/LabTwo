import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser() {
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

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let isError = false;

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
        } else {
            setEmailError("");
        }

        if (!age) {
            setAgeError("Age is required");
            isError = true;
        } else if (isNaN(age)) {
            setAgeError("Age must be a number");
            isError = true;
        } else if (parseInt(age) > 100) {
            setAgeError("Age should not exceed 100");
            isError = true;
        } else {
            setAgeError("");
        }        
        
        if (!number) {
            setNumberError("Number is required");
            isError = true;
        } else if (number.length !== 11 || isNaN(number)) {
            setNumberError("Number should be 11 digits");
            isError = true;
        } else {
            setNumberError("");
        }        

        if (!address) {
            setAddressError("Address is required");
            isError = true;
        } else {
            setAddressError("");
        }

        if (!isError) {
            axios.post("http://localhost:3000/create", { name, email, age, number, address })
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
                            <h2 className="text-center mb-4">Add User</h2>
                            <form onSubmit={handleSubmit}>
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
                                <button type="submit" className="btn btn-success btn-block mt-4">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateUser;
