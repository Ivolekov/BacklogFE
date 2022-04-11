import { ServicePart } from "./ServicePart";

export interface ServiceProtocol {
    id: number
    clientEmail: string
    c_DateTime?: Date
    clientPhone: string
    serviceProtocolStatusId: number
    brandModel: string
    c_User: string
    comment: string
    simTray?: boolean
    charger: boolean
    bag: boolean
    other: string
    pin: string
    unlockPass: string
    lockPattern: string
    finalPrice: number
    serviceAction: string
    faultInformation: string
    dateOfIssue?: Date
    serviceParts: Array<ServicePart>
    servicePartsJson: string
}