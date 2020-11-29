class OktaClient {
    constructor(serverDomain) {
        this.serverDomain = serverDomain;

        this.serverUrl = `${this.serverDomain}/api`;
        this.signInUrl = `${this.serverUrl}/users/login`;
        this.registerUrl = `${this.serverUrl}/users/create`;
        this.accessUrl = `${this.serverUrl}/auth/access`;

        this.roomsUrl = `${this.serverUrl}/rooms`;
        this.joinRoomUrl = `${this.roomsUrl}/join`;
        this.leaveRoomUrl = `${this.roomsUrl}/leave`;

        this.usersUrl = `${this.serverUrl}/users`;
        this.forgotUrl = `${this.usersUrl}/forgot`;
        this.updateProfileUrl = `${this.usersUrl}/updateProfile`;
    }

    getAccessToken() {
        return this.accessToken;
    }

    setAccessToken(accessToken) {
        this.accessToken = accessToken;
    }

    async forgot(state) {
        let response;
        try {
            response = await fetch(this.forgotUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`
                },
                body: JSON.stringify(state)
            });
        } catch (err) {
            return {err};
        }

        if (response.status !== 200) {
            return {err: 'Error forgetting password'};
        }

        return {};
    }

    async updateProfile(state) {
        let response;
        try {
            response = await fetch(this.updateProfileUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`
                },
                body: JSON.stringify(state)
            });
        } catch (err) {
            return {err};
        }

        if (response.status !== 204) {
            return {err: 'Error updating profile'};
        }

        return {};
    }

    async getUser() {
        let response;
        try {
            response = await fetch(this.usersUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`
                }
            });
        } catch (err) {
            return {err};
        }

        if (response.status !== 200) {
            return {err: 'Error getting user'};
        }
        const user = await response.json();

        return user;
    }

    async joinRoom(roomId) {
        let response;
        try {
            response = await fetch(`${this.joinRoomUrl}/${roomId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`
                }
            });
        } catch (err) {
            return {err};
        }

        if (response.status !== 200) {
            return {err: 'Error joining room'};
        }

        const room = await response.json();
        return room;
    }

    async leaveRoom(roomId) {
        let response;
        try {
            response = await fetch(`${this.leaveRoomUrl}/${roomId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`
                }
            });
        } catch (err) {
            return {err};
        }

        if (response.status !== 200) {
            return {err: 'Error leaving room'};
        }

        const room = await response.json();
        return room;
    }

    async getRooms() {
        let response;
        try {
            response = await fetch(this.roomsUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`
                }
            });
        } catch (err) {
            return {err};
        }

        if (response.status !== 200) {
            return {err: 'Error getting rooms'};
        }
        const rooms = await response.json();

        return rooms;
    }

    async register(state) {
        const email = state.email;
        const password = state.password;
        const nickName = state.nickName;

        let response;
        try {
            response = await fetch(this.registerUrl, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    nickName
                })
            });
        } catch (err) {
            return {err};
        }

        if (response.status !== 201) {
            return { err: 'Error creating user' };
        }
        const user = await response.json();

        return user;
    }

    async signIn(state) {
        const email = state.email;
        const password = state.password;
        
        let response;
        try {
        response = await fetch(this.signInUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password
            })
        });
        } catch (err) {
            return {err};
        }

        if (response.status !== 200) {
            return { err: 'Error logging in' };
        }
        const sessionToken = await response.json();

        return sessionToken;
    }

    async generateAccessToken(sessionToken) {
        let response;
        try {
        response = await fetch(this.accessUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({sessionToken})
        });
        } catch (err) {
            return {err};
        }

        if (response.status !== 200) {
            return { err: 'Error getting access token' };
        }
        const accessToken = await response.json();

        return accessToken;
    }
}

module.exports = OktaClient;