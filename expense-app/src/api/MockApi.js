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
        const requestOptions = {
            method: 'GET'
        }

        return fetch(Route.Base + '/users', requestOptions)
            .then(response => response.json())
    }

    getOne(id) {
        const requestOptions = {
            method: 'GET'
        }

        return fetch(Route.Base + `/users/${id}`, requestOptions)
            .then(response => response.json())
    }

    update(data) {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        return fetch(Route.Base + `/users/${data.id}`, requestOptions)
            .then(response => response.json())
    }

    delete(id) {
        const requestOptions = {
            method: 'DELETE'
        }

        return fetch(Route.Base + `/users/${id}`, requestOptions)
            .then(response => response.json())
    }
}

export default MockApi