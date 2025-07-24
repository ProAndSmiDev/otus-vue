import { Gender } from '@types/enums/Gender';
import { Status } from '@types/enums/Status';

interface PeopleInfo {
    age: number,
    gender: Gender,
    phone: string,
    email: string
}

interface People {
    id: number,
    avatar: string,
    name: string,
    status: Status,
    info: PeopleInfo
}
