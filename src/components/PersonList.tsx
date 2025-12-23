import type { Person } from "../types"
import "../styles/PersonList.css"

interface PersonListProps {
    persons: Person[]
    onDelete: (name: string) => void
}

export default function PersonList({ persons, onDelete }: PersonListProps) {
        if (persons.length === 0) {
            return (
                <div className="person-list person-list-empty">
                    <p className="person-list-empty-text">Keine Personen hinzugefügt</p>
                </div>
            )
        }
        return (
            <div className="person-list">
                {persons.map((person) => (
                    <PersonCard key={person.name} person={person} onDelete={onDelete} />
                ))}
            </div>
    )
}

function PersonCard({ person, onDelete }: { person: Person, onDelete: (name: string) => void }) {
    return (
        <div className="person-card">
            <h3>{person.name}</h3>
            <p>{person.presents}</p>
            <button onClick={() => onDelete(person.name)}>Löschen</button>
        </div>
    )
}