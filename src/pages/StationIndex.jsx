import { AppHeader } from "../cmps/AppHeader";
import { AppPlayer } from "../cmps/AppPlayer";
import { Sidebar } from "../cmps/Sidebar";
import { SideLibrary } from "../cmps/sideLibrary";
import { StationList } from "../cmps/StationList";


export function StationIndex() {
    return (
        <section className="main-container">
            <Sidebar />
            <SideLibrary/>
            {/* <h1>Station Index</h1> */}
            <StationList />
            <AppPlayer />
        </section>
    )
    
}