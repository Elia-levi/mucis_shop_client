import axios from "axios";

// need to change
// export const API_URL = "http://localhost:3004";
export const API_URL = "https://musicsshop.herokuapp.com";


export const doApiGet = async (_url) => {
  try {
    let data = await axios.get(_url, {
      headers: {
        'x-api-key': localStorage["tok"],
        'content-type': "application/json"
      }
    });
    return data;
  }
  catch(err){
    throw err
  }
}

export const doApiMethod = async (_url,_method,_body) => {
  try {
    let data = await axios({
      method:_method,
      url:_url,
      data: JSON.stringify(_body),
      headers:{
        'x-api-key': localStorage["tok"],
        'content-type': "application/json"
      }
    });
    return data;
  }
  catch(err){
    throw err
  }
}