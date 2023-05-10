function Map(props) {
    const lines = [<Line key={0}/>];

    function checkSelected(id) {
        if (props.selected == '') return;
        let sel = props.selected.toLowerCase();
        if (props.positions[sel][0] != 0) {
            let old = document.getElementById(props.positions[sel][0] + props.positions[sel][1])
            old.innerHTML = ''
        }
        let current = document.getElementById(id)
        current.innerHTML = sel[0].toUpperCase()
        props.positions[sel] = id.split("")
    }

    for (let y = 1; y <= 8; y++) {
        lines.push(<Line key={y} y={y} checkSelected={checkSelected} />);
    }
    return (
        <div className="col row fs-5 fw-semibold">
            <div className="col-11">
                {lines}
            </div>
        </div>
    );
}

function Line(props) {
    const squares = [<span key={0} className="text-end font-monospace pt-2 me-1">{props.y || "/"}</span>];
    ["A", "B", "C", "D", "E", "F", "G", "H"].forEach((x) => {
        squares.push(<Square key={x} x={x} y={props.y} checkSelected={props.checkSelected} />);
    })
    return (
        <div className='d-flex'>
            {squares}
        </div>
    );
}

function Square(props) {
    const style = {
        backgroundColor: "white",
        width: '50px',
        height: '50px',
        border: '1px solid black',
    };

    if(props.y==undefined){
        return <span style={{width: '50px'}} className="text-center font-monospace">{props.x}</span>
    }

    return (
        <button style={style} id={props.x + props.y} type="button" onClick={(event) => props.checkSelected(event.target.id)}></button>
    );
}

export default Map;