import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import './Blogs.css'

import userImg from '../assets/images/user.jpg'
import noImg from '../assets/images/no-img.png'
import { FaChevronRight } from 'react-icons/fa6'
import { FiUpload } from 'react-icons/fi'
import { FaSalesforce } from 'react-icons/fa'

function Blogs({ onBack, onCreateBlog, isEditing, editPost }) {
	const [showForm, setShowForm] = useState(false)
	const [image, setImage] = useState(null)
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')

	const [titleValid, setTitleValid] = useState(true)
	const [contentValid, setContentValid] = useState(true)

	const [submitted, setSubmitted] = useState(false)

	useEffect(() => {
		if (isEditing && editPost) {
			setImage(editPost.image)
			setTitle(editPost.title)
			setContent(editPost.content)
			setShowForm(true)
		} else {
			setImage(null)
			setTitle('')
			setContent('')
			setShowForm(false)
		}
	}, [isEditing, editPost])

	const handleImageChange = e => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			const maxSize = 1 * 1024 * 1024

			if (file.size > maxSize) {
				alert('File size exceeds 1 MB')
				return
			}
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onloadend = () => {
				setImage(reader.result)
			}
		}
	}

	const handleTitleChange = e => {
		setTitle(e.target.value)
		setTitleValid(true)
	}

	const handleContentChange = e => {
		setContent(e.target.value)
		setContentValid(true)
	}

	const handleSubmit = e => {
		e.preventDefault()
		if (!title || !content) {
			if (!title) setTitleValid(false)
			if (!content) setContentValid(false)
			return
		}

		const newBlog = {
			id: nanoid(),
			image: image || noImg,
			title,
			content,
		}
		onCreateBlog(newBlog, isEditing)

		setImage(null)
		setTitle('')
		setContent('')

		setShowForm(false)
		setSubmitted(true)

		setTimeout(() => {
			setSubmitted(false)
			onBack()
		}, 3000)
	}

	return (
		<div className='blogs'>
			<div className='blogs-left'>
				<img src={userImg} alt='User Image' className='user-img' />
			</div>
			<div className='blogs-right'>
				{!showForm && !submitted && (
					<button className='post-btn' onClick={() => setShowForm(true)}>
						Create new post
					</button>
				)}

				{submitted && <p className='submission-message'>Post Submitted!</p>}

				<div className={`blogs-right-form ${showForm ? 'visible' : 'hidden'}`}>
					<h1>{isEditing ? 'Edit Post' : 'New Post'}</h1>
					<form className='post-form' onSubmit={handleSubmit}>
						<div className='img-upload'>
							<label htmlFor='file-upload' className='file-upload'>
								<FiUpload />
								Upload image
							</label>
							<input
								type='file'
								id='file-upload'
								onChange={handleImageChange}
							/>
						</div>
						<input
							type='text'
							className={`title-input ${!titleValid ? 'invalid' : ''}`}
							placeholder='Add title (Max 60 characters)'
							value={title}
							onChange={handleTitleChange}
							max={60}
						/>
						<textarea
							className={`text-input ${!contentValid ? 'invalid' : ''}`}
							placeholder='Add text'
							value={content}
							onChange={handleContentChange}
						/>
						<button type='submit' className='submit-btn'>
							{isEditing ? 'Update Post' : 'Submit Post'}
						</button>
					</form>
				</div>

				<button className='blogs-close-btn' onClick={onBack}>
					Back <FaChevronRight />
				</button>
			</div>
		</div>
	)
}
export default Blogs
