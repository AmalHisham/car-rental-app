import CarCard from "../components/cars/carCard"
import carsData from "../data/carsData"

export default function Cars() {
    return (
        <>
        <h1>Available Cars</h1>
        
        {carsData.map((item) => <CarCard key = {item.id} car = {item}/>)}
        </>

    )
}