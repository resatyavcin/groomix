import { Router, Route } from "@solidjs/router";

//pages
import CreateRoomPage from "./pages/CreateRoomPage";
import RoomPage from "./pages/RoomPage";
import LayoutForRoomPage from "./pages/LayoutForRoomPage";

const App = () => {
  return (
    <div class="w-screen">
      <Router>
        <Route path="/room" component={LayoutForRoomPage}>
          <Route path=":id" component={RoomPage} />
        </Route>
        <Route path="/create-room" component={CreateRoomPage} />
      </Router>
    </div>
  );
};

export default App;
