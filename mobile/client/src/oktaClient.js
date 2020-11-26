class OktaClient {
    constructor(serverDomain) {
        this.serverDomain = serverDomain;

        this.serverUrl = `http://${this.serverDomain}/api`;
        this.signInUrl = `${this.serverUrl}/users/login`;
        this.registerUrl = `${this.serverUrl}/users/create`;
        this.accessUrl = `${this.serverUrl}/auth/access`;
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
        const body = await response.json();

        return {user: body};
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
        const body = await response.json();

        return {sessionToken: body.sessionToken};
    }

    async getAccessToken(sessionToken) {
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
            return { err: 'Error logging in' };
        }
        const body = await response.json();

        return {accessToken: body.accessToken};
    }
}

module.exports = OktaClient;