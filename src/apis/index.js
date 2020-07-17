import axios from 'axios';
import config from './config';

//데이터 조회
export const postViewGrid = () => axios.post(config.viewGrid, {}).then((res)=>res.data);