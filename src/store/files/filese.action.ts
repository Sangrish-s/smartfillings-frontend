export const selectBusinessAction = (payload: any) => ({
    type: "selectBusinessEvt",
    payload: payload
})

export const filesLoadingAction = (payload?: any) => ({
    type: "filesLoadingEvt",
    payload: payload
})

export const allFilesLoadedAction = (payload?: any) => ({
    type: "allFilesLoadedEvt",
    payload: payload
})

export const fileLoadingAction = (payload?: any) => ({
    type: "fileLoadingEvt",
    payload: payload
})


export const fileLoadedAction = (payload?: any) => ({
    type: "fileLoadedEvt",
    payload: payload
})

export const scanningAction = (payload?: any) => ({
    type: "scanningEvt",
    payload: payload
})

export const scannedAction = (payload?: any) => ({
    type: "scannedEvt",
    payload: payload
})

export const changeFilingTypesAction = (payload?: any) => ({
    type: "changeFilingTypesEvt",
    payload: payload
})

export const changeFilingsAction = (payload?: any) => ({
    type: "changeFilingsEvt",
    payload: payload
})

export const changeFilingAction = (payload?: any) => ({
    type: "changeFilingEvt",
    payload: payload
})

export const changeFileAction = (payload?: any) => ({
    type: "changeFileEvt",
    payload: payload
})