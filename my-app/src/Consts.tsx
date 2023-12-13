import { Page } from "./components/BreadCrumbs/BreadCrumbs"
import {DataService} from "./models/models"

export const DOMAIN = "http://localhost/api"

export const requestTime = 1000

export const dataServicesMock: DataService[] = [
    {id: 5, name: 'sectret', blob: 'blalba'},
    {id: 6, name: 'aaaa', blob: 'aaaa'},
]

export const mainPage: Page = {link: '/', title: 'DATA LIST'}
