import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Router from "./router";
import './App.css'

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
