import { Sidebar } from "./Sidebar";
import { SideLibrary } from "./sideLibrary";

export function SideLayout() {
    return <section className="side-layout">
        <Sidebar />
        <SideLibrary />
    </section>
}