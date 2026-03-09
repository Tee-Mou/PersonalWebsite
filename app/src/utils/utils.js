export function loginUserRequest(creds) {
    var request = {
        method: 'POST',
        body: JSON.stringify(creds)
    }
}