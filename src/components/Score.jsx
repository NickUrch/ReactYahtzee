import PropTypes from "prop-types";
import { nanoid } from "nanoid"
import TakeScoreBtn from "./TakeScoreBtn";

export default function Score(props) {

    const scoreElements = props.scores.map(score => {
        return (
            <label key={nanoid()} className="score-element">
                {score.text}
                {(score.input && !score.used) ? 
                    <input
                        id={score.name}
                        type={score.type}
                        name="RadioGroup"
                        value={score.name}
                        checked={score.selected}
                        onChange={props.handleChange}
                        disabled={props.rollsRemain === 3}
                    />
                    : <span />
                }
                <input className="score-value" type="text" readOnly={true} value={score.value !== null ? score.value : ""} />
            </label>
        )
    })

    const takeScoreBtn = 
        <TakeScoreBtn
            scores={props.scores}
            rollsRemain={props.rollsRemain}
            takeScore={props.handleSubmit}
        />

    return (
        <form disabled={props.rollsRemain === 3}>
            <fieldset className="score">
                <legend><b>Score Sheet</b></legend>
                {scoreElements}
                {takeScoreBtn}
            </fieldset>
        </form>
    )
}

Score.propTypes = {
    scores: PropTypes.array.isRequired,
    rollsRemain: PropTypes.number.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
}