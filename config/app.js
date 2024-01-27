export const config = {
    appPort: 5000,
    mongoUrl: 'mongodb+srv://cnega2002:Cne11051820@cluster0.fo5zlbj.mongodb.net/?retryWrites=true&w=majority',
    jwt: {
        secret: 'Token on first Time',
        tokens: {
            access: {
                type: 'access',
                expiresIn: '2m',
            },
            refresh: {
                type: 'refresh',
                expiresIn: '5m',
            },
        },
    },
};
export default config
