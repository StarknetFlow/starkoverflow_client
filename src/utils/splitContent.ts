import { IContent } from "../pages/Questions/QContent"

export const splitContent = (str: string) => {

    let result = []

    if (str.indexOf("```") !== 0) {
        const temp = str.split("```")
        temp.pop()
        for (var i = 0; i < temp.length; i++) {
            if (isCode(i))
                result.push({
                    type: "code",
                    content: temp[i]
                })
            else
                result.push({
                    type: "paragraph",
                    content: temp[i]
                })
        }
    }
    else {
        const temp = str.split("```")
        temp.pop()
        for (var i = 0; i < temp.length; i++) {
            if (isCode(i))
                result.push({
                    type: "paragraph",
                    content: temp[i]
                })
            else (isCode(i))
            result.push({
                type: "code",
                content: temp[i]
            })

        }
    }

    return result as IContent


}

const isCode = (i: number) => (i % 2 === 0) ? false : true