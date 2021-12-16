import { Animal } from "./animales";

export interface User{
    firstName: string,
    lastName: string,
    mail: string,
    animal : Animal
}

export interface UserGet{
    firstName: string,
    lastName: string,
    mail: string,
    name: string,
    image: string,
    petSex: string,
    petCategory: string,
    petName: string,
    petAge: string
}