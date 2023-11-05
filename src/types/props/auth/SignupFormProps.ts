export interface Form {
    email: string,
    name: string,
    password: string,
}
export interface LocalForm extends Form {
    repeatPassword: string,
};