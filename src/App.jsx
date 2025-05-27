import { useEffect, useState } from 'react'
import News from './components/News'
import Blogs from './components/Blogs'

function App() {
	const [showNews, setShowNews] = useState(true)
	const [showBlogs, setShowBlogs] = useState(false)
	const [blogs, setBlogs] = useState([])

	const [selectedPost, setSelectedPost] = useState(null)
	const [isEditing, setIsEditing] = useState(false)

	useEffect(() => {
		const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || []
		setBlogs(savedBlogs)
	}, [])

	const handleBackToNews = () => {
		setShowBlogs(false)
		setShowNews(true)
		setIsEditing(false)
		setSelectedPost(null)
	}

	const handleShowBlogs = () => {
		setShowBlogs(true)
		setShowNews(false)
	}

	const handleCreateBlog = (newBlog, isEdit) => {
		setBlogs(prevBlogs => {
			const updatedBlogs = isEdit
				? prevBlogs.map(blog => (blog.id === selectedPost.id ? newBlog : blog))
				: [...prevBlogs, newBlog]
			localStorage.setItem('blogs', JSON.stringify(updatedBlogs))
			return updatedBlogs
		})
		setIsEditing(false)
		setSelectedPost(null)
	}

	const handleEditBlog = blog => {
		setSelectedPost(blog)
		setIsEditing(true)
		setShowNews(false)
		setShowBlogs(true)
	}

	const handleDeleteBlog = blogId => {
		setBlogs(prevBlogs => {
			const updatedBlogs = prevBlogs.filter(blog => blog.id !== blogId)
			localStorage.setItem('blogs', JSON.stringify(updatedBlogs))
			return updatedBlogs
		})
	}

	return (
		<div className='container'>
			<div className='news-blogs-app'>
				{showNews && (
					<News
						onShowBlogs={handleShowBlogs}
						blogs={blogs}
						onEditBlog={handleEditBlog}
						onDeleteBlog={handleDeleteBlog}
					/>
				)}
				{showBlogs && (
					<Blogs
						onBack={handleBackToNews}
						onCreateBlog={handleCreateBlog}
						isEditing={isEditing}
						editPost={selectedPost}
					/>
				)}
			</div>
		</div>
	)
}
export default App
