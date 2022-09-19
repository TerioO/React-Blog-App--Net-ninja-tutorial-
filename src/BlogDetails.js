import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { useNavigate } from 'react-router-dom';

const BlogDetails = () => {

    const { id } = useParams();
    const { data: blog, isFetching, error } = useFetch('http://localhost:8000/blogs/' + id);
    const navigate = useNavigate();

    //  Click event to delete current blog:
    const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + id, {
            method: 'DELETE'
        })
        .then(() => navigate('/home'))
    }

    return (
        <div className="blog-details">
            { isFetching && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by: { blog.author }</p>
                    <div>{ blog.body }</div>
                    <button onClick={handleClick}>Delete blog</button>
                </article>
            )}
        </div>
    )
}

export default BlogDetails;
