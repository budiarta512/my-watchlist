import React from 'react'

const CardMovie = (props) => {
  const data = {
    ...props
  }
  return (
    <div key={props.id}>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md w-60 h-[36rem] flex flex-col justify-between">
          <img className="rounded-t-lg h-72" src={'http://image.tmdb.org/t/p/w500/' + props.img} alt="" />
          <div className="px-5 pt-2 h-[14rem]">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{props.title.length < 25 ? props.title : props.title.substring(0, 26) + '...'}</h5>
              <p className="mb-3 font-normal text-gray-700">{props.desc.substring(0, 100) + '...'}</p>
          </div>
          <div className="p-5 flex gap-2">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={()=> props.clickHandle(data)} >Tambah Movie</button>
          {
            props.deleteHandle ?
            <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={()=> props.deleteHandle(props.id)} >Hapus</button> :
            ''
          }
          </div>
      </div>
    </div>
  )
}

export default CardMovie