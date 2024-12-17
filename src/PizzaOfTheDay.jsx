import usePizzaOfTheDay from "./usePizzaOfTheDay";

export default function PizzaOfTheDay() {
	const pizzaOfTheDay = usePizzaOfTheDay();

	if (!pizzaOfTheDay) {
		return <div>Loading...</div>
	}
	return (
		<div className="pizza-of-the-day">
			<h2>Pizza of the day</h2>
			<div>
				<div className="pizza-of-the-day-info">
					<h3>{pizzaOfTheDay.name}</h3>
					<p>{pizzaOfTheDay.description}</p>
					<p className="pizza-of-the-day-price">{pizzaOfTheDay.sizes.M}$</p>
				</div>
				<div>
					<img 
						className="pizza-of-the-day-image" 
						src={pizzaOfTheDay.image}
						alt={pizzaOfTheDay.name}
					/>
				</div>
			</div>
		</div>
	)
}