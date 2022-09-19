import useFetch from './useFetch';
import BlogList from './BlogList';

const Home = () => {

    // Instead of renaming data to blogs, this is another solution
    const { data: blogs, setData, isFetching, error } = useFetch('http://localhost:8000/blogs');

    const deleteBlog = (id) => {
        fetch('http://localhost:8000/blogs/' + id, {
          method: 'DELETE'
        });
        
        // Re-render the BlogList when a blog is deleted
        const newBlogs = blogs.filter(element => element.id !== id);
        setData(newBlogs);

    }

    return (
        <div className="home">
            { error && <div>{error}</div> }
            { isFetching && <div>Loading...</div> }
            { blogs && <BlogList blogs={ blogs } title="All Blogs!" deleteBlog={deleteBlog}></BlogList>}
        </div>
    );
}

export default Home;