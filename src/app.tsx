import { Router, Route } from '@solidjs/router';

//pages
import CreateRoomPage from './pages/CreateRoomPage';
import RoomPage from './pages/RoomPage';
import LayoutForRoomPage from './pages/LayoutForRoomPage';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <Router>
      <Route path="/" component={LandingPage} />
      <Route path="/room" component={LayoutForRoomPage}>
        <Route path=":id" component={RoomPage} />
      </Route>
      <Route path="/create-room" component={CreateRoomPage} />
    </Router>
  );
};

export default App;
