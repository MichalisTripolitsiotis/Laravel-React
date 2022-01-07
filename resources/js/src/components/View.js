import { useEffect, useState } from "react";
import AppContainer from "./ui/AppContainer";
import { useParams } from "react-router-dom";
import api from "../api";
import { Link } from 'react-router-dom';

const View = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        api.getOnePost(id).then((response) => {
            const result = response.data;
            const post = result.data;

            setTitle(post.title);
            setDescription(post.description);
        })
    }, [])

    return (
        <AppContainer>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                </div>
            </div>
            <br />
            <Link to="/" className="btn btn-primary">Back</Link>
        </AppContainer>
    )
}

export default View;

