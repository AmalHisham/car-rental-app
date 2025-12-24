import CarCard from "../components/cars/carCard"
import CitySearch from "../components/common/citySearch"
import carsData from "../data/carsData"

export default function Cars() {
    return (
        <>
        <h1>Available Cars</h1>
        <CitySearch label = "enter city"/>
        {carsData.map((item) => <CarCard key = {item.id} car = {item}/>)}
        </>

    )
}