import { useRef, useState } from "react"
import { TimeFrame } from "./components/TimeFrame"
import { formats } from "./constants/consts"

export function App() {
    const [timeFrames, setTimeFrames] = useState([])
    const newTitleInput = useRef()
    const newFormatInput = useRef()

    function createNewTimeFrame(event) {
        event.preventDefault()
        const newTimeFrame = {
            id: timeFrames.length > 0 ? timeFrames[timeFrames.length - 1].id + 1 : 0,
            title: newTitleInput.current.value,
            hours: [],
            format: newFormatInput.current.value,
            startEndTimes: newFormatInput.current.value === formats["0"] ? null : ["15:12 to 32:15", "13: 50 to 15:60"]
        }
        setTimeFrames([...timeFrames, newTimeFrame])
        newTitleInput.current.value = ""
    }

    function addNewHour({id, value}){
        let timeFrame = timeFrames.find((timeFrame) => timeFrame.id === id)
        timeFrame.hours = [...timeFrame.hours, value]
        const timeFrameIndex = timeFrames.indexOf(timeFrame)
        setTimeFrames([...timeFrames.slice(0, timeFrameIndex), timeFrame, ...timeFrames.slice(timeFrameIndex + 1, timeFrames.length)])
    }
    function deleteTimeFrame(id) {
        setTimeFrames(timeFrames.filter((timeFrame) => timeFrame.id !== id))
    }

    return (
        <>
            <h1>Hour tracker</h1>

            <form onSubmit={createNewTimeFrame}>
                <input required ref={newTitleInput}/>
                <select required ref={newFormatInput}>
                    <option value="">Select a format</option>
                    <option value={formats["0"]}>Introduce hours</option>
                    <option value={formats["1"]}>Introduce start/end time</option>
                </select>
                <button>Create time frame</button>
            </form>

            {
                timeFrames.map((timeFrame) =>
                    <TimeFrame key={timeFrame.id} {...timeFrame} deleteTimeFrame={deleteTimeFrame} addNewHour={addNewHour}/>
                )
            }
        </>
    )
}