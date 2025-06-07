import { Gender } from '@types/enums/Gender';
import { Status } from '@types/enums/Status';

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
    info: IPeopleInfo
}
