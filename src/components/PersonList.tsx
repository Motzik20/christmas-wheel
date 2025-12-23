import type { Person } from "../types"
import "../styles/PersonList.css"

interface PersonListProps {
    persons: Person[]
}

export default function PersonList({ persons }: PersonListProps) {
    return (
        <div className="person-list">
            {persons.map((person) => (
                <PersonCard key={person.name} person={person} />
            ))}
        </div>
    )
}

function PersonCard({ person }: { person: Person }) {
    return (
        <div className="person-card">
            <h3>{person.name}</h3>
            <p>{person.presents}</p>
        </div>
    )
}