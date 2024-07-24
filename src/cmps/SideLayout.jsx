import { Sidebar } from "./Sidebar";
import { SideLibrary } from "./SideLibrary";

export function SideLayout() {
    return <section className="side-layout">
        <Sidebar />
        <SideLibrary />
    </section>
}