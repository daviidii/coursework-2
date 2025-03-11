export interface UserProps {
  id: number
  name: {
    firstname: string
    lastname: string
  }
  username: string
  phone: string
  email: string
  password: string
  address: {
    city: string
    geolocation: {
      lat: string
      long: string
    }
    number: number
    street: string
    zipcode: string
  }
}
