import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class SpotifyAuthService {

    private token: string | null = null;
    private tokenExpiry = 0;

    constructor(private http: HttpClient) { }

    async getAccessToken(): Promise<string> {
        if (!this.token || Date.now() >= this.tokenExpiry) {
            await this.refreshToken();
        }
        return this.token!;
    }

    private async refreshToken(): Promise<void> {
        const body = new HttpParams({
            fromObject: {
                grant_type: 'client_credentials',
                client_id: '940887bcad5949138a960d4d2d134657',
                client_secret: '77b74e7404c04478b2c3143bf5e75937',
            },
        });
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        const response: any = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: headers,
            body: body.toString(),
        });
        const responseJson = await response.json();
        this.token = responseJson.access_token;
        this.tokenExpiry = Date.now() + responseJson.expires_in * 1000;
    }
}
