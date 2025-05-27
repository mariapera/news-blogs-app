import { useEffect, useState } from 'react'
import axios from 'axios'
import './Weather.css'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import {
	BiSolidSun,
	BiSolidCloud,
	BiSolidCloudRain,
	BiCloudDrizzle,
	BiSolidCloudLightning,
	BiCloudSnow,
} from 'react-icons/bi'
import { BsCloudHaze2Fill } from 'react-icons/bs'

function Weather() {
	const [locationData, setLocationData] = useState({})
	const [location, setLocation] = useState('')

	const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

	useEffect(() => {
		const fetchDefaultLocation = async () => {
			const defaultLocation = 'London'
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=metric&appid=${WEATHER_API_KEY}`

			const response = await axios.get(url)
			const data = await response.data
			setLocationData(data)
			setLocation('')
		}
		fetchDefaultLocation()
	}, [WEATHER_API_KEY])

	const search = async () => {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${WEATHER_API_KEY}`

		try {
			const response = await axios.get(url)
			if (response.status !== 200) {
				setLocationData({ notFound: true })
			} else {
				const data = await response.data
				setLocationData(data)
				setLocation('')
			}
		} catch (error) {
			if (error.status === 404) {
				setLocationData({ notFound: true })
			} else {
				console.error('An unexpected error occurred', error)
			}
		}
	}

	const handleInputChange = e => {
		setLocation(e.target.value)
	}

	const handleKeyDown = e => {
		if (e.key === 'Enter') {
			search()
			setLocation('')
		}
	}

	const getWeatherIcon = weatherType => {
		switch (weatherType) {
			case 'Clear':
				return <BiSolidSun className='sun' />
			case 'Clouds':
				return <BiSolidCloud className='cloud' />
			case 'Mist':
			case 'Smoke':
			case 'Haze':
			case 'Dust':
			case 'Fog':
			case 'Sand':
			case 'Ash':
			case 'Squall':
			case 'Tornado':
				return <BsCloudHaze2Fill className='haze' />
			case 'Rain':
				return <BiSolidCloudRain className='rain' />
			case 'Drizzle':
				return <BiCloudDrizzle className='drizzle' />
			case 'Thunderstorm':
				return <BiSolidCloudLightning className='lightning' />
			case 'Snow':
				return <BiCloudSnow className='snow' />
			default:
				return <BiSolidCloud className='cloud' />
		}
	}

	return (
		<div className='weather'>
			<div className='weather-search'>
				<div className='search-top'>
					<FaMapMarkerAlt />
					<div className='location'>{locationData.name}</div>
				</div>
				<div className='search-location'>
					<input
						type='text'
						value={location}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						placeholder='Enter location...'
					/>
					<FaMagnifyingGlass onClick={search} />
				</div>
			</div>
			{locationData.notFound ? (
				<div className='not-found'>City not found 😥</div>
			) : (
				<div className='weather-data'>
					{locationData.weather && locationData.weather[0] ? getWeatherIcon(locationData.weather[0].main)
						: null}
					<div className='weather-type'>
						{locationData.weather && locationData.weather[0]
							? locationData.weather[0].main
							: null}
					</div>
					<div className='temp'>
						{locationData.main
							? `${Math.floor(locationData.main.temp)}°`
							: null}
					</div>
				</div>
			)}
		</div>
	)
}
export default Weather
