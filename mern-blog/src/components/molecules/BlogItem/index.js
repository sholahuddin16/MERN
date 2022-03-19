import React from 'react'
//import { RegisterBG } from '../../../assets'
import { Button } from '../../../components';
import {useHistory} from 'react-router-dom';
import { LogoBG } from '../../../assets';
import './blogitem.scss';
import { Gap } from '../../atoms';

const BlogItem = (props) => {
    const history=useHistory();
    const {image, tittle, name, date, body, _id, onDelete} = props;
    return (
        <div className="blog-item">
            <img className="image-thumb" src={image} alt="post" />
            <div className="content-detail">
                <div className="title-wrapper">
                    <p className="title">{tittle}</p>
                    <div className="edit-wrapper">
                        <p className="edit" onClick={() => history.push(`/create-blog/${props._id}`)}>Edit</p> | <p className="delete" onClick={() =>  onDelete(_id)}>Delete</p>
                    </div>
                </div>
                
                <p className="author">{name} - {date}</p>
                <p className="body">{body}</p>
                <Gap height={10} />
                <Button tittle="Detail" onClick={() => history.push(`/detail-blog/${props._id}`)} />
            </div>
        </div>
    )
}

export default BlogItem
