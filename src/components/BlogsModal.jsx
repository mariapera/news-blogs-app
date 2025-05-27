import { FaTimes } from 'react-icons/fa'
import './Modal.css'
import './BlogsModal.css'
import noImg from '../assets/images/no-img.png'

function BlogsModal({ show, post, onClose }) {
	if (!show) {
		return null
	}

	return (
		<div className='modal-overlay'>
			<div className='modal-content'>
				<button className='close-btn' type='button' onClick={onClose}>
					<FaTimes />
				</button>
				<img className='blogs-modal-img' src={post.image || noImg} alt={post.title} />
				<h2 className='blogs-modal-heading'>
					{post.title}
				</h2>
				<p className='blogs-modal-content'>
					{post.content}
				</p>
			</div>
		</div>
	)
}
export default BlogsModal
