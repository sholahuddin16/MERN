import React from 'react'
import { ICDiscord, ICEmail, ICFacebook, ICGithub, ICInstagram, ICLinkedin, ICTelegram, LogoBG } from '../../../assets'
import {useHistory} from 'react-router-dom';
import './footer.scss';

const Icon = ({img}) => {
    return (
        <div className="icon-wrapper">
            <img className="icon-medsos" src={img} alt="icon" />
        </div>
    )
}

const Footer = () => {
    const history=useHistory();
    return (
        <div>
            <div className="footer">
                <div className="logo-home">
                    <img className="logo" src={LogoBG} alt="logo" onClick={() => history.push ('') } />
                </div>
                <div className="social-wrapper">
                    <Icon img={ICGithub} />
                    <Icon img={ICLinkedin} />
                    <Icon img={ICTelegram} />
                    <Icon img={ICDiscord} />
                    <Icon img={ICFacebook} />
                    <Icon img={ICInstagram} />
                </div>
            </div>
            <div className="copyright">
                <p>Copyright</p>
            </div>
        </div>
    )
}

export default Footer