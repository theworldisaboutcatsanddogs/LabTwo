import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";

function Users() {
    const { id } = useParams();

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/')
            .then(res => {
                console.log(res);
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${id.name}?`);
        if (confirmDelete) {
            axios.delete('http://localhost:3000/deleteuser/' + id._id)
                .then(res => {
                    console.log(res);
                    window.location.reload();
                })
                .catch(err => console.log(err));
        }
    };
    
    const handleSort = (field, order) => {
        setSortField(field);
        setSortOrder(order);
        let sortedData;
        switch (order) {
            case 'az':
                sortedData = [...data].sort((a, b) => a[field].localeCompare(b[field]));
                break;
            case 'za':
                sortedData = [...data].sort((a, b) => b[field].localeCompare(a[field]));
                break;
            default:
                sortedData = data;
        }
        setData(sortedData);
    };

    const filteredData = data.filter(user => {
        const search = searchQuery ? searchQuery.toLowerCase() : '';
        const name = user.name ? user.name.toLowerCase() : '';
        const email = user.email ? user.email.toLowerCase() : '';
        const age = user.age ? user.age.toString() : '';
        const number = user.number ? user.number.toLowerCase() : '';
        const address = user.address ? user.address.toLowerCase() : '';

        return (
            name.includes(search) ||
            email.includes(search) ||
            age.includes(search) ||
            number.includes(search) ||
            address.includes(search)
        );
    });

    return (
        <div className="container-fluid py-4" style={{ backgroundColor: '#ffffff' }}>
            <div className="container bg-white rounded shadow-lg py-4">
                <h1 className="text-center mb-4">Student Profile</h1>
                <div className='d-flex align-items-center justify-content-between mb-4'>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-control mr-2"
                    />
                    <Link to="/create" className="btn btn-success">
                        Add+
                    </Link>
                    <div style={{ width: '20px' }}></div> 
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sort
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                            <div className="dropdown-item border-bottom">
                                <span>Name </span>
                                <button className="btn btn-link" onClick={() => handleSort('name', 'az')}>A-Z</button>
                                <button className="btn btn-link" onClick={() => handleSort('name', 'za')}>Z-A</button>
                            </div>
                            <div className="dropdown-item border-bottom">
                                <span>Email </span>
                                <button className="btn btn-link" onClick={() => handleSort('email', 'az')}>A-Z</button>
                                <button className="btn btn-link" onClick={() => handleSort('email', 'za')}>Z-A</button>
                            </div>
                            <div className="dropdown-item border-bottom">
                                <span>Age </span>
                                <button className="btn btn-link" onClick={() => handleSort('age', 'az')}>1-100</button>
                                <button className="btn btn-link" onClick={() => handleSort('age', 'za')}>100-1</button>
                            </div>
                            <div className="dropdown-item">
                                <span>Address </span>
                                <button className="btn btn-link" onClick={() => handleSort('address', 'az')}>A-Z</button>
                                <button className="btn btn-link" onClick={() => handleSort('address', 'za')}>Z-A</button>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="table table-bordered ">
                    <thead className="thead">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Number</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.map((user, index) => {
                                return <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>{user.number}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <Link to={`/update/${user._id}`} className="btn btn-success mr-2">Update</Link>
                                        <button onClick={() => handleDelete(user)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
