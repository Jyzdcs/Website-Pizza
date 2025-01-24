import { useState, useEffect, useContext } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import Pizza from '../Pizza'
import Cart from '../Cart'
import { CartContext } from '../contexts'

export const Route = createLazyFileRoute('/order')({
  component: Order,
})

export default function Order() {
  const [pizzasType, setPizzasType] = useState([])
  const [cart, setCart] = useContext(CartContext)
  const [pizzaType, setPizzaType] = useState('The Pepperoni Pizza')
  const [pizzaSize, setPizzaSize] = useState('M')
  const [loading, setLoading] = useState(true)

  async function checkout() {
    setLoading(true)

    console.log('making request\n')
    await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    })

    setCart([])
    setLoading(false)
  }

  let selectedPizza, price
  if (!loading) {
    selectedPizza = pizzasType.find((pizza) => pizzaType === pizza.name)
    price = selectedPizza.sizes[pizzaSize]
  }

  useEffect(() => {
    fetchPizzas()
  }, [])

  const fetchPizzas = async () => {
    const resPizzas = await fetch('/api/pizzas')
    const pizzasJson = await resPizzas.json()

    setPizzasType(pizzasJson)
    setLoading(false)
  }

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }])
          }}
        >
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                name="pizza-type"
                onChange={(e) => setPizzaType(e.target.value)}
                value={pizzaType}
              >
                {pizzasType.map((pizzaObj) => (
                  <option key={pizzaObj.id} value={pizzaObj.name}>
                    {pizzaObj.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div>
                <span>
                  <input
                    onChange={(e) => setPizzaSize(e.target.value)}
                    type="radio"
                    name="pizza-size"
                    checked={pizzaSize === 'S'}
                    value="S"
                    id="pizza-s"
                  />
                  <label htmlFor="pizza-s">Small</label>
                </span>
                <span>
                  <input
                    onChange={(e) => setPizzaSize(e.target.value)}
                    type="radio"
                    checked={pizzaSize === 'M'}
                    name="pizza-size"
                    value="M"
                    id="pizza-m"
                  />
                  <label htmlFor="pizza-m">Medium</label>
                </span>
                <span>
                  <input
                    onChange={(e) => setPizzaSize(e.target.value)}
                    type="radio"
                    checked={pizzaSize === 'L'}
                    name="pizza-size"
                    value="L"
                    id="pizza-l"
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to cart</button>
          </div>
          <div className="order-pizza">
            {loading ? (
              <p>LOADING...</p>
            ) : (
              <Pizza
                name={selectedPizza.name}
                description={selectedPizza.description}
                img={selectedPizza.image}
              />
            )}
            <p>{price}$</p>
          </div>
        </form>
      </div>
      {loading ? <p>Loading...</p> : <Cart checkout={checkout} cart={cart} />}
    </div>
  )
}
