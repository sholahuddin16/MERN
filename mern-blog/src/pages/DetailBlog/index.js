import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router';
import LoginBg, {LoginBG} from '../../assets';
import { Link, Gap } from '../../components';
import './detailBlog.scss';
import Axios from 'axios';

const DetailBlog = (props) => {
    const [data, setData] = useState({})
    useEffect(() => {
        console.log('params: ', props.match.params.id)
        const id = props.match.params.id
        Axios.get(`http://192.168.1.5:4000/v1/blog/get/${id}`)
        .then(res => {
            console.log('success: ', res);
            setData(res.data.data)
        })
        .catch(err => {
            console.log('err: ', err);
        })
    }, [])
    const history = useHistory();
    if(data.author){
        return (
            <div className="detail-blog-wrapper">
                <p className="blog-title">{data.title}</p>
                <p className="blog-author">{data.author.name} - {data.createdAt} </p>
                <img className="img-cover" src={`http://192.168.1.5:4000/${data.image}`} alt="thumb" />
                <p className="blog-body">{data.body}</p>
                <Gap height={20} />
                <Link title="Kembali Ke Home" onClick={() => history.push('/')} />
                <div>                
                </div>
            </div>
        )
    }
    return <p>Loading data...</p>
    
}

export default withRouter(DetailBlog)
