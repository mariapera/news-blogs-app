import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import './Calendar.css'
import { useState } from 'react'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthsOfYear = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

function Calendar() {
	const currentDate = new Date()
	const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
	const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())

	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

	const prevMonth = () => {
		setCurrentMonth((prevMonth) => prevMonth === 0 ? 11 : prevMonth - 1)
		setCurrentYear((prevYear) => currentMonth === 0 ? prevYear - 1 : prevYear )
	}

	const nextMonth = () => {
		setCurrentMonth(prev => (prev === 11 ? 0 : prev + 1))
		setCurrentYear(prevYear =>
			currentMonth === 11 ? prevYear + 1 : prevYear
		)
	}

	return (
		<div className='calendar'>
			<div className='navigate-date'>
				<h2 className='month'>{monthsOfYear[currentMonth]},</h2>
				<h2 className='year'>{currentYear}</h2>
				<div className='date-buttons'>
					<FaChevronLeft onClick={prevMonth} />
					<FaChevronRight onClick={nextMonth} />
				</div>
			</div>
			<div className='week'>
				{daysOfWeek.map(day => (
					<span key={day}>{day}</span>
				))}
			</div>
			<div className='days'>
				{[...Array(firstDayOfMonth).keys()].map((_, index) => (
					<span key={`empty-${index}`}></span>
				))}
				{[...Array(daysInMonth).keys()].map(day => (
					<span
						className={
							day + 1 === currentDate.getDate() &&
							currentMonth === currentDate.getMonth() &&
							currentYear === currentDate.getFullYear()
								? 'current-day'
								: ''
						}
						data-current-day={
							day + 1 === currentDate.getDate() &&
							currentMonth === currentDate.getMonth() &&
							currentYear === currentDate.getFullYear()
								? day + 1
								: ''
						}
						key={day + 1}>
						{day + 1}
					</span>
				))}
			</div>
		</div>
	)
}
export default Calendar
