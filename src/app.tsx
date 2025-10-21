import { Router, Route } from "@solidjs/router";

//pages
import CreateRoom from "./pages/CreateRoom";

//components
import WelcomeMessage from "./components/WelcomeMessage";

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", padding: "20px" }}>
      <WelcomeMessage />

      <Router>
        <Route path="/create-room" component={CreateRoom} />
      </Router>
    </div>
  );
};

export default App;
