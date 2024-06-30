import { InfinitySpin } from 'react-loader-spinner'



const Loading = () => {
    return (
        <div className='h-screen flex items-center justify-center'>
            <InfinitySpin
                visible={true}
                width="200"
                color="#4c1d95"
                ariaLabel="infinity-spin-loading"
            />
        </div>
    )
}

export default Loading

