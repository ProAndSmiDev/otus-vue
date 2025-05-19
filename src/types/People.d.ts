import { Gender } from './enums/Gender';
import { Status } from './enums/Status';

interface IPeopleInfo {
    age: number,
    gender: Gender,
    phone: string,
    email: string
}

interface IPeople {
    id: number,
    avatar: string,
    name: string,
    status: Status,
    info: PeopleInfo
}
