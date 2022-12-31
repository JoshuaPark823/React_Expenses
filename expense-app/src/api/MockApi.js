import { Route } from "../constants/api.shared";

class MockApi {
    create(data) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        return fetch(Route.Base + '/users', requestOptions)
            .then(response => response.json())
    }

    getAll() {
        return fetch(Route.Base + '/users')
            .then(response => response.json())
    }

    getOne(id) {
        return fetch(Route.Base + `/users/${id}`)
            .then(response => response.json())
    }
}

export default MockApi