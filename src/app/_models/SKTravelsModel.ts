export class signin{
    email: string;
    password: string;
}

export class resetpasswordLinkModel{
    clientUrl: string;
    email: string;
}

export class resetpasswordmodel{
    password: string;
    confirmPassword: string;
    email: string;
    token: string;
}

export class traveldetails{
    traveldays: number;
    travelcities: any;
}

export class saveTravelDays{
    userID: number;
    maincityID: number;
    numberofDays: number;
}

export class saveTravelCities{
    userID: number;
    maincityID: number;
    VisitingcityIDs: [];
}