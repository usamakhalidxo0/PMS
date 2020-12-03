import React from 'react';
import useLogin from '../User/useLogin';
import {Link} from 'react-router-dom'

function SignIn(){
    const login = useLogin();
    return (
        <div>
        <div className="container">
            <form onSubmit={login} >
                <div className="form-group">
                    <label htmlFor="email" >Email</label>
                    <input type="email" name="email" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" >Password</label>
                    <input type="password" name="password" className="form-control"/>
                </div>
                <div className='form-group'>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
                <div className="form-group row justify-content-end">
                    <input type="submit" className="btn btn-primary"/>
                </div>
            </form>
        </div>        
    </div>     
    )
}

export default SignIn;