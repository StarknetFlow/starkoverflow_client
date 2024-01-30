import moment from "moment";
import { differenceInMonths, formatDistanceToNow, parseISO } from 'date-fns';


export const getTime = (time: number) => {


    const specifiedDate = moment.unix(time)

    if (specifiedDate.isValid()) {
        const specifiedDate = parseISO(new Date(time * 1000).toISOString());

        const timeAgo = formatDistanceToNow(specifiedDate);

        return timeAgo;
    }

}

export const getUsersJoinYear = (time: number): string => {

    const now = new Date();

    const humanDate = new Date(time * 1000);

    const elapsedMonths = differenceInMonths(now, humanDate);

    const years = Math.floor(elapsedMonths / 12);
    const months = elapsedMonths % 12;


    let result = ""
    if (years > 0 && months > 0) result = years + " years " + months + " months ago"
    else if (years > 0) result = years + " year ago"
    else if (months > 0) result = months + " months ago "
    else result = "less than a month ago"


    return result
}



