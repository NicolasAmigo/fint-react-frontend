export interface Animal{
    name: string,
    image: string,
    petSex: string,
    petCategory: string,
    petAge: string
}

export interface getAnimales {
    animales : Animal[]
}

export interface getAnimal {
    animal : Animal
}