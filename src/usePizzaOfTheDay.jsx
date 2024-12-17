import { useEffect, useState } from "react";

export default function usePizzaOfTheDay (){
	const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("/api/pizza-of-the-day");
			const dataJson = await res.json();

			setPizzaOfTheDay(dataJson)
		}
		
		fetchData()
	}, [])

	return pizzaOfTheDay;
}