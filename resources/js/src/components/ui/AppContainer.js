const AppContainer = (props) => {
    return (
        <div className="container">
            <div className="card">
                <h5 className="card-header">{props.title}</h5>
                <div className="card-body">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default AppContainer

