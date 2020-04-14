export class Student {
    _id: string;
    name: string;
    address: string;
    phones:
        {
            'name': string;
            'number': string;
        }[];
    studies: string[];
}
