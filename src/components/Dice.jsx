import PropTypes from "prop-types"
import One from "../images/one.png"
import Two from "../images/two.png"
import Three from "../images/three.png"
import Four from "../images/four.png"
import Five from "../images/five.png"
import Six from "../images/six.png"
import Unkown from "../images/unknown.png"

export default function Dice(props) {

    const cssStyle = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    
    function getDieImage() {
        switch (props.value) {
            case 1:
                return One
            case 2:
                return Two
            case 3:
                return Three
            case 4:
                return Four
            case 5:
                return Five
            case 6:
                return Six
            default:
                return Unkown
        }
    }

    const dieImage = getDieImage()

    return (
        <button
            className="die"
            style={cssStyle}
            onClick={props.toggleHold}
            disabled={!props.allowClick}
        >
            <img src={dieImage} alt="die image" className="die-image"/>
        </button>
    )
}

Dice.propTypes = {
    value: PropTypes.number,
    isHeld: PropTypes.bool.isRequired,
    toggleHold: PropTypes.func.isRequired,
    allowClick: PropTypes.bool.isRequired
}
