import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let res = await fetch("/api/hi", {
        method: 'GET'
      });
      let resJson = await res.json();
      console.log(resJson);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <p
        onClick={() => {
          alert("kachow");
        }}
      >
        Middle
      </p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count}
      </button>
      <Footer companyTitle="egg inc." />
    </div>
  );
}

export default App;
