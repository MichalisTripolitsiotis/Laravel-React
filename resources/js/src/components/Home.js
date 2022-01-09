import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import AppContainer from './ui/AppContainer';

const Home = () => {
    const [posts, setPosts] = useState(null);

    const fetchPosts = () => {
        api.getAllPosts().then(res => {
            const result = res.data;
            setPosts(result.data);
        });
    }

    useEffect(() => {
        fetchPosts();

    }, []);

    const deletePostHandler = (id) => {
        api.deletePost(id).catch(err => {
            console.log(err);
        });

        setPosts((prevPosts) => {
            return prevPosts.filter(post => post.id !== id);
        })
    };


    const changeCompletedHandler = async (post) => {
        try {
            await api.updatePost({
                title: post.title,
                description: post.description,
                completed: !post.completed
            }, post.id)

        } catch (err) {
            console.log(err);
        }
    }

    const renderPosts = () => {
        if (!posts || posts.length === 0) {
            return (
                <tr>
                    <td colSpan="4">No posts found</td>
                </tr>
            );
        }

        return posts.map((post) => (
            <tr key={post.id}>
                <td>
                    <input type="checkbox"
                        defaultChecked={post.completed}
                        onChange={changeCompletedHandler.bind(null, post)}
                    />
                </td>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td><Link to={`posts/${post.id}`} className="btn btn-success">View</Link></td>
                <td><Link to={`/edit/${post.id}`} className="btn btn-warning">Edit</Link></td>
                <td><button onClick={deletePostHandler.bind(null, post.id)} className="btn btn-danger">Delete</button></td >
            </tr>
        ))
    }
    return (
        <AppContainer title="Laravel & ReactJS">
            <Link to="/add" className="btn btn-primary">Add</Link>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Completed</th>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>View</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderPosts()}
                    </tbody>
                </table>
            </div>
        </AppContainer>

    )
}

export default Home;

