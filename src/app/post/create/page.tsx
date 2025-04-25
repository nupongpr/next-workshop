import React from 'react'

export default function CreateForm() {
  return (
    <div>
        <h1 className='text-3xl mt-2'>CreateForm</h1>
        <div>
            <form className='w-full sm:w-8/12 md:w-6/12 mx-auto'>
                <div className='mt-2'>
                    <label htmlFor="" className='text-xl'>Title: </label>
                    <input className='px-4 py-2 border-1 rounded-xl w-full' type="text" name="title" id="title" placeholder='type here...'/>
                </div>
                <div className='mt-2'>
                    <label htmlFor="" className='text-xl'>Content: </label>
                    <textarea className='border-1 px-4 py-6 rounded-xl w-full' name="content" id="content"></textarea>
                </div>
                <div className='flex justify-center mt-2'>
                    <button className='border-1 px-4 py-2 bg-blue-200 rounded-2xl hover:bg-blue-400 cursor-pointer' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}
