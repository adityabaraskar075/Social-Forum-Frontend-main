import { Puff } from 'react-loader-spinner'

const SmallLoader = () => {
    return (
        <Puff
            visible={true}
            height="15"
            width="15"
            color="#FFFFFF"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
}

export default SmallLoader