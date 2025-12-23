import { useState, type JSX } from "react";
import { Wheel } from 'react-custom-roulette'
import type { WheelData } from "react-custom-roulette/dist/components/Wheel/types";
import '../styles/Luckywheel.css'
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2'


export default function LuckyWheel(): JSX.Element {

    const initialData: WheelData[] = [
        { option: 'Beni', style: { backgroundColor: 'green', textColor: 'white' } },
        { option: 'Motzik', style: { backgroundColor: 'white', textColor: 'black' } },
        { option: 'Vici', style: { backgroundColor: 'red', textColor: 'white' } },
    ];

    const[mustSpin, setMustSpin] = useState<boolean>(false)
    const[prizeNumber, setPrizeNumber] = useState<number>(0)
    const[data, setData] = useState<WheelData[]>(initialData)


    function handleSpinCLick(): void {
        if(!mustSpin){
            const newPrizeNumber = Math.floor(Math.random()* data.length)
            setPrizeNumber(newPrizeNumber)
            setMustSpin(true)
        }
    }

    function handleStopSpinning(): void {
        setMustSpin(false);
        const newData = data.filter((_, index)=> index !== prizeNumber)
        setData(newData)
        Swal.fire({
            title: 'Gewinner!',
            text: `${data[prizeNumber].option} du bist mit auspacken dran!🎉`,
            confirmButtonText: 'Geilo!'
        })
    }

    return (
        <div className="wheel-container">
            <h1 className="wheel-header">Glücksrad</h1>
            <Wheel
               mustStartSpinning={mustSpin}
               data={data}
               backgroundColors={['#3e3e3e', '#df3428']}
               textColors={['black']}
               prizeNumber={prizeNumber}
               onStopSpinning={handleStopSpinning}
            />
            {data.length > 1  && <button className="wheel-button" onClick={handleSpinCLick} disabled={mustSpin}>Drehen</button>}
            {data.length < 2 && <button className="wheel-button"> Beenden </button>}

        </div>
    )
}