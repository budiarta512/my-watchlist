import React from 'react'

const TextInput = (props) => {
  return (
    <div>
      {
        props.isLabelVisible ? 
        <label htmlFor={props.id} className="block mb-2 text-sm font-medium text-gray-900 ">{props.name}</label> :
        ''
        
      }
      <input type={props.type} id={props.id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={props.name} onChange={(e)=> props.onChangeHandle(e.target.value)} />
    </div>
  )
}

export default TextInput