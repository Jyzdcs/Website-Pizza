import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

const App = () => {
    return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router}/>
		</QueryClientProvider>
    );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);