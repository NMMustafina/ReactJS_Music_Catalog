import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import Layout from "./components/UI/Layout/Layout";
import Artists from "./containers/Artists/Artists";
import NewArtist from "./containers/NewArtist/NewArtist";
import Albums from "./containers/Albums/Albums";
import NewAlbum from "./containers/NewAlbum/NewAlbum";
import Tracks from "./containers/Tracks/Tracks";
import NewTrack from "./containers/NewTrack/NewTrack";
import TrackHistory from "./containers/TrackHistory/TrackHistory";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import NotFound from "./components/UI/NotFound/NotFound";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
        <Route {...props}/> :
        <Redirect to={redirectTo}/>
};

const App = () => {
    const user = useSelector(state => state.users.user);

    return (
        <Layout>
            <Switch>

                <ProtectedRoute isAllowed={user}
                    redirectTo="/login"
                    path="/" exact
                    component={Artists}
                />

                <ProtectedRoute
                    isAllowed={user}
                    redirectTo="/login"
                    path="/artist/new"
                    component={NewArtist}
                />

                <Route path="/albums/:id" component={Albums}/>

                <ProtectedRoute
                    isAllowed={user}
                    redirectTo="/login"
                    path="/album/new"
                    component={NewAlbum}
                />

                <Route path="/tracks/:id" component={Tracks}/>

                <ProtectedRoute
                    isAllowed={user}
                    redirectTo="/login"
                    path="/track/new"
                    component={NewTrack}
                />

                <Route path="/track_history" component={TrackHistory}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route component={NotFound}/>
            </Switch>
        </Layout>
    );
}

export default App;
