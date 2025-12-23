import { useForm } from "react-hook-form"
import type { Person } from "../types"
import "../styles/PersonForm.css"

interface PersonFormProps {
    onAddPerson: (person: Person) => void
}

export default function PersonForm({ onAddPerson }: PersonFormProps) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Person>()
    const onSubmit = (data: Person) => {
        onAddPerson(data)
        reset()
    }

    return (
        <div className="form-card">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        id="name"
                        type="text" 
                        className={errors.name ? "error" : ""} 
                        {...register("name", { required: "Name muss angegeben werden", minLength: { value: 3, message: "Name must be at least 3 characters long" }})} 
                    />
                    {errors.name && <p className="error-message">{errors.name.message as string}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="presents">Anzahl der Geschenke</label>
                    <input 
                        id="presents"
                        type="number" 
                        className={errors.presents ? "error" : ""} 
                        {...register("presents", { required: "Anzahl der Geschenke muss angegeben werden", min: { value: 1, message: "Du musst mindestens 1 Geschenk haben" }})} 
                    />
                    {errors.presents && <p className="error-message">{errors.presents.message as string}</p>}
                </div>
                <button type="submit">Hinzufügen</button>
            </form>
        </div>
    );
}