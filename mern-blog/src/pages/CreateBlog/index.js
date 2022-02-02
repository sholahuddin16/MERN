import React, { useEffect, useState } from 'react'
import { Button, Gap, Input, Link, TextArea, Upload } from '../../components'
import './createblog.scss'
import {useHistory, withRouter} from 'react-router-dom';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { postToAPI, setForm, setImgPreview, updateToAPI } from '../../config/redux/action';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const CreateBlog = (props) => {
    const {form, imgPreview} = useSelector(state => state.createBlogReducer); //dgn State yg spesifik
    const {title, body} = form;
    const [isUpdate, setIsUpdate] = useState(false);
    const dispatch = useDispatch();
    
    //const [title, setTitle] = useState('');
    //const [body, setBody] = useState('');
    //const [image, setImage] = useState('');
    //const [imagePreview, setImagePreview] = useState(null);
    const history= useHistory();

    useEffect(()=> {
        console.log('params: ', props)
        const id = props.match.params.id 
        if(id){
            setIsUpdate(true);
            Axios.get(`http://192.168.1.5:4000/v1/blog/get/${id}`)
            .then(res => {
                const data =  res.data.data;
                console.log('res: ', data)
                dispatch(setForm('title', data.title));
                dispatch(setForm('body', data.body));
                dispatch(setImgPreview(`http://192.168.1.5:4000/${data.image}`));
            })
            .catch(err => {
                console.log('err: ', err)
            })
        }
    },[props])

    const onSubmit = () => {
        //console.log('title: ', title)
        //console.log('body: ', body)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Success Post Blog!!!',
            footer: '<a href="//192.168.1.5:3000">Go Home!!!</a>'
          }) 
        //console.log('image: ', image)
        const id = props.match.params.id
        if(isUpdate) {
            console.log('update data')
            updateToAPI(form, id)
        } else {
            console.log('create data')
            postToAPI(form)    
        }
    }

    

    const onImageUpload = (e) => {
        const file = e.target.files[0];
        dispatch(setForm('image', file));
        dispatch(setImgPreview(URL.createObjectURL(file)));
    }
    return (
        <div className="blog-post">
            <Link title="Kembali" onClick={() => history.push('/')} />
            <p className="title">{isUpdate ? 'Update' : 'Create New'} Blog Post</p>
            <Input label="Post Title" value={title} onChange={(e) => dispatch(setForm('title', e.target.value))} />
            <Upload onChange={(e) => onImageUpload(e)} img={imgPreview} />
            <TextArea value={body} onChange={(e) => dispatch(setForm('body', e.target.value))} />
            <Gap height={20} />
            <div className="button-action">
                <Button tittle={isUpdate ? 'Update' : 'Simpan'} onClick={onSubmit} />
            </div>
        </div>
    )
}

export default withRouter(CreateBlog)