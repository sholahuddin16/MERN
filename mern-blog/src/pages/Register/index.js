import React from 'react'
import { RegisterBG } from '../../assets';
import { Button, Gap, Input, Link } from '../../components';
import './register.scss';
import {useHistory} from 'react-router-dom';

const Register = () => {
    const history=useHistory();
    return (
        <div className="main-page">
            <div className="left">
                <img src={RegisterBG} className="bg-image" />
            </div>
            <div className="right">
                <p className="title">Daftar Dulu Boy</p>
                <Input label="Full Name" placeholder="Full Name" />
                <Input label="Email" placeholder="Email" />
                <Input label="Password" placeholder="Password" />
                <Gap height={40} />
                <Button tittle="Register" onClick={() => history.push ('/login') } />
                <Gap height={30} />
                <Link title="Back to Login" onClick={() => history.push ('/login') } />
            </div>
        </div>
    )
}

export default Register
