export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token + ' ' + user.profile + ' ' + user.profil_id };
    } else {
        return {};
    }
}