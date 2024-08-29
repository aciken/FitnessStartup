import { VerificationPop } from '../VerificationPop';
import { useNavigate } from 'react-router-dom'

export function Verification() {

    const navigate = useNavigate()


        return(
            <div className={`h-[100vh] flex flex-row justify-center items-center relative z-10 `}>
            <VerificationPop  />
            <button onClick={() => navigate('/')} className='absolute top-2'><h1 className='text-3xl text-gray-700 font-poppins font-semibold'>Logo</h1></button>
            </div>
        )
}