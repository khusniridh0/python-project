import { useEffect, useRef } from "react";


const Loading = () => {
  const ref = useRef('')
  useEffect(() => {
    setTimeout(() => {
      ref?.current?.classList.add('hide')
    }, 300)
    
    setTimeout(() => {
      ref?.current?.classList.add('none')
    }, 600)
  })

  return (
    <div className="loading" ref={ref}/>
  )
}

export default Loading