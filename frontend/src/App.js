import {Route, Routes} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import NotFound from "./components/UI/NotFound/NotFound";
import Artists from "./containers/Artists/Artists";
import Albums from "./containers/Albums/Albums";
import Tracks from "./containers/Tracks/Tracks";

const App = () => (
    <div className="App">
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Artists/>}/>
                <Route path="albums/:id" element={<Albums/>}/>
                <Route path="tracks/:id" element={<Tracks/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    </div>
);

export default App;