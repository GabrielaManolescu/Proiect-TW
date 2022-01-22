import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Button } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import PhotoIcon from "@material-ui/icons/Photo";
import '../App.css'

function Home() {
    const navigate = useNavigate();
    return <Fragment>

        <div>
            <br></br>
            <br></br>
            <br></br>
            <h3>
                Informații despre candidati!

            </h3>
            <br></br>
            <br></br>
            <br></br>
        </div>

        <ButtonGroup variant="contained">
            <Button startIcon={<PhotoIcon />}
                color="primary"
                size="small"
                onClick={function onClick() {
                    navigate("/gallery")
                }}>
                Fotografii
            </Button >
            <Button startIcon={<InfoIcon />}
                size="small"
                color="secondary"
                onClick={function onClick() {
                    navigate("/add")
                }}>
                Adauga angajat - profile
            </Button>
        </ButtonGroup>
        <br></br>
        <br></br>
        <br></br>
        <div>
            <img src="/li.png" alt="" />
        </div>

    </Fragment >
}

export default Home;