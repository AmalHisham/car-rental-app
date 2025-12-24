export default function CarCard({car}) {
    return (
        <div>
            <img src={car.image}
             alt= {car.model}
             style = {{width : "250px", height : "160px", objectFit : "cover"}}
             />
            <h2>{car.model}</h2>
            <p>{car.type}</p>
            <p>{car.pricePerDay}</p>
            <button>Add to cart</button>
        </div>
    )
}