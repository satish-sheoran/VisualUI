import Range from './Types/Range'
import Text from './Types/Text'


const Input = ({ details }) => {

    return (
        <>
            {details.attributes && details.attributes.type === 'text' &&
                <Text details={details} />
            }

            {details.attributes && details.attributes.type === 'range' &&
                <Range details={details} />
            }
        </>
    )
}

export default Input