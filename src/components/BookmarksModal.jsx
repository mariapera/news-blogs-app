import './Modal.css'
import './BookmarksModal.css'

import { FaTimes, FaRegTimesCircle } from 'react-icons/fa'
import noImg from '../assets/images/no-img.png'

function BookmarksModal({
	bookmarks,
	onCloseModal,
	onSelectedArticle, onDeleteBookmark,
}) {
	return (
		<div className='modal-overlay'>
			<div className='modal-content'>
				<button className='close-btn' type='button' onClick={onCloseModal}>
					<FaTimes />
				</button>
				<h2 className='bookmarks-heading'>Bookmarked News</h2>

				<ul className='bookmarks-list'>
					{bookmarks.map((article, index) => {
						const { image, title } = article
						return (
							<li
								className='bookmark-item'
								onClick={() => onSelectedArticle(article)}
								key={index}>
								<img
									className='bookmark-image'
									src={image || noImg}
									alt={title}
								/>
								<h3 className='bookmark-title'>{title}</h3>
								<span
									className='delete-btn'
									onClick={(e) => {
										e.stopPropagation()
										onDeleteBookmark(article)}}>
									<FaRegTimesCircle />
								</span>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}
export default BookmarksModal
