export const signout = async () => {
    await fetch('/api/auth/signout?callbackUrl=/api/auth/session', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: await fetch('/api/auth/csrf').then(rs => rs.text())
    });
}