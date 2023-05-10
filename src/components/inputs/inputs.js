
function Inputs(props) {

    return (
        <div>
            <div className="btn-group" role="group">
                <input type="radio" className="btn-check" name="btnradio" value={"Origin"} onChange={props.setSelected} id="btnradio1" autoComplete="off" />
                <label className="btn btn-outline-light" htmlFor="btnradio1">Origin</label>
                <input type="radio" className="btn-check" name="btnradio" value={"Pickup"} onChange={props.setSelected} id="btnradio2" autoComplete="off" />
                <label className="btn btn-outline-light" htmlFor="btnradio2">Pickup</label>
                <input type="radio" className="btn-check" name="btnradio" value={"Destination"} onChange={props.setSelected} id="btnradio3" autoComplete="off" />
                <label className="btn btn-outline-light" htmlFor="btnradio3">Destination</label>
            </div>
            <div className="d-grid mt-4">
                {/* With the ternary operator below it is possible to check if the spinner will be visible or not. */}
                <button className="btn btn-outline-light" type="button" onClick={() => props.search()}>{
                    props.spinner
                        ? <div className="spinner-border text-danger " role="status"></div>
                        : "Search"
                }</button>
            </div>
        </div>
    )

}

export default Inputs;