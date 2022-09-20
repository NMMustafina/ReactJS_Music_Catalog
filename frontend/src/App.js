import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/NotFound/NotFound";

const App = () => (
    <div className="App">
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    </div>
);

export default App;