import { createRoot } from "react-dom/client";
import Order from "./Order";

const App = () => {
    return (
		<div>
			<Order />
		</div>
    );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);