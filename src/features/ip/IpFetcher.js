import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getIp, addHistory, selectIp } from "./ipSlice";
import './ip.scss';

const IpFetcher = () => {
  const hostIp = useSelector(selectIp);
  const status = useSelector(state => state.ip.status);
  const dispatch = useDispatch();
  const [msg, setMsg] = useState('');

  useEffect(()=>{
    if(status==='idle') return setMsg('');
    if(status==='success') {
      dispatch(addHistory(hostIp));
      return setMsg(`당신의 ip는 ${hostIp}입니다.`);
    }
    if(status==='error') return setMsg('아이피 문제 있어?');
  }, [status, setMsg, hostIp]);

  return(
    <div className="wrapper">
      <h1>Ip를 확인해보세요.</h1>
      <button
        onClick={() => dispatch(getIp())}
      >Get Ip</button>
      <p>{msg}</p>
    </div>
  )
};

export default IpFetcher;
