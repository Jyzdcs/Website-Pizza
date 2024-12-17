import { createRoot } from "react-dom/client";
import Order from "./Order";
import PizzaOfTheDay from "./PizzaOfTheDay";

const App = () => {
    return (
		<div>
			<Order />
			<PizzaOfTheDay />
		</div>
    );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);