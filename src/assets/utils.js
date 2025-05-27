export const formatDate = date => {
	const formattedDate = new Intl.DateTimeFormat('en-US', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	}).format(date)
	return formattedDate
}

