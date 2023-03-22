import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [Credentials, setCredentials] = useState({ username: "", email: "", password: "" })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: Credentials.username, email: Credentials.email, password: Credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Redirect
            localStorage.setItem('token', json.authToken)
            props.showAlert('Logged in Success', 'success')
            navigate('/');
        }
        else {
            props.showAlert('Invalid Credentials', 'danger')

        }
    }

    const onChange = (e) => {
        setCredentials({ ...Credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h2 className="my-2">Create an Account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" id='username' name='username' className="form-control" value={Credentials.username} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" id='email' name='email' className="form-control" value={Credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id='password' name='password' className="form-control" value={Credentials.password} onChange={onChange} required minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Signup