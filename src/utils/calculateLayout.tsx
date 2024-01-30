export interface IMargins {
    marginLeftS: number,
    marginLeftC: number
}

export interface IWidths {
    sideWidth: number,
    contentWidth: number
}

export const calculateMargins = (width: number, mid: boolean, mobile: boolean): IMargins => {

    let result: IMargins = {
        marginLeftS: 0,
        marginLeftC: 0
    }
    if (!mid && !mobile) {
        const remains = width - 945
        result.marginLeftS = remains * 3 / 10
        result.marginLeftC = result.marginLeftS + 205
    }
    else if (mid) {
        const remains = width - 560
        if (remains > 0)
            result.marginLeftS = remains / 2
        result.marginLeftC = result.marginLeftS + 85
    }
    return result

}

export const calculateWidths = (width: number, mid: boolean, mobile: boolean): IWidths => {

    let result: IWidths = {
        sideWidth: 0,
        contentWidth: 0
    }
    if (!mid && !mobile) {
        result.sideWidth = 200
        result.contentWidth = 745
    }
    else if (mid) {
        result.sideWidth = 80
        result.contentWidth = 500
    }
    return result

}