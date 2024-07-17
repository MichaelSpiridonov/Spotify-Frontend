import { AppPlayer } from "../cmps/AppPlayer";
import { Sidebar } from "../cmps/Sidebar";
import { StationList } from "../cmps/StationList";


export function StationIndex() {
    return (
        <section>
            <Sidebar />
            <h1>Station Index</h1>
            <StationList />
            <AppPlayer />
        </section>
    )
    
}