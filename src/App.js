import React, { useEffect, useState } from 'react';
import ListItem from './components/ListItem';
import Listheader from './components/ListHeader';
import Auth from './components/Auth';
import { useCookies } from "react-cookie"

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todo/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData()
    }}
    ,[])
  

  console.log(tasks)

  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <body>
    <div className="app">
      {!authToken && <Auth/>}
      {authToken &&
        <>
        <Listheader getData={getData} />
        <p className='user-email'>สวัสดี {userEmail} </p>
      {sortedTasks?.map((task) => (
        <ListItem key={task.id} task={task} getData={getData} />))}
        </>}
    </div>
    <div class="wrapper">
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
    </div>
  </body>

  );
};

export default App;
