import { useState } from "react"
import type { Person } from "../types"
import PersonForm from "./PersonForm"
import PersonList from "./PersonList"
import "../styles/PersonManager.css"

export default function PersonManager() {
    const [people, setPeople] = useState<Person[]>([])

    const handleAddPerson = (person: Person) => {
        setPeople([...people, person])
    }

    return (
        <div className="person-manager">
            <PersonForm onAddPerson={handleAddPerson} />
            <PersonList persons={people} />
        </div>
    )
}

