import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import AppContainer from "./ui/AppContainer";

const Edit = () => {
    const titleInputRef = useRef();
    const descriptionInputRef = useRef();

    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.getOnePost(id).then((response) => {
            const result = response.data;
            const post = result.data;

            // Define first old values
            titleInputRef.current.value = post.title;
            descriptionInputRef.current.value = post.description;
        })
    }, [])

    const submitHandler = async (event) => {
        event.preventDefault();

        setLoading(true);

        const enteredTitle = titleInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

        try {
            await api.updatePost({
                title: enteredTitle,
                description: enteredDescription
            }, id)

            navigate('/');
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    }

    return (
        <AppContainer title="Edit">
            <form onSubmit={submitHandler}>
                
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Title" defaultValue={titleInputRef} ref={titleInputRef} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" placeholder="Description" defaultValue={descriptionInputRef} ref={descriptionInputRef}>
                    </textarea>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary" disabled={loading}>Save</button>
                </div>
            </form>
        </AppContainer>
    )
}

export default Edit
