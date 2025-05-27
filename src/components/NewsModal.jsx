import { FaTimes } from 'react-icons/fa'
import './Modal.css'
import './NewsModal.css'

import noImg from '../assets/images/no-img.png'
import { formatDate } from '../assets/utils'

function NewsModal({ article, onCloseModal }) {
	const {  title, description, url, source, publishedAt, image } = article
	return (
		<div className='modal-overlay'>
			<div className='modal-content'>
				<button className='close-btn' type='button' onClick={onCloseModal}>
					<FaTimes />
				</button>
				{article && (
					<>
						<img
							className='modal-image'
							src={image || noImg}
							alt={title}
						/>
						<h2 className='modal-title'>{title}</h2>
						<p className='modal-source'>Source: {source.name}</p>
						<p className='modal-date'>{formatDate(new Date(publishedAt))}</p>
						<p className='modal-content-text'>{description}</p>
						<a
							href={url}
							className='link-btn'
							target='_blank'
							rel='noopener noreferrer'>
							Read More
						</a>
					</>
				)}
			</div>
		</div>
	)
}
export default NewsModal
