import Balance from "./components/balance";
import OllamaOverview from "./components/ollama";
import Overview from "./components/overview";
import { useState } from "react";

function App() {

  const [state, setState] = useState({load: 0, data: []})

  const componentArray = []
  componentArray.push(<Balance load={(e) => setState(e)} data={{...state}}></Balance>)
  componentArray.push(<Overview load={(e) => setState(e)} data={{...state}}></Overview>)
  componentArray.push(<OllamaOverview load={(e) => setState(e)} data={{...state}}></OllamaOverview>)

  return (
    <div>
      { componentArray.filter((value, index) => index === state.load)
      }
    </div>
  );
}

export default App;




