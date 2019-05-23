import { CodecContact } from './models/codec-contact';

export class CodecContacts {
    static otacon = getContact('Otacon', '141.12');
    static rosemary = getContact('Rosemary', '147.79');
    static drebin = getContact('Drebin', '148.93');
    static raiden = getContact('Raiden', '141.80');
    static meryl = getContact('Meryl', '140.15');
    static colonel = getContact('Colonel', '140.85');

    static list = [
        CodecContacts.otacon,
        CodecContacts.rosemary,
        CodecContacts.drebin,
        CodecContacts.raiden,
        CodecContacts.meryl,
        CodecContacts.colonel
    ];
}

function getContact(name: string, frequency: string): CodecContact {
    return {
        name: name,
        frequency: frequency,
        viewUrl: `./assets/codec/${name.toLowerCase()}.jpg`
    };
}
