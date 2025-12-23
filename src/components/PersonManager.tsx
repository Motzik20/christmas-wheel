import { usePersonContext } from "../contexts/PersonContext"
import PersonForm from "./PersonForm"
import PersonList from "./PersonList"
import "../styles/PersonManager.css"

export default function PersonManager() {
    const { people, addPerson, deletePerson } = usePersonContext()

    return (
        <div className="person-manager">
            <PersonForm onAddPerson={addPerson} />
            <PersonList persons={people} onDelete={deletePerson} />
        </div>
    )
}

