import React from "react"
import { fetchCities } from "../../services/geoDbService"

export default function CitySearch({label}) {

    const timeRef = React.useRef(null)

    const [query, setQuery] = React.useState("")
    const [cities, setCities] = React.useState([])
    
    function handleChange(e) {
        const value = e.target.value
        setQuery(value)
        
        clearTimeout(timeRef.current)

        setTimeout(async () => {
            const results = await fetchCities(value)
            setCities(results)
        },200)

    }

    return (
        <div>
            <label>{label}</label>
            <input 
            type="text"
            value = {query}
            onChange={handleChange}
            />

            <ul>
            {Array.isArray(cities) && cities.map((city) => (
                <li key={city.id}>{city.city}</li>
            ))}
            </ul>
        </div>
    )
}