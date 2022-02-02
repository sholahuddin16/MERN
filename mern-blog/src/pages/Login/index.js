import React from 'react'
import { LoginBG } from '../../assets';
import { Button, Gap, Input, Link } from '../../components';
import {useHistory} from 'react-router-dom';

const Login = () => {
    const history=useHistory();
    return (
        <div className="main-page">
            <div className="left">
                <img src={LoginBG} className="bg-image" />
            </div>
            <div className="right">
                <p className="title">Login Boy</p>
                <Input label="Email" placeholder="Email" />
                <Input label="Password" placeholder="Password" />
                <Gap height={40} />
                <Button tittle="Login Boy" onClick={() => history.push ('/') } />
                <Gap height={30} />
                <div className="link">
                    <Link title="Lupa Password" />
                    <Link title="Daftar Dulu Boy" onClick={() => history.push ('/register') } />
                </div>
            </div>
        </div>
    )
}

export default Login
