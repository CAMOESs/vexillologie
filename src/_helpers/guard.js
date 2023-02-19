import router from '@/router'
import axios from 'axios'

export function guard(to){

  console.log("bobo")
  axios
  .get("https://restcountries.com/v2/all")
  .then((res)=>{
    console.log(res.data)
    console.log(name)
  })
}
