import { useEffect, useState } from "react";

function Counter() {
  let [count, setCount] = useState(0);

//   useEffect(() => {
//     console.log(11);
//     let id = setInterval(() => {
//       setCount(count + 1);
//     }, 1000);
//     return () => clearInterval(id);
//   });

  useEffect(() => {
    let id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}

export default Counter;
