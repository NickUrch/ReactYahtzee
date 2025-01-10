import PropTypes from "prop-types";

export default function RollBtn(props) {

    const cssStyle = {
        backgroundColor: props.rollsRemain ? "#5035FF" : "#7A7A7A"
    }

    return (
        <button
            className="roll-button"
            style={cssStyle}
            disabled={props.rollsRemain ? false : true}
            onClick={props.onClickFunc}
        >
            {props.gameOver ? "New Game" : "Roll Dice"}
        </button>
    )
}

RollBtn.propTypes = {
    rollsRemain: PropTypes.number.isRequired,
    onClickFunc: PropTypes.func.isRequired,
    gameOver: PropTypes.bool.isRequired
}