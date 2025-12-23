import { useState, useEffect, type JSX } from "react";
import { Wheel } from 'react-custom-roulette'
import type { WheelData } from "react-custom-roulette/dist/components/Wheel/types";
import '../styles/Luckywheel.css'
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2'
import { usePersonContext } from "../contexts/PersonContext";

export default function LuckyWheel(): JSX.Element {
    const colors = ['green', 'red', 'blue', 'pink', 'purple', 'orange', 'brown']
    const { people } = usePersonContext()
    function generateData(): WheelData[] {
        let data: WheelData[] = []
        for (let i = 0; i < people.length; i++) {
            if (people[i].presents > 0) {
                for (let j = 0; j < people[i].presents; j++) {
                    data.push({
                        option: people[i].name,
                        style: { backgroundColor: colors[i % colors.length], textColor: 'white' }
                    })
                }
            }
        }
        return data
    }

    const[mustSpin, setMustSpin] = useState<boolean>(false)
    const[prizeNumber, setPrizeNumber] = useState<number>(0)
    const[data, setData] = useState<WheelData[]>([])

    useEffect(() => {
        const newData = generateData()
        setData(newData)
        setMustSpin(false)
        setPrizeNumber(0)
    }, [people])


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

    if (data.length < 1) {
        return (
            <div className="wheel-container">
                <h1 className="wheel-header">Glücksrad</h1>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginTop: '40px' }}>
                    Bitte füge Personen mit Geschenken hinzu, um das Glücksrad zu nutzen.
                </p>
            </div>
        )
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