export const role = (role_id) => {
    switch (role_id) {
        case 1:
            return 'Administrator';
        case 2:
            return 'Moderator';
        default:
            return 'User';
    }
}