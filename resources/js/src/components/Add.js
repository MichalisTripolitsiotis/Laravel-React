import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "../api";
import AppContainer from "./ui/AppContainer"

const Add = () => {
    const titleInputRef = useRef();
    const descriptionInputRef = useRef();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const submitHandler = async (event) => {
        event.preventDefault();

        setLoading(true);

        const enteredTitle = titleInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

        try {
            await api.addPost({
                title: enteredTitle,
                description: enteredDescription
            })

            navigate('/');
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    }

    return (
        <AppContainer title="Add new post">
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Title" ref={titleInputRef} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" placeholder="Description" ref={descriptionInputRef}>
                    </textarea>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary" disabled={loading}>Add</button>
                </div>
            </form>
        </AppContainer>
    )
}

export default Add
