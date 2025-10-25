import { Router, Route } from '@solidjs/router';

//pages
import CreateRoomPage from './pages/CreateRoomPage';
import RoomPage from './pages/RoomPage';
import LayoutForRoomPage from './pages/LayoutForRoomPage';
import LandingPage from './pages/LandingPage';
import { usePersistence } from './hooks/usePersistence';
import JoinPage from './pages/JoinPage';

const App = () => {
  usePersistence();

  return (
    <Router>
      <Route path="/" component={LandingPage} />
      <Route path="/room" component={LayoutForRoomPage}>
        <Route path=":id" component={RoomPage} />
      </Route>
      <Route path="/join/:id" component={JoinPage} />
      <Route path="/create-room" component={CreateRoomPage} />
    </Router>
  );
};

export default App;
