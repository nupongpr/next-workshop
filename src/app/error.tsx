"use client"
import React from 'react'

export default function error() {
  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-red-500'>Something went wrong</h1>
        <p>Try to refresh the page</p>
    </div>
  )
}
