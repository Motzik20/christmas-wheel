import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"
import type { Person } from "../types"

interface PersonContextType {
    people: Person[]
    addPerson: (person: Person) => void
    deletePerson: (name: string) => void
    resetPeople: () => void
}

const PersonContext = createContext<PersonContextType | undefined>(undefined)

export function PersonProvider({ children }: { children: ReactNode }) {
    const [people, setPeople] = useState<Person[]>([])

    const addPerson = (person: Person) => {
        setPeople([...people, person])
    }

    const deletePerson = (name: string) => {
        setPeople(people.filter((person) => person.name !== name))
    }

    const resetPeople = () => {
        setPeople([])
    }

    return (
        <PersonContext.Provider value={{ people, addPerson, deletePerson, resetPeople }}>
            {children}
        </PersonContext.Provider>
    )
}

export function usePersonContext() {
    const context = useContext(PersonContext)
    if (context === undefined) {
        throw new Error("usePersonContext must be used within a PersonProvider")
    }
    return context
}

