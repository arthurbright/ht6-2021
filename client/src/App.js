import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

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
