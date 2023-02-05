import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddInfluencer from "./Components/AddInfluencer/AddInfluencer";
import EditInfluencer from "./Components/EditInfluencer/EditInfluencer";
import Header from "./Components/Header/Header";
import Influencers from "./Components/Influencers/Influencers";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Influencers />} />
        <Route path="/addinfluencer" element={<AddInfluencer />} />
        <Route path="/editinfluencer/:id" element={<EditInfluencer />} />
      </Routes>
    </div>
  );
}

export default App;
