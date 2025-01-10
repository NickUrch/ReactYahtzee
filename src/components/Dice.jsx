import PropTypes from "prop-types"

export default function Dice(props) {

    const cssStyle = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    //https://github.com/NickUrch/ReactYahtzee/blob/main/src/images/five.png
    function getDieImage() {
        switch (props.value) {
            case 1:
                return ("./blob/main/src/images/one.png")
            case 2:
                return ("./blob/main/src/images/two.png")
            case 3:
                return ("./blob/main/src/images/three.png")
            case 4:
                return ("./blob/main/src/images/four.png")
            case 5:
                return ("./blob/main/src/images/five.png")
            case 6:
                return ("./blob/main/src/images/six.png")
            default:
                return ("./blob/main/src/images/unknown.png")
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
