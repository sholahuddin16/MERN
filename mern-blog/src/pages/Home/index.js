import React, { useEffect, useState } from 'react';
import { BlogItem, Button, Gap } from '../../components';
import './home.scss';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setDataBlog } from '../../config/redux/action';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const Home = () => {
    //const [dataBlog, setDataBlog] = useState([]); //untuk menggabungkan 2 state 
    //const {dataBlogs, name} = useSelector(state => state); //untuk menggabungkan 2 state
    //const stateGlobal = useSelector(state => state); //untuk menggabungkan 2 state

    const [counter, setCounter] = useState(1);
    const { dataBlog, page } = useSelector(state => state.homeReducer);
    const dispatch = useDispatch();

    console.log('page : ', page);

    //console.log('data blog global: ', stateGlobal); //untuk menggabungkan 2 state
    console.log('data blog global: ', dataBlog);
    useEffect(() => {
        /* setTimeout(() => {
            //dispatch({type: 'UPDATE_NAME'})
        }, 3000) */  //untuk menggabungkan 2 state
        dispatch(setDataBlog(counter)) // memanggil function setDataBlog dari homeAction.js & useEffect men set value data blog
    }, [counter, dispatch])

    const history = useHistory();

    const previous = () => {
        setCounter(counter <= 1 ? 1 : counter - 1)
        console.log(counter);
    } //function yg berfungsi untuk memundrkan 1 page 

    const next = () => {
        setCounter(counter === page.totalPage ? page.totalPage : counter + 1)
        console.log(counter);
    } //function yg berfungsi untuk memajukan 1 page 

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    Axios.delete(`http://192.168.1.5:4000/v1/blog/post/${id}`)
                    .then(res => {
                        console.log('success delete: ', res.data);
                        dispatch(setDataBlog(counter))
                    })
                    .catch(err => {
                        console.log('err: ', err)
                    })
                }
              },
              {
                label: 'No',
                onClick: () => console.log('User Tidak Setuju')
              }
            ]
          });
    }

    return (
        <div className="home-page-wrapper">
            <div className="create-wrapper">
                <Button tittle="Request Service" onClick={() => history.push('/create-blog')} />
            </div>
            <Gap height={20} />
            <div className="content-wrapper">
                {dataBlog.map(blog => {
                    return <BlogItem
                        key={blog._id}
                        image={`http://192.168.1.5:4000/${blog.image}`}
                        tittle={blog.title}
                        body={blog.body}
                        name={blog.author.name}
                        date={blog.createdAt}
                        _id={blog._id}
                        onDelete={confirmDelete}
                    />
                })}
            </div>
            <div className="pagination">
                <Button tittle="Previous" onClick={previous} />
                <Gap width={20} />
                <p className="text-page">{page.currentPage} / {page.totalPage}</p>
                <Gap width={20} />
                <Button tittle="Next" onClick={next} />
            </div>
        </div>
    )
}

export default Home
