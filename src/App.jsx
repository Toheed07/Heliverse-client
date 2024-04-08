import { Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/home";
import Team from "./pages/team";
import CreateTeam from "./pages/create-team";
import Navbar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  // const [count, setCount] = useState(0

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Team />} />
        <Route path="/create-teams" element={<CreateTeam />} />
      </Routes>
    </>
  );
}

export default App;
