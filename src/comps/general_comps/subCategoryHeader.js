import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { API_URL, doApiGet } from '../../services/apiService';



function SubCategoryHeadr(props) {
    const [ar, setAr] = useState([]);

    let itemCat = props.item;

    useEffect(() => {
        doApi();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    const doApi = async () => {
        let urlProds = API_URL + "/subCategories/?perPage=100";
        let resp2 = await doApiGet(urlProds)
        setAr(resp2.data)
    }

    
    return (
        <React.Fragment>
            {ar.map(item => {
                return (
                    (itemCat.short_id === item.cat_short_id) ? <li className='fw-normal fst-normal border-end border-dark' key={item._id}> <Link to={"/products/" + item.url_name}  >{item.name}</Link></li> : ""
                )
            })}
        </React.Fragment>
    )
}

export default SubCategoryHeadr