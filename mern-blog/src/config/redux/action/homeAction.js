import Axios from "axios";

export const setDataBlog = (page) => (dispatch) => {     //(parameter) //versi pendek
    Axios.get(`http://192.168.1.5:4000/v1/blog/get?page=${page}&perPage=4`) //versi pendek & sesuaikan dengan ip server
        .then(result => {
            const responseAPI = result.data;
            console.log('data API : ', responseAPI);
            dispatch({type: 'UPDATE_DATA_BLOG', payload: responseAPI.data}) //action
            dispatch({
                type: 'UPDATE_PAGE',
                payload: {
                    currentPage: responseAPI.current_Page, //value dari responseAPI current_page
                    totalPage: Math.ceil(responseAPI.total_Data / responseAPI.per_Page) //value dari responseAPI total_Data / perPage dibulatkan keatas
                } 
            })
        })
        .catch(err => {
            console.log('Error : ', err);
        })
    } //versi pendek

/*export const setDataBlog = () => {
  return (dispatch) => {              //(dispatch)parameter  //versi panjang
        Axios.get('http://localhost:4000/v1/blog/get?page=2')
        .then(result => {
            console.log('Data API', result.data); //untuk memilih reducer
            const responseAPI = result.data;

            //setDataBlog(responseAPI.data) //untuk multiple reducer
            dispatch({type: 'UPDATE_DATA_BLOG', payload: responseAPI.data}) //action
        })
        .catch(err => {
            console.log('Error : ', err);
        })
    }  //versi panjang

    //return  //key dan value payload sama jadi 1 saja
}*/ //versi panjang