"use client";
import {useState} from 'react'
import {style} from "@/app/globals.css";

export default function App() {
    const [counter, setCounter] = useState(0) 
    
    return(
    <div className="Main">
        <h1>{counter}</h1>
        <div className="btn">
            <button id="dec" onClick={()=> setCounter(prev=> prev - 1)}>Багасгах</button>
             <button id="res" onClick={()=> setCounter(0)}>Эхлүүлэх</button>
              <button  id="inc" onClick={()=> setCounter(prev=> prev + 1)}>Ихэсгэх</button>
        </div>
    </div>
    )
}
