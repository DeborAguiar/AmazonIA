
function List(props) {
    return <ol className="list-group mt-4 overflow-auto" style={{ height: "40vh" }}>
        {props.list.map(({ time, path },idx) => {
            return <li key={idx} className="list-group-item justify-content-between align-items-start">
                <div className="fw-bold">{path[0] + " > " + path[path.length - 1]} took {time.toFixed(2)} seconds</div>
                {path.map((p, idx) => {
                    if (idx == path.length - 1) {
                        return p
                    }
                    return p + " - "
                })}
            </li>
        })}
    </ol>
}

export default List;