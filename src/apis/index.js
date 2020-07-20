import axios from 'axios';
const DOMAIN = 'http://49.50.173.134:6373/table/viewGrid';


//데이터 조회
export const postViewGrid = () => axios.post(DOMAIN, {}).then((res)=>res.data);