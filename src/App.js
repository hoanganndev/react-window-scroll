import { memo } from "react";
import WindowScroll from "./components/react-window/virtualized/WindowScroll";

function App() {
  return (
    <div>
      <WindowScroll />
    </div>
  );
}

export default memo(App);
