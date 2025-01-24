export default function Cart({ cart, checkout }) {
	let total = 0;
	for (let i = 0; i < cart.length; i++) {
		total += cart[i].price
	}

	return (
		<div className="cart">
			<h2>Cart Order</h2>
			<ul>
				{cart.map((item, index) => (
					<li key={index}>
						<span className="size">{item.size}</span> -
						<span className="type">{item.pizza.name}</span> -
						<span className="price">${item.price}</span>
					</li>
				))}
			</ul>
			<p>Total : ${total}</p>
			<button onClick={checkout}>Checkout</button>
		</div>
	)
}