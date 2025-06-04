import { useEffect, useState } from 'react'
import axios from 'axios'

import NewsModal from './NewsModal'
import BookmarksModal from './BookmarksModal'
import BlogsModal from './BlogsModal'
import Calendar from './Calendar'
import Weather from './Weather'
import './News.css'

import userImg from '../assets/images/user.jpg'
import noImg from '../assets/images/no-img.png'

import { FaNewspaper } from 'react-icons/fa6'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoBookmarks, IoBookmarksOutline } from 'react-icons/io5'
import { FaEdit } from 'react-icons/fa'
import { FaTimesCircle } from 'react-icons/fa'
import Loader from './Loader'

const categories = [
	'general',
	'world',
	'nation',
	'business',
	'technology',
	'entertainment',
	'sports',
	'science',
	'health',
]

function News({ onShowBlogs, blogs, onEditBlog, onDeleteBlog }) {
	const [headline, setHeadline] = useState(null)
	const [news, setNews] = useState([])
	const [selectedCategory, setSelectedCategory] = useState(categories[0])
	const [searchInput, setSearchInput] = useState('')
	const [searchQuery, setSearchQuery] = useState('')
	const [showModal, setShowModal] = useState(false)
	const [selectedArticle, setSelectedArticle] = useState(null)
	const [bookmarks, setBookmarks] = useState([])
	const [showBookmarksModal, setShowBookmarksModal] = useState(false)
	const [selectedPost, setSelectedPost] = useState(null)
	const [showBlogsModal, setShowBlogsModal] = useState(false)

	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		// const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY
		let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&max=10&apikey=${
			import.meta.env.VITE_NEWS_API_KEY
		}`

		if (searchQuery) {
			url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&max=10&apikey=${
				import.meta.env.VITE_NEWS_API_KEY
			}`
		}

		const fetchNews = async () => {
			try {
				const response = await axios.get(url)
				const fechedNews = await response.data.articles
				fechedNews.forEach(article => {
					if (!article.image) {
						article.image = noImg
					}
				})
				setHeadline(fechedNews[0])
				setNews(fechedNews.slice(1, 7))
				const savedBookmarks =
					JSON.parse(localStorage.getItem('bookmarks')) || []
				setBookmarks(savedBookmarks)
				setIsError(false)
			} catch (error) {
				console.log(error)
				setIsError(true)
			} finally {
				setIsLoading(false)
			}
		}
		fetchNews()
	}, [selectedCategory, searchQuery])

	const handleSearch = e => {
		e.preventDefault()
		setSearchQuery(searchInput)
		setSearchInput('')
	}

	const handleClickCategory = category => {
		setSearchQuery('')
		setSelectedCategory(category)
	}

	const handleArticleClick = article => {
		setSelectedArticle(article)
		setShowModal(true)
		setShowBookmarksModal(false)
	}

	const handleBookmarkClick = article => {
		setBookmarks(prevBookmarks => {
			const updatedBookmarks = prevBookmarks.find(
				prevBookmark => prevBookmark.title === article.title
			)
				? prevBookmarks.filter(
						prevBookmark => prevBookmark.title !== article.title
				  )
				: [...prevBookmarks, article]
			localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
			return updatedBookmarks
		})
	}

	const handlePostClick = post => {
		setSelectedPost(post)
		setShowBlogsModal(true)
	}

	const handleBlogsModalClose = () => {
		setShowBlogsModal(false)
		setSelectedPost(null)
	}

	return (
		<div className='news'>
			<header className='news-header'>
				<h1 className='logo'>
					<FaNewspaper />
					<span>News & Blogs App</span>
				</h1>
				<div className='search-bar'>
					<form onSubmit={handleSearch}>
						<input
							type='text'
							value={searchInput}
							onChange={e => setSearchInput(e.target.value)}
							placeholder='Search News...'
						/>
						<button type='submit'>
							<FaMagnifyingGlass />
						</button>
					</form>
				</div>
			</header>
			<div className='news-content'>
				{/* Navbar */}
				<div className='navbar'>
					<div className='user' onClick={onShowBlogs}>
						<img src={userImg} alt='User Image' />
						<p>Mary's Blog</p>
					</div>
					<nav className='categories'>
						<h3 className='nav-heading'>Categories</h3>
						<div className='nav-links'>
							{categories.map(category => (
								<a
									href='#'
									className='nav-link'
									key={category}
									onClick={() => handleClickCategory(category)}>
									{category}
								</a>
							))}
							<a
								href='#'
								className='nav-link'
								onClick={() => setShowBookmarksModal(true)}>
								Bookmarks <IoBookmarks />
							</a>
						</div>
					</nav>
				</div>

				{/* News Section */}
				<div className='news-section'>
					{isLoading && <Loader />}
					{isError && <p className='error'>Something get wrong</p>}
					{!isLoading && !isError && (
						<>
							<div
								className='headline'
								onClick={() => handleArticleClick(headline)}>
								<img src={headline?.image || noImg} alt={headline?.title} />
								<h2 className='headline-title'>
									{headline?.title}
									<span
										className='bookmark-box'
										onClick={e => {
											e.stopPropagation()
											handleBookmarkClick(headline)
										}}>
										{bookmarks.some(
											bookmark => bookmark.title === headline.title
										) ? (
											<IoBookmarks />
										) : (
											<IoBookmarksOutline />
										)}
									</span>
								</h2>
							</div>
							<div className='news-grid'>
								{news.map((article, index) => {
									return (
										<div
											className='news-grid-item'
											key={index}
											onClick={() => handleArticleClick(article)}>
											<img src={article?.image || noImg} alt={article.title} />
											<h3>
												{article.title}
												<span
													className='bookmark-box'
													onClick={e => {
														e.stopPropagation()
														handleBookmarkClick(article)
													}}>
													{bookmarks.some(
														bookmark => bookmark.title === article.title
													) ? (
														<IoBookmarks />
													) : (
														<IoBookmarksOutline />
													)}
												</span>
											</h3>
										</div>
									)
								})}
							</div>
						</>
					)}
				</div>

				{/* News Modal */}
				{showModal && (
					<NewsModal
						article={selectedArticle}
						onCloseModal={() => setShowModal(false)}
					/>
				)}

				{/* Bookmarks Modal */}
				{showBookmarksModal && (
					<BookmarksModal
						bookmarks={bookmarks}
						onCloseModal={() => setShowBookmarksModal(false)}
						onSelectedArticle={handleArticleClick}
						onDeleteBookmark={handleBookmarkClick}
					/>
				)}

				{/* My Blogs */}
				<div className='my-blogs'>
					<h1 className='my-blogs-heading'>My blogs</h1>
					<div className='blog-posts'>
						{blogs.map((blog, index) => {
							return (
								<div
									key={index}
									className='blog-post'
									onClick={() => handlePostClick(blog)}>
									<img src={blog.image || noImg} alt={blog.title} />
									<h3>{blog.title}</h3>
									<div className='post-buttons'>
										<button
											className='edit-btn'
											onClick={() => onEditBlog(blog)}>
											<FaEdit />
										</button>
										<button
											className='delete-btn'
											onClick={e => {
												e.stopPropagation()
												onDeleteBlog(blog.id)
											}}>
											<FaTimesCircle />
										</button>
									</div>
								</div>
							)
						})}
					</div>
				</div>

				{/* Blogs Modal */}
				{selectedPost && showBlogsModal && (
					<BlogsModal
						show={showBlogsModal}
						post={selectedPost}
						onClose={handleBlogsModalClose}
					/>
				)}

				{/* Weather and Calendar */}
				<div className='weather-calendar'>
					<Weather />
					<Calendar />
				</div>
			</div>
			<footer className='news-footer'>
				<h3 className='logo'>
					<FaNewspaper />
					<span>News & Blogs App</span>
				</h3>
				<p className='copyright'>
					&copy; All rights reserved By Code and Create
				</p>
			</footer>
		</div>
	)
}
export default News
