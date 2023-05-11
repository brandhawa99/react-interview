import { useEffect, useState } from 'react'
import './App.css'

interface UserName {
  first: string,
  last: string,
  title: string,
}

interface UserInfo {
  name: UserName
}

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([]);
  useEffect(() => {
    const getApiData = async () => {
      try {
        const res = await fetch('https://randomuser.me/api');
        const data = await res.json();
        setData(data.results);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
    getApiData();
  }, [])


  return (
    <>
      <div className='home'>
        {
          data.length > 0 ?
            data.map(usr => {
              return (
                <div className='usr-holder' key={usr?.login?.uuid}>
                  <h2>
                    {usr?.name.first} {usr?.name.last}
                  </h2>
                  <div>
                    <img src={usr?.picture?.medium} alt='profile' />
                  </div>
                </div>
              )
            }) : <div> no user</div>

        }
      </div>
    </>
  )
}

export default App
