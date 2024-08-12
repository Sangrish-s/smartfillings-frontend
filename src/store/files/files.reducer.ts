import {BusinessType} from "@/utils/type/business.type";

export type FilesType = {
    filesLoading: boolean;
    fileLoading: boolean;
    scanning: boolean;
    company: BusinessType | null;
    filingTypes: string[];
    filings: any[];
    filing: any;
    file: string | null;
    pagination: {
        size: number;
        page: number;
        total: number;
    }
}

const initFiles: FilesType = {
    filesLoading: false,
    fileLoading: false,
    scanning: false,
    company: {
        category: "Domestic Common Stock",
        cik: "320193",
        currency: "USD",
        cusip: "037833100",
        exchange: "NASDAQ",
        famaIndustry: "Computers",
        famaSector: "",
        id: "a43c3ffca9b4a0be9cee4fa1120832a2",
        industry: "Consumer Electronics",
        isDelisted: false,
        location: "California; U.S.A",
        name: "APPLE INC",
        sector: "Technology",
        sic: "3571",
        sicIndustry: "Electronic Computers",
        sicSector: "Manufacturing",
        ticker: "AAPL"
    },
    filingTypes: [],
    filings: [],
    filing: null,
    file: null,
    pagination: {
        size: 10,
        page: 1,
        total: 0
    }
}

export const fileReducer = (state = initFiles, action: any): FilesType => {
    switch (action.type) {
        case 'filesLoadingEvt':
            return {...state, filesLoading: true}
        case 'allFilesLoadedEvt':
            return {...state, filesLoading: false}
        case 'fileLoadingEvt':
            return {...state, fileLoading: true}
        case 'fileLoadedEvt':
            return {...state, fileLoading: false}
        case 'scanningEvt':
            return {...state, scanning: true}
        case 'scannedEvt':
            return {...state, scanning: false}
        case 'selectBusinessEvt':
            return {...state, company: action.payload}
        case 'changeFilingTypesEvt':
            return {...state, filingTypes: action.payload}
        case 'changeFilingsEvt':
            return {...state, filings: action.payload?.data, pagination: {
                    size: action.payload?.size || 10,
                    page: action.payload?.page || 1,
                    total: action.payload?.total?.value || 0,
                }}
        case 'changeFilingEvt':
            return {...state, filing: action.payload}
        case 'changeFileEvt':
            return {...state, file: action.payload}
        default:
            return state;
    }
};