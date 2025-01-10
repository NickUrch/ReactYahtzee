import PropTypes from "prop-types";

export default function TakeScoreBtn(props) {
    
    const disableClick = props.scores.find(score => score.selected === true) ? false : true

    const cssStyle = {
        backgroundColor: (props.rollsRemain === 3 || disableClick) ? "#7A7A7A" : "#5035FF"
    }

    return (
        <button
            className="score-button"
            type="button"
            style={cssStyle}
            onClick={props.takeScore}
            disabled={props.rollsRemain === 3 || disableClick}
        >
            Take Score
        </button>
    )
}

TakeScoreBtn.propTypes = {
    scores: PropTypes.array.isRequired,
    rollsRemain: PropTypes.number.isRequired,
    takeScore: PropTypes.func.isRequired
}