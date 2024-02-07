import { useRef } from "react"
import { clearNumericInput } from "../tools/tools"
import { formats } from "../constants/consts"

export function TimeFrame({ id, title, hours, format, startEndTimes, deleteTimeFrame, addNewHour }) {

    const newHourRef = useRef()
    let totalHours = 0

    hours.forEach((hour)=>{
        totalHours += parseFloat(hour)
    })
    
    function handleChange(e){
        e.target.value = clearNumericInput(e.target.value)
    }
    
    function handleSubmit(event){
        event.preventDefault()
        addNewHour({
            id,
            value: newHourRef.current.value
        })
        newHourRef.current.value = ""
    }

    function hour_to_hours_and_minutes(hour){
        return `${Math.floor(hour / 60)}h ${hour % 60}m`
    }
    return <article>
        <header>
            <h2>{title} format: {format}</h2>
        </header>
        <section>
            <form onSubmit={handleSubmit}>
                <input required ref={newHourRef} onChange={handleChange}/>
                <button type="submit">Add new hour</button>
            </form>
        </section>
        <section>
            {
                hours.map((hour, id)=>
                    <div key={id}>
                        <span>
                            • {
                            format === formats["1"] && 
                                startEndTimes[id] + " -"
                            } {hour}h - {hour_to_hours_and_minutes(hour)}
                        </span><br/>
                    </div>
                )
            }
        </section>
        <h3>Total: {totalHours}</h3>
        <button onClick={() => { deleteTimeFrame(id) }}>delete</button>
    </article>
}

