'use client'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { auth } from '../../../../firebase';
import { useRouter } from 'next/navigation';


type Inputs = {
    email: string,
    password: string
}

const Register = () => {

    const router = useRouter();

    const {
        register, 
        handleSubmit, 
        formState:{errors},
    } = useForm<Inputs>();

    const onsubmit:SubmitHandler<Inputs> = async (data) => {
        await createUserWithEmailAndPassword(auth,data.email, data.password).then((userCredential) => {
            const user = userCredential.user;
            router.push("/auth/login")
        })
        .catch((error)=> {
            if(error.code === "auth/email-already-in-use"){
                alert("このメールアドレスは既に使用されています")
            } else{
                alert(error.message);
            }
         });
    }

    const handleLogin = () => {
        router.push("/auth/login")
    }


  return (
    <div className='h-screen flex flex-col items-center justify-center'>
        <form  onSubmit={handleSubmit(onsubmit)}   className='bg-white p-8 rounded-md shadow-md w-96'>
            <h1 className='mb-4 text-2xl  text-gray-500 font-medium'>新規登録</h1>
            <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-500'>Email</label>
                <input  {...register("email", {
                    required: "メールアドレスは必須です",
                    pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                        message: '不適切なメールアドレスです'
                    }
                })}    type='text' className='mt-1 border-2  rounded-md w-full p-2' />
                {errors.email && <span className='text-red-600 text-small'>{errors.email.message}</span>}
            </div>
            <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-500'>Password</label>
                <input {...register("password" , {
                    required: "パスワードは必須です",
                    minLength: {
                        value: 6,
                        message: '6文字以上で入力してください'
                    }
                })} type='password' className='mt-1 border-2  rounded-md w-full p-2' />
                 {errors.password && <span className='text-red-600 text-small'>{errors.password.message}</span>}
            </div>
            <div className='flex justify-center'>
                <button className='bg-blue-300 text-white font-bold py-2 px-4  mb-2  rounded w-full hover:bg-blue-700'>新規登録</button>
            </div>
             <div className='mt-4'>
                <span className='text-gray-500 text-sm'>既にアカウントはお持ちですか?</span>
                <button  onClick={handleLogin}  type='submit'  className='text-blue-500 text-sm font-bold ml-2 hover:text-blue-900'>ログインページへ</button>
             </div>
        </form>
    </div>
  )
}

export default Register;