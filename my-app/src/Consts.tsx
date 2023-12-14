import {DataService, Page} from "./models/models"

export const DOMAIN = "http://localhost/api"

export const requestTime = 1000

export const dataServicesMock: DataService[] = [
    {id: 5, name: 'sectret', blob: 'blalba', encode: true, active: true},
    {id: 6, name: 'aaaa', blob: 'aaaa', encode: true, active: true},
]

export const mainPage: Page = {link: '/', title: 'Данные для шифрования'}

export const navTitle = 'ШИФРОВАНИЕ КОДОМ ДЛЯ КОРРЕКЦИИ ОШИБОК';
